import { useEffect, useState } from "react"
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore"
import { Link } from "react-router-dom"
import { db } from "../firebase/firebase"
import BlurImage from "./BlurImage"
import SectionTitle from "./SectionTitle"

export default function TopNews() {
    const [news, setNews] = useState([])

    useEffect(() => {
        load()
    }, [])

    const load = async () => {
        try {
            const q = query(
                collection(db, "news"),
                orderBy("views", "desc"),
                limit(5)
            )

            const snap = await getDocs(q)

            setNews(
                snap.docs.map((d) => ({
                    id: d.id,
                    ...d.data(),
                }))
            )
        } catch (err) {
            console.error("top news error", err)
        }
    }

    if (!news?.length) return null

    const first = news[0]
    const rest = news.slice(1)

    return (
        <div className="mt-10">
            <SectionTitle title="Онцлох мэдээ" />

            <div className="grid lg:grid-cols-12 gap-5">

                {/* LEFT BIG */}
                <Link
                    to={`/news/${first?.id}`}
                    className="lg:col-span-6 block group"
                >
                    <div className="relative overflow-hidden rounded-xl">

                        <BlurImage
                            src={first?.image || ""}
                            alt={first?.title || ""}
                            className="w-full h-[240px] md:h-[320px] object-cover group-hover:scale-105 transition duration-300"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                        <div className="absolute bottom-0 p-4">
                            <h2 className="text-white font-bold text-lg md:text-xl line-clamp-2">
                                {first?.title}
                            </h2>
                        </div>

                    </div>
                </Link>

                {/* RIGHT LIST */}
                <div className="lg:col-span-6 space-y-4">

                    {rest.map((n, index) => (
                        <Link
                            key={n.id}
                            to={`/news/${n?.id}`}
                            className="flex gap-3 group items-start"
                        >
                            <div className="relative">

                                <div className="w-28 h-20 overflow-hidden rounded-lg">
                                    <BlurImage
                                        src={n?.image || ""}
                                        alt={n?.title || ""}
                                        className="w-28 h-20 object-cover group-hover:scale-105 transition duration-300"
                                    />
                                </div>

                                <div className="absolute -top-2 -left-2 bg-red-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                                    {index + 2}
                                </div>

                            </div>

                            <div className="flex-1">
                                <div className="font-semibold line-clamp-2 group-hover:text-red-600 transition-colors">
                                    {n?.title}
                                </div>
                            </div>

                        </Link>
                    ))}

                </div>

            </div>
        </div>
    )
}