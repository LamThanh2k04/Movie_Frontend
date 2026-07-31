import React, { useEffect, useState } from "react";
import {
    Play,
    Heart,
    Star,
    Calendar,
    Globe,
    Clapperboard,
    X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { addFavoriteMovie, checkFavoriteMovie, removeFavoriteMovie } from "../../services/userApi";
import toast from "react-hot-toast";

const MovieDetailHero = ({ movie }) => {
    const [openTrailer, setOpenTrailer] = useState(false);
    const [openLoginModal, setOpenLoginModal] = useState(false)
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false)

    if (!movie) {
        return null;
    }

    const handleOpenTrailer = () => {
        setOpenTrailer(true);
    };

    const handleCloseTrailer = () => {
        setOpenTrailer(false);
    };


    const handleFavorite = async () => {
        if (!isAuthenticated) {
            setOpenLoginModal(true);
            return;
        }

        try {
            if (!isFavorite) {
                await addFavoriteMovie(movie.id);
                setIsFavorite(true);
                toast.success("Đã thêm vào danh sách yêu thích");
            } else {
                await removeFavoriteMovie(movie.id);
                setIsFavorite(false);
                toast.success("Đã xóa khỏi danh sách yêu thích");
            }
        } catch (error) {
            console.error(error);
            toast.error("Có lỗi xảy ra");
        }
    };
    const handleLogin = () => {
        setOpenLoginModal(false);

        navigate("/login");
    };

    const handleCloseLoginModal = () => {
        setOpenLoginModal(false);
    };

    useEffect(() => {
        const checkFavorite = async () => {
            if (!isAuthenticated || !movie?.id) {
                return;
            }

            try {
                const response = await checkFavoriteMovie(movie.id);
                setIsFavorite(response.data.data.isFavorite);
            } catch (error) {
                console.error("Check favorite error:", error);
            }
        };
        checkFavorite();
    }, [movie?.id, isAuthenticated]);

    return (
        <>
            <section className="relative min-h-screen overflow-hidden bg-[#141414] text-white">

                <div className="absolute inset-0">
                    <img
                        src={movie.banner}
                        alt={movie.name}
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />

                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#141414] via-[#141414]/80 to-transparent" />

                    <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/70 to-transparent" />
                </div>

                <div className="relative z-10 flex min-h-screen items-end">

                    <div className="w-full pb-5 md:px-12 lg:px-20">

                        <div className="max-w-3xl">

                            <h1 className="mb-5 text-4xl font-black tracking-tight md:text-6xl lg:text-7xl">
                                {movie.name}
                            </h1>

                            <div className="mb-6 flex flex-wrap items-center gap-4 text-sm font-medium text-gray-200 md:text-base">

                                <div className="flex items-center gap-2">
                                    <Clapperboard size={18} />
                                    <span>
                                        {movie.type === "SERIES"
                                            ? "Series"
                                            : "Phim"}
                                    </span>
                                </div>

                                <span className="text-gray-500">
                                    •
                                </span>

                                <div className="flex items-center gap-2">
                                    <Calendar size={18} />
                                    <span>
                                        {movie.releaseYear}
                                    </span>
                                </div>

                                <span className="text-gray-500">
                                    •
                                </span>

                                <div className="flex items-center gap-2">
                                    <Star
                                        size={18}
                                        fill="currentColor"
                                        className="text-yellow-400"
                                    />
                                    <span>
                                        {movie.star ?? 0}/5
                                    </span>
                                </div>

                                <span className="text-gray-500">
                                    •
                                </span>

                                <div className="flex items-center gap-2">

                                    <Globe size={18} />

                                    <span>
                                        {movie.country?.name}
                                    </span>

                                </div>

                            </div>

                            {movie.genres?.length > 0 && (

                                <div className="mb-6 flex flex-wrap gap-2">

                                    {movie.genres.map((genre) => (

                                        <span
                                            key={genre.id}
                                            className="
                                                rounded-md
                                                border
                                                border-white/20
                                                bg-white/10
                                                px-3
                                                py-1.5
                                                text-sm
                                                font-medium
                                                backdrop-blur-sm
                                            "
                                        >
                                            {genre.name}
                                        </span>

                                    ))}

                                </div>

                            )}

                            <p className=" mb-6 line-clamp-6 max-w-xl text-sm leading-6 text-gray-200 md:text-base">

                                {movie.description}

                            </p>

                            <div className="flex flex-wrap items-center gap-3">

                                <button
                                    className="
                                        flex
                                        items-center
                                        gap-2
                                        rounded-md
                                        bg-white
                                        px-7
                                        py-3
                                        font-bold
                                        text-black
                                        transition
                                        hover:bg-gray-200
                                    "
                                >

                                    <Play
                                        size={22}
                                        fill="currentColor"
                                    />

                                    Phát

                                </button>

                                <button
                                    onClick={handleOpenTrailer}
                                    className="
                                        flex
                                        items-center
                                        gap-2
                                        rounded-md
                                        bg-gray-500/70
                                        px-7
                                        py-3
                                        font-bold
                                        text-white
                                        backdrop-blur-sm
                                        transition
                                        hover:bg-gray-500/90
                                    "
                                >

                                    <Play size={22} />

                                    Xem Trailer

                                </button>

                                <button
                                    onClick={handleFavorite}
                                    className="
        flex
        items-center
        gap-2
        rounded-md
        border
        border-white/20
        bg-white/10
        px-7
        py-3
        font-bold
        text-white
        backdrop-blur-sm
        transition
        hover:bg-white/20
    "
                                >
                                    <Heart
                                        size={22}
                                        fill={isFavorite ? "red" : "none"}
                                    />

                                    {isFavorite ? "Đã yêu thích" : "Yêu thích"}
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {openTrailer && (

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6">

                    <div className="relative w-full max-w-5xl">

                        <button
                            onClick={handleCloseTrailer}
                            className="
                                absolute
                                -right-2
                                -top-12
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-full
                                bg-white/10
                                text-white
                                transition
                                hover:bg-white/20
                            "
                        >
                            <X size={24} />
                        </button>

                        <video
                            src={movie.trailer}
                            controls
                            autoPlay
                            className="w-full rounded-lg"
                        />

                    </div>

                </div>

            )}

            {openLoginModal && (

                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-6">

                    <div className="relative w-full max-w-md rounded-xl bg-[#181818] p-8 text-center shadow-2xl">

                        <button
                            onClick={handleCloseLoginModal}
                            className="
                                absolute
                                right-4
                                top-4
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-full
                                text-gray-400
                                transition
                                hover:bg-white/10
                                hover:text-white
                            "
                        >
                            <X size={20} />
                        </button>
                        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
                            <Heart
                                size={28}
                                className="text-white"
                            />
                        </div>

                        <h2 className="mb-3 text-2xl font-bold text-white">

                            Bạn chưa đăng nhập

                        </h2>

                        <p className="mb-7 text-sm leading-6 text-gray-400">
                            Bạn cần đăng nhập để có thể thêm phim vào danh sách yêu thích.
                        </p>

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={handleLogin}
                                className="
                                    w-full
                                    rounded-md
                                    bg-white
                                    px-5
                                    py-3
                                    font-bold
                                    text-black
                                    transition
                                    hover:bg-gray-200
                                "
                            >
                                Đăng nhập
                            </button>

                            <button
                                onClick={handleCloseLoginModal}
                                className="
                                    w-full
                                    rounded-md
                                    bg-white/10
                                    px-5
                                    py-3
                                    font-bold
                                    text-white
                                    transition
                                    hover:bg-white/20
                                "
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default MovieDetailHero;