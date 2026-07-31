import React from "react";
import { useNavigate } from "react-router-dom";

const RelatedMovies = ({ movies }) => {
    const navigate = useNavigate()
  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <div className="w-full overflow-hidden px-6 py-6 md:px-10 lg:px-16">
      <div
        className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide"
      >
        {movies.map((movie) => (
          <div
          onClick={()=> navigate(`/movie/detailMovie/${movie.id}`) }
            key={movie.id}
            className=" group relative w-[280px] shrink-0 overflow-hidden rounded-xl transition-transform duration-300 hover:scale-105 md:w-[320px] lg:w-[350px] cursor-pointer "
          >
            <img
              src={movie.banner}
              alt={movie.name}
              className=" aspect-video w-full object-cover "
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedMovies;