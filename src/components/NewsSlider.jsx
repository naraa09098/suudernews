import { useEffect, useState, useRef } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";

import { Link } from "react-router-dom";

export default function NewsSlider() {
    const [news, setNews] = useState([]);

    const prevRef = useRef(null);
    const nextRef = useRef(null);

    useEffect(() => {
        const unsub = onSnapshot(
            collection(db, "news"),
            (snap) => {
                setNews(
                    snap.docs.map((d) => ({
                        id: d.id,
                        ...d.data()
                    }))
                );
            }
        );

        return () => unsub();
    }, []);

    if (!news.length) return null;

    return (
        <div className="mt-8 relative">

            <h2 className="text-xl font-bold mb-4 border-l-4 border-yellow-400 pl-3">
                Мэдээ
            </h2>

            {/* LEFT */}
            <button
                ref={prevRef}
                className="
          absolute 
          left-[-20px] 
          top-[55%] 
          z-10 
          w-10 
          h-10 
          rounded-full 
          bg-white 
          shadow 
          hover:bg-yellow-400
        "
            >
                ‹
            </button>

            {/* RIGHT */}
            <button
                ref={nextRef}
                className="
          absolute 
          right-[-20px] 
          top-[55%] 
          z-10 
          w-10 
          h-10 
          rounded-full 
          bg-white 
          shadow 
          hover:bg-yellow-400
        "
            >
                ›
            </button>

            <Swiper
                modules={[Navigation]}
                onInit={(swiper) => {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                }}
                spaceBetween={16}
                slidesPerView={3}
                breakpoints={{
                    320: { slidesPerView: 1.2 },
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 }
                }}
            >
                {news.map((item) => (
                    <SwiperSlide key={item.id}>
                        <Link to={`/news/${item.id}`}>
                            <div className="group cursor-pointer">
                                <img
                                    src={item.image || "/placeholder.jpg"}
                                    alt={item.title}
                                    className="w-full h-[160px] object-cover rounded-lg bg-gray-100"
                                />

                                <h3 className="mt-2 text-sm font-medium line-clamp-2 group-hover:text-yellow-500">
                                    {item.title}
                                </h3>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>

        </div>
    );
}