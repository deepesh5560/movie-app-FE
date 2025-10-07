"use client";

import { useState } from "react";
import Image from "next/image";

const CreateMovie = ({ isEdit= false}) => {
  const [image, setImage] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ title, year, image });
  };

  return (
    <div className="bg-[#0D2B38] min-h-screen flex flex-col px-5 sm:px-10 md:px-16 py-10 text-white font-montserrat relative">
      <h1 className="text-3xl sm:text-4xl md:text-[48px] font-semibold mb-10">
        {isEdit ? "Edit" : "Create a new movie"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col md:flex-row gap-8 md:gap-16 items-center md:items-start pb-24"
      >
        {/* Image Upload Box */}
        <label
          htmlFor="fileInput"
          className="w-full md:w-[45%] border-2 border-dashed border-gray-500 rounded-xl h-[280px] sm:h-[340px] md:h-[400px] flex flex-col justify-center items-center cursor-pointer hover:border-teal-400 transition"
        >
          {image ? (
            <Image
              src={image}
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
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>

        {/* Input Fields */}
        <div className="flex flex-col gap-5 w-full md:w-[45%]">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-[#143D4C] text-white rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-teal-400 placeholder-gray-400 w-full transition"
          />

          <input
            type="text"
            placeholder="Publishing year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="bg-[#143D4C] text-white rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-teal-400 placeholder-gray-400 w-full sm:w-[250px] md:w-[200px] transition"
          />

          <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
            <button
              type="button"
              className="border border-white px-6 py-2 rounded-md font-medium hover:bg-[#143D4C] transition w-full sm:w-[140px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#2BD17E] px-6 py-2 rounded-md text-black font-semibold hover:bg-green-500 transition w-full sm:w-[140px]"
            >
              Submit
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
