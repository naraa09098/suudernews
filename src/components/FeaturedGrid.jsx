import { useEffect, useState } from "react"
import {
    collection,
    query,
    where,
    limit,
    getDocs
} from "firebase/firestore"
import { Link } from "react-router-dom"
import { db } from "../firebase/firebase"
import BlurImage from "./BlurImage"
import SectionTitle from "./SectionTitle"

export default function FeaturedGrid() {
    const [news, setNews] = useState([])

    useEffect(() => {
        load()
    }, [])

    const load = async () => {
        try {
            const q = query(
                collection(db, "news"),
                where("featured", "==", true),
                limit(5)
            )

            const snap = await getDocs(q)

            setNews(
                snap.docs.map((d) => ({
                    id: d.id,
                    ...d.data()
                }))
            )
        } catch (err) {
            console.error("featured load error", err)
        }
    }

    if (!news?.length) return null

    const main = news[0]
    const rest = news.slice(1, 5)

    return (
        <div className="mt-10">
            <SectionTitle title="Онцлох" />

            <div className="grid lg:grid-cols-12 gap-5">

                {/* LEFT BIG */}
                <Link
                    to={`/news/${main?.id}`}
                    className="lg:col-span-7 group block"
                >
                    <div className="relative overflow-hidden rounded-xl">

                        <BlurImage
                            src={main?.image || ""}
                            alt={main?.title || ""}
                            className="w-full h-[260px] md:h-[360px] lg:h-[420px] object-cover group-hover:scale-105 transition duration-300"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        <div className="absolute bottom-0 p-5">
                            <h2 className="text-white text-xl md:text-2xl font-bold leading-tight line-clamp-3">
                                {main?.title}
                            </h2>
                        </div>

                    </div>
                </Link>

                {/* RIGHT GRID */}
                <div className="lg:col-span-5 grid grid-cols-2 gap-4">

                    {rest.map((n) => (
                        <Link
                            key={n.id}
                            to={`/news/${n?.id}`}
                            className="group block"
                        >
                            <div className="relative overflow-hidden rounded-xl">

                                <BlurImage
                                    src={n?.image || ""}
                                    alt={n?.title || ""}
                                    className="w-full h-[120px] md:h-[160px] lg:h-[200px] object-cover group-hover:scale-105 transition duration-300"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                                <div className="absolute bottom-0 p-3">
                                    <h3 className="text-white text-sm font-semibold line-clamp-2">
                                        {n?.title}
                                    </h3>
                                </div>

                            </div>
                        </Link>
                    ))}

                </div>

            </div>
        </div>
    )
}