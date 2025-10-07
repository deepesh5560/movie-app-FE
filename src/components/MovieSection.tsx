"use client";

import Image from "next/image";
import { useState } from "react";

const movies = [
  {
    title: "Interstellar",
    year: "2014",
    image: "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
  },
  {
    title: "The Dark Knight",
    year: "2008",
    image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  },
  {
    title: "Avatar",
    year: "2009",
    image: "https://image.tmdb.org/t/p/w500/kyeqWdyUXW608qlYkRqosgbbJyK.jpg",
  },
  {
    title: "Oppenheimer",
    year: "2023",
    image: "https://image.tmdb.org/t/p/w500/bkpPTZUdq31UGDovmszsg2CchiI.jpg",
  },
  {
    title: "Dune: Part Two",
    year: "2024",
    image: "https://image.tmdb.org/t/p/w500/8bcoRX3hQRHufLPSDREdvr3YMXx.jpg",
  },
  {
    title: "The Batman",
    year: "2022",
    image: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
  },
  {
    title: "Spider-Man: Across the Spider-Verse",
    year: "2023",
    image: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
  },
  {
    title: "Tenet",
    year: "2020",
    image: "https://image.tmdb.org/t/p/w500/k68nPLbIST6NP96JmTxmZijEvCA.jpg",
  },
  {
    title: "Everything Everywhere All at Once",
    year: "2022",
    image: "https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg",
  },
];

const MovieSection = () => {
  const [page, setPage] = useState(1);
  const moviesPerPage = 8;

  const totalPages = Math.ceil(movies.length / moviesPerPage);
  const startIndex = (page - 1) * moviesPerPage;
  const currentMovies = movies.slice(startIndex, startIndex + moviesPerPage);

  return (
    <div className="bg-[#093545] text-white px-4 sm:px-10 md:px-20 py-10 md:pb-40 font-montserrat min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="font-semibold flex gap-2">
          <span className="text-[48px] sm:text-3xl">My movies</span>
          <span className="">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_3_194)">
                <path
                  d="M17.3334 9.33332H14.6667V14.6667H9.33342V17.3333H14.6667V22.6667H17.3334V17.3333H22.6667V14.6667H17.3334V9.33332ZM16.0001 2.66666C8.64008 2.66666 2.66675 8.63999 2.66675 16C2.66675 23.36 8.64008 29.3333 16.0001 29.3333C23.3601 29.3333 29.3334 23.36 29.3334 16C29.3334 8.63999 23.3601 2.66666 16.0001 2.66666ZM16.0001 26.6667C10.1201 26.6667 5.33341 21.88 5.33341 16C5.33341 10.12 10.1201 5.33332 16.0001 5.33332C21.8801 5.33332 26.6667 10.12 26.6667 16C26.6667 21.88 21.8801 26.6667 16.0001 26.6667Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_3_194">
                  <rect width="32" height="32" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </span>
        </h1>
        <button className="flex items-center gap-2 text-sm hover:text-teal-400 transition">
          <span>Logout</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.6667 10.6667L20.7867 12.5467L22.8933 14.6667H12V17.3333H22.8933L20.7867 19.44L22.6667 21.3333L28 16L22.6667 10.6667ZM6.66667 6.66667H16V4H6.66667C5.2 4 4 5.2 4 6.66667V25.3333C4 26.8 5.2 28 6.66667 28H16V25.3333H6.66667V6.66667Z"
              fill="white"
            />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-20">
        {currentMovies.map((movie, index) => (
          <div
            key={index}
            className="bg-[#092c39] hover:bg-[#1e414e] rounded-xl cursor-pointer overflow-hidden shadow-md hover:shadow-lg transition p-2"
          >
            <div className="relative w-full h-56 sm:h-72 md:h-80 lg:h-96">
              <Image
                src={movie.image}
                alt={movie.title}
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
              <p className="text-sm text-gray-300">{movie.year}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-10 gap-3">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="px-4 py-1 rounded bg-[#143D4C] disabled:opacity-40"
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded ${
              page === i + 1
                ? "bg-green-500 text-black"
                : "bg-[#143D4C] text-white"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          className="px-4 py-1 rounded bg-[#143D4C] disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MovieSection;
