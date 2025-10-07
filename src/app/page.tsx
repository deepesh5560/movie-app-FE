"use client"

import MovieSection from "@/components/MovieSection";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative">
      {1 ? (
        <MovieSection />
      ) : (
        <div className="flex flex-col items-center justify-center h-screen text-center px-4 sm:px-8">
          <h2 className="font-semibold text-2xl sm:text-4xl md:text-5xl leading-snug mb-4">
            Your Movie list is empty
          </h2>
          <button className="w-full sm:w-auto py-3 sm:py-4 px-6 sm:px-8 mt-2 text-white font-semibold bg-[#2BD17E] rounded-[10px] hover:bg-green-500 transition-colors duration-200">
            Add a new movie
          </button>
        </div>
      )}
      <Image
        src="/bg-wave.png"
        alt="wave background"
        width={1920}
        height={300}
        className="absolute bottom-0 w-full"
        priority
      />
    </div>
  );
}
