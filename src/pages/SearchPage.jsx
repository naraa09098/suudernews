import { useLocation, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase/firebase"
import BlurImage from "../components/BlurImage"
import StickySidebar from "../components/StickySidebar"

export default function SearchPage() {
    const { search } = useLocation()
    const q = new URLSearchParams(search).get("q") || ""

    const [news, setNews] = useState([])

    useEffect(() => {
        load()
    }, [q])

    const load = async () => {
        try {
            const snap = await getDocs(collection(db, "news"))

            const list = snap.docs
                .map((d) => ({
                    id: d.id,
                    ...d.data(),
                }))
                .filter((n) =>
                    n?.title
                        ?.toLowerCase()
                        ?.includes(q.toLowerCase())
                )

            setNews(list)
        } catch (err) {
            console.error("search error", err)
        }
    }

    return (
        <div className="max-w-7xl mx-auto mt-6 px-4">
            <h1 className="text-2xl font-bold mb-6">
                Хайлт: "{q}"
            </h1>

            <div className="grid lg:grid-cols-12 gap-8">
                {/* LEFT */}
                <div className="lg:col-span-8">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
                        {news.map((n) => (
                            <Link
                                key={n.id}
                                to={`/news/${n?.id}`}
                                className="group block"
                            >
                                <BlurImage
                                    src={n?.image}
                                    alt={n?.title}
                                    className="w-full h-40 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                                />

                                <div className="mt-2 font-medium line-clamp-2 group-hover:text-red-600 transition-colors">
                                    {n?.title}
                                </div>
                            </Link>
                        ))}
                    </div>

                    {!news.length && (
                        <div className="text-gray-500 mt-10">
                            Илэрц олдсонгүй
                        </div>
                    )}
                </div>

                {/* RIGHT */}
                <div className="lg:col-span-4">
                    <StickySidebar />
                </div>
            </div>
        </div>
    )
}