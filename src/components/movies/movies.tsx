"use client"

import MovieSection from "@/components/movies/MovieSection";
import NoMovieSection from "@/components/movies/NoMovieSection";
import { movie, PaginatedMovies } from "@/interfaces/Movies/Movie.inteface";
import { authService } from "@/services/auth/authService";
import { movieService } from "@/services/movies/movieService";
import Image from "next/image";
import { useEffect, useState } from "react";
const Movies = () => {
    const [movies, setMovies] = useState<movie[]>([]);

     const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 8,
    total: 0,
  });

  useEffect(() => {
    movieService
      .getAll(page,8)
      .then((res) => {
        setMovies(res.data.movies)
        setPagination({
           page: page,
           pageSize: 8,
           total: res.data.total,
        })
      })
      .catch((err) => console.error(err));
  }, [page]);

  const handleLogout = ()=>{
    authService.logout()
  }
  return (
    <div className="relative">
      {movies?.length ? (
        <MovieSection movies={movies}  page={page} setPage={setPage} pagination={pagination} handleLogout={handleLogout}/>
      ) : (
       <NoMovieSection/>
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
  )
}

export default Movies