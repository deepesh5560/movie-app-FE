"use client";

import {  useEffect, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter,useSearchParams } from "next/navigation";
import { movieService } from "@/services/movies/movieService";
import { movie } from "@/interfaces/Movies/Movie.inteface";

const movieSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters long"),
  publishingYear: z
    .string()
    .regex(/^\d{4}$/, "Year must be a valid 4-digit number"),
 poster: z.union([z.instanceof(File), z.string()]),
});

type MovieFormData = z.infer<typeof movieSchema>;

const CreateMovie = () => {
  const router = useRouter();
    const searchParams = useSearchParams();
  const id = searchParams.get('id') || ""; 
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
const [movieData, setMovieData] = useState<movie | null>(null);

const {
  register,
  handleSubmit,
  formState: { errors },
  reset,   // get reset method from useForm
  setValue,
} = useForm<MovieFormData>({
  resolver: zodResolver(movieSchema),
  defaultValues: {
    title: '',
    publishingYear: '',
    poster: '',
  },
});

useEffect(() => {
  movieService.getById(id)
    .then((res) => {
      const movie = res?.data;
      setMovieData({
        title: movie?.title || '',
        poster: movie?.poster || '',
        publishingYear: movie?.publishingYear,
      });
    })
    .catch((err) => console.error(err));
}, [id]);

useEffect(() => {
  if (movieData) {
    reset({
      ...movieData,
      publishingYear: movieData.publishingYear?.toString() ?? '',
    });

    setPreview(movieData?.poster)
  }
}, [movieData, reset]);



   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("poster", file); // set file in form state
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };

   const onSubmit = async (data: MovieFormData) => {
    try {
      setLoading(true);

    
       await movieService.update(id,data);

      router.push("/movies"); // redirect after login
    } catch (error: any) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="bg-[#0D2B38] min-h-screen flex flex-col px-5 sm:px-10 md:px-16 py-10 text-white font-montserrat relative">
      <h1 className="text-3xl sm:text-4xl md:text-[48px] font-semibold mb-10">
        { "Edit movie" }
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col md:flex-row gap-8 md:gap-16 items-center md:items-start pb-24"
      >
        {/* Image Upload Box */}
        <label
          htmlFor="fileInput"
          className="w-full md:w-[45%] border-2 border-dashed border-gray-500 rounded-xl h-[280px] sm:h-[340px] md:h-[400px] flex flex-col justify-center items-center cursor-pointer hover:border-teal-400 transition"
        >
          {preview ? (
            <Image
              src={preview}
              alt="uploaded"
              width={500}
              height={500}
              className="object-cover w-full h-full rounded-xl"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-300 text-center px-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 mb-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5V9.75m0 0L9 12.75m3-3 3 3M6 4.5h12a2.25 2.25 0 012.25 2.25v12A2.25 2.25 0 0118 21H6a2.25 2.25 0 01-2.25-2.25v-12A2.25 2.25 0 016 4.5z"
                />
              </svg>
              <p className="text-sm">Upload an image here</p>
            </div>
          )}
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            {...register("poster")}
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>

        {/* Input Fields */}
        <div className="flex flex-col gap-5 w-full md:w-[45%]">
          <div className="flex flex-col gap-1">
            <input
              type="text"
              placeholder="Title"
              {...register("title")}
              className="bg-[#143D4C] text-white rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-teal-400 placeholder-gray-400 w-full transition"
            />
            {errors.title && (
              <p className="text-red-400 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <input
              type="text"
              placeholder="Publishing year"
              {...register("publishingYear")}
              className="bg-[#143D4C] text-white rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-teal-400 placeholder-gray-400 w-full sm:w-[250px] md:w-[200px] transition"
            />
            {errors.publishingYear && (
              <p className="text-red-400 text-sm">
                {errors.publishingYear.message}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
            <button
              type="button"
              className="border border-white px-6 py-2 rounded-md font-medium hover:bg-[#143D4C] transition w-full sm:w-[140px]"
              onClick={()=>router.push("/movies")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#2BD17E] px-6 py-2 rounded-md text-black font-semibold hover:bg-green-500 transition w-full sm:w-[140px]"
              disabled={isLoading}
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>
      </form>

      <Image
        src="/bg-wave.png"
        alt="wave background"
        width={1920}
        height={300}
        className="absolute bottom-0 left-0 w-full pointer-events-none select-none"
        priority
      />
    </div>
  );
};

export default CreateMovie;
