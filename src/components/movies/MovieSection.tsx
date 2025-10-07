"use client";

import { Dispatch, SetStateAction } from "react";
import MovieCard from "./MovieCard";
import {  movie, PaginatedMovies } from "@/interfaces/Movies/Movie.inteface";
import { useRouter } from "next/navigation";



const MovieSection = ({movies,page,setPage,pagination,handleLogout}:{movies:movie[],page:number,setPage:Dispatch<SetStateAction<number>>,pagination:PaginatedMovies,handleLogout:()=>void}) => {
   const router = useRouter()

  



const totalPages = pagination.total > 8 ? Math.ceil(pagination.total / pagination.pageSize) : 1;

const currentMovies = movies ?? [];




  return (
    <div className="bg-[#093545] text-white px-4 sm:px-10 md:px-20 py-10 md:pb-40 font-montserrat min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="font-semibold flex gap-2">
          <span className="text-[48px] sm:text-3xl">My movies</span>
          <span className="cursor-pointer" onClick={()=>router.push('/create-movie')} >
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
        <button className="flex items-center gap-2 text-sm hover:text-teal-400 transition" onClick={handleLogout}>
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
        { currentMovies?.map((movie,ind) => (
          <div key={`${movie.title}-${ind}`}>
          <MovieCard movie={movie} />
          </div>
          
        )) 
        
        }
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
