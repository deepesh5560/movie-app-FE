"use client"

import { movie } from "@/interfaces/Movies/Movie.inteface";
import Image from "next/image";
import { useRouter } from "next/navigation";

const MovieCard = ({ movie }: { movie: movie }) => {
  const router = useRouter()
  return (
    <div onClick={()=>router.push(`/update-movie?id=${movie?._id}`)} className="bg-[#092c39] hover:bg-[#1e414e] rounded-xl cursor-pointer overflow-hidden shadow-md hover:shadow-lg transition p-2">
      <div className="relative w-full h-56 sm:h-72 md:h-80 lg:h-96">
        <Image
          src={movie?.poster || ""}
          alt={movie?.title || "N/A"}
          fill
          className="object-cover rounded-xl"
          sizes="(max-width: 640px) 100vw, 
                           (max-width: 1024px) 50vw, 
                           25vw"
        />
      </div>
      <div className="text-white my-3 px-1">
        <h2 className="font-medium truncate text-base sm:text-lg my-1">
          {movie.title}
        </h2>
        <p className="text-sm text-gray-300">
          {movie?.publishingYear || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
