import { useEffect, useState } from "react"
import { collection, query, where, getDocs, limit } from "firebase/firestore"
import { Link } from "react-router-dom"
import { db } from "../firebase/firebase"

export default function BreakingTicker() {
    const [news, setNews] = useState([])

    useEffect(() => {
        load()
    }, [])

    const load = async () => {
        try {
            const q = query(
                collection(db, "news"),
                where("breaking", "==", true),
                limit(10)
            )

            const snap = await getDocs(q)

            setNews(
                snap.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
            )
        } catch (e) {
            console.error("breaking ticker error", e)
        }
    }

    if (!news?.length) return null

    return (
        <div className="bg-amber-500 text-black rounded-lg overflow-hidden">
            <div className="flex items-center">

                <div className="bg-amber-600 px-4 py-2 font-bold text-sm whitespace-nowrap">
                    ШУУРХАЙ
                </div>

                <div className="flex-1 overflow-hidden">
                    <div className="animate-marquee whitespace-nowrap flex gap-8 px-4 py-2">

                        {news.map((item) => (
                            <Link
                                key={item.id}
                                to={`/news/${item?.slug || item?.id}`}
                                className="hover:underline text-sm md:text-base font-medium"
                            >
                                {item?.title}
                            </Link>
                        ))}

                        {news.map((item) => (
                            <Link
                                key={`dup-${item.id}`}
                                to={`/news/${item?.slug || item?.id}`}
                                className="hover:underline text-sm md:text-base font-medium"
                            >
                                {item?.title}
                            </Link>
                        ))}

                    </div>
                </div>

            </div>
        </div>
    )
}