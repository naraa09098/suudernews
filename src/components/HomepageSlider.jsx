import { useEffect, useState, useRef } from "react"
import { collection, query, where, getDocs, limit } from "firebase/firestore"
import { db } from "../firebase/firebase"
import { Link } from "react-router-dom"
import BlurImage from "./BlurImage"

export default function HomepageSlider() {
    const [news, setNews] = useState([])
    const [index, setIndex] = useState(0)
    const timer = useRef(null)

    useEffect(() => {
        load()
    }, [])

    useEffect(() => {
        start()
        return stop
    }, [news])

    const start = () => {
        if (!news?.length) return

        stop()

        timer.current = setInterval(() => {
            setIndex((i) => (i + 1) % news.length)
        }, 5000)
    }

    const stop = () => {
        if (timer.current) {
            clearInterval(timer.current)
        }
    }

    const load = async () => {
        try {
            const q = query(
                collection(db, "news"),
                where("featured", "==", true),
                limit(6)
            )

            const snap = await getDocs(q)

            setNews(
                snap.docs.map((d) => ({
                    id: d.id,
                    ...d.data(),
                }))
            )
        } catch (err) {
            console.error("slider load error", err)
        }
    }

    if (!news?.length) return null

    const item = news[index]

    const prev = () => {
        setIndex((index - 1 + news.length) % news.length)
    }

    const next = () => {
        setIndex((index + 1) % news.length)
    }

    return (
        <div

            onMouseEnter={stop}
            onMouseLeave={start}
        >
            <div className="relative overflow-hidden rounded-xl">

                <Link to={`/news/${item?.id}`}>
                    <BlurImage
                        src={item?.image || ""}
                        alt={item?.title || ""}
                        className="w-full h-[240px] sm:h-[320px] md:h-[420px] lg:h-[480px] object-cover"
                        loading={index === 0 ? "eager" : "lazy"}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    <div className="absolute bottom-0 left-0 right-0 text-white p-4 md:p-6">
                        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight line-clamp-2 md:line-clamp-3">
                            {item?.title}
                        </h2>
                    </div>
                </Link>

                <button
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-9 h-9 rounded-full flex items-center justify-center"
                >
                    ‹
                </button>

                <button
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-9 h-9 rounded-full flex items-center justify-center"
                >
                    ›
                </button>

                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                    {news.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setIndex(i)}
                            className={`h-2 rounded-full transition-all duration-300 ${i === index
                                ? "bg-white w-6"
                                : "bg-white/40 w-2"
                                }`}
                        />
                    ))}
                </div>

            </div>

            {/* thumbnails */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mt-3">
                {news.map((n, i) => (
                    <div
                        key={n.id}
                        onClick={() => setIndex(i)}
                        className={`cursor-pointer overflow-hidden rounded-lg border-2 transition ${i === index
                            ? "border-red-600"
                            : "border-transparent"
                            }`}
                    >
                        <BlurImage
                            src={n?.image || ""}
                            alt={n?.title || ""}
                            className="w-full h-16 md:h-20 object-cover"
                        />
                    </div>
                ))}
            </div>



        </div>
    )
}