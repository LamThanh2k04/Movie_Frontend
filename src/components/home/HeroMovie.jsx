import React, { useRef, useState } from "react";
import {
    Play,
    Pause,
    Info,
    Volume2,
    VolumeX,
} from "lucide-react";

const HeroMovie = ({ movie }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const [volume, setVolume] = useState(0.5);
    if (!movie) {
        return null;
    }

    const handleTogglePlay = () => {
        if (!videoRef.current) return;

        if (videoRef.current.paused) {
            videoRef.current.play();

            setIsPlaying(true);
        } else {
            videoRef.current.pause();

            setIsPlaying(false);
        }
    };

    const handleToggleMute = () => {
        if (!videoRef.current) return;

        if (isMuted) {
            videoRef.current.muted = false;
            if (volume === 0) {
                videoRef.current.volume = 0.5;
                setVolume(0.5);
            }
            setIsMuted(false);
        } else {
            videoRef.current.muted = true;
            setIsMuted(true);
        }
    };

    const handleVolumeChange = (e) => {
        const newVolume = Number(e.target.value);
        setVolume(newVolume);
        if (!videoRef.current) return;
        videoRef.current.volume = newVolume;
        if (newVolume === 0) {
            videoRef.current.muted = true;
            setIsMuted(true);
        } else {
            videoRef.current.muted = false;
            setIsMuted(false);
        }
    };

    return (
        <section
            className="relative h-[calc(100vh-64px)] min-h-[600px] w-full overflow-hidden bg-black text-white"
        >

            <video
                ref={videoRef}
                src={movie.trailer}
                poster={movie.banner}
                autoPlay
                muted={isMuted}
                loop
                playsInline
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                className="absolute inset-0 h-full w-full object-cover "
            />
            <div className="absolute inset-0 bg-black/20" />
            <div
                className=" absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"
            />

            <div
                className=" absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black via-black/70 to-transparent "
            />d
            <div
                className=" absolute bottom-16 left-8 z-20 max-w-2xl md:left-14 lg:left-20 "
            >
                <h1
                    className=" mb-5 max-w-xl text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl"  >
                    {movie.name}
                </h1>

                <div
                    className=" mb-5 flex flex-wrap items-center gap-2 text-sm font-semibold md:text-base"
                >
                    <span>
                        {movie.type === "SERIES"
                            ? "Phim Bộ"
                            : "Phim Tập"}
                    </span>

                    <span className="text-gray-400">
                        •
                    </span>
                    {movie.genres?.length > 0 && (
                        <>
                            <span>
                                {movie.genres
                                    .slice(0, 2)
                                    .map((genre) => genre.name)
                                    .join(" • ")}
                            </span>

                            <span className="text-gray-400">
                                •
                            </span>
                        </>
                    )}

                    <span>
                        {movie.releaseYear}
                    </span>

                    <span className="text-gray-400">
                        •
                    </span>



                    <span className="flex items-center gap-1">
                        <span className="text-yellow-400">
                            ★
                        </span>

                        {movie.star ?? 0}
                    </span>

                    <span className="text-gray-400">
                        •
                    </span>



                    <span>
                        {movie.country?.name}
                    </span>

                </div>

                <p
                    className=" mb-6 line-clamp-3 max-w-xl text-sm leading-6 text-gray-200 md:text-base"
                >
                    {movie.description}
                </p>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleTogglePlay}
                        className=" flex items-center gap-2 rounded-md bg-white px-6 py-3 font-bold text-black   transition hover:bg-gray-200 "
                    >
                        {isPlaying && (
                            <>
                                <Play
                                    size={21}
                                    fill="currentColor"
                                />

                                Phát
                            </>
                        )}

                    </button>

                    <button
                        className=" flex items-center gap-2 rounded-md bg-gray-500/80 px-6 py-3 font-bold text-white backdrop-blur-sm transition hover:bg-gray-500 "
                    >
                        <Info size={21} />

                        Thông tin khác

                    </button>
                </div>
            </div>
            <div
                className=" group absolute bottom-16 right-8 z-30 flex items-center "
            >
                <button
                    onClick={handleToggleMute}
                    className=" relative z-20 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/40 bg-black/60 text-white backdrop-blur-md transition hover:bg-white/20 "
                >
                    {isMuted || volume === 0 ? (
                        <VolumeX size={21} />
                    ) : (
                        <Volume2 size={21} />
                    )}
                </button>

                <div
                    className="w-0 overflow-hidden rounded-r-full py-3 opacity-0 transition-all duration-300 group-hover:ml-2 group-hover:w-36 group-hover:px-4 group-hover:opacity-100 "
                >
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className=" h-1 w-full cursor-pointer accent-white "
                    />
                </div>
            </div>

        </section>
    );
};

export default HeroMovie;