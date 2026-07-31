import React from "react";

const MovieActors = ({ actors }) => {
    // Nếu không có diễn viên
    if (!actors || actors.length === 0) {
        return null;
    }

    return (
        <section className="bg-[#141414]  text-white md:px-12 lg:px-20">
            <h2 className="mb-6 text-2xl font-bold md:text-3xl">
                Diễn viên
            </h2>
            <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide">
                {actors.map((actor) => (
                    <div
                        key={actor.id}
                        className="
              group
              w-36
              flex-shrink-0
              cursor-pointer
              md:w-40
              lg:w-44
            "
                    >
                        <div
                            className="
                 mx-auto
                mb-3
                aspect-square
                w-24
                overflow-hidden
                rounded-full
                bg-[#222]
                ring-1
                ring-white/10
                transition
                duration-300
                group-hover:ring-white/30
              "
                        >
                            <img
                                src={actor.avatar}
                                alt={actor.name}
                                className="
                  h-full
                  w-full
                  object-cover
                  transition
                  duration-300
                  group-hover:scale-110
                "
                            />

                        </div>

                        <h3 className="truncate text-center text-base font-semibold">
                            {actor.name}
                        </h3>
                        {actor.anotherName && (
                            <p className="mt-1 truncate text-center text-sm text-gray-400">
                                {actor.anotherName}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default MovieActors;