import { useEffect, useState, useRef } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase/firebase"
import { Link } from "react-router-dom"
import BlurImage from "./BlurImage"
import SkeletonGrid from "./SkeletonGrid"

export default function NewsGrid({ search }) {
    const [news, setNews] = useState([])
    const [visible, setVisible] = useState(9)
    const [loading, setLoading] = useState(true)

    const loader = useRef(null)

    useEffect(() => {
        load()
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setVisible((v) => v + 6)
                }
            },
            { threshold: 1 }
        )

        if (loader.current) {
            observer.observe(loader.current)
        }

        return () => observer.disconnect()
    }, [])

    const load = async () => {
        try {
            const snap = await getDocs(collection(db, "news"))

            setNews(
                snap.docs.map((d) => ({
                    id: d.id,
                    ...d.data(),
                }))
            )
        } catch (err) {
            console.error("news load error", err)
        }

        setLoading(false)
    }

    const filtered = news
        ?.filter((n) =>
            n?.title
                ?.toLowerCase()
                ?.includes(search?.toLowerCase() || "")
        )
        ?.slice(0, visible)

    if (loading) {
        return <SkeletonGrid />
    }

    return (
        <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((n) => (
                    <Link
                        key={n.id}
                        to={`/news/${n.id}`}
                        className="block group"
                    >
                        <BlurImage
                            src={n?.image}
                            alt={n?.title}
                            className="aspect-[16/9]"
                            loading="lazy"
                        />

                        <div className="font-semibold mt-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                            {n?.title}
                        </div>
                    </Link>
                ))}
            </div>

            <div ref={loader} className="h-10" />
        </>
    )
}