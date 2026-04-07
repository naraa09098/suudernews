import SEO from "../components/SEO"
import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import {
    collection,
    query,
    where,
    getDocs,
    orderBy
} from "firebase/firestore"

import { db } from "../firebase/firebase"
import BlurImage from "../components/BlurImage"
import StickySidebar from "../components/StickySidebar"

export default function Category() {
    const { name } = useParams()

    const [news, setNews] = useState([])
    const [featured, setFeatured] = useState(null)
    const [loading, setLoading] = useState(true)

    const titles = {
        "uls-tur": "Улс төр",
        "niigem": "Нийгэм",
        "ediin-zasag": "Эдийн засаг",
        "niitlel": "Нийтлэл",
        "nevtruuleg": "Нэвтрүүлэг"
    }

    useEffect(() => {
        load()
    }, [name])

    const load = async () => {
        try {
            setLoading(true)

            const q = query(
                collection(db, "news"),
                where("category", "==", name),
                orderBy("createdAt", "desc")
            )

            const snap = await getDocs(q)

            const list = snap.docs.map((d) => ({
                id: d.id,
                ...d.data()
            }))

            setFeatured(list[0] || null)
            setNews(list.slice(1))

        } catch (err) {
            console.error("category error", err)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto mt-6 px-4">
                <div className="animate-pulse h-80 bg-gray-200 rounded-lg" />
            </div>
        )
    }

    if (!featured && news.length === 0) {
        return (
            <div className="max-w-7xl mx-auto mt-10 px-4 text-center">
                <h2 className="text-xl font-semibold">
                    Мэдээ олдсонгүй
                </h2>
            </div>
        )
    }

    const title = titles[name] || name

    return (
        <>
            <SEO
                title={`${title} мэдээ`}
                description={`${title} ангиллын хамгийн сүүлийн мэдээ мэдээлэл`}
                url={`https://suudernews.mn/category/${name}`}
            />

            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    name: `${title} мэдээ`,
                    url: `https://suudernews.mn/category/${name}`,
                    isPartOf: {
                        "@type": "WebSite",
                        name: "Suudernews.mn",
                        url: "https://suudernews.mn"
                    }
                })}
            </script>

            <div className="max-w-7xl mx-auto mt-6 px-4">
                <h1 className="text-2xl font-bold mb-6">
                    {title}
                </h1>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* LEFT */}
                    <div className="lg:col-span-8">

                        {featured && (
                            <Link
                                to={`/news/${featured.slug || featured.id}`}
                                className="block group"
                            >
                                <BlurImage
                                    src={featured.image}
                                    alt={featured.title}
                                    className="w-full h-[320px] md:h-[420px] object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                                />

                                <h2 className="text-xl font-bold mt-3 group-hover:text-red-600">
                                    {featured.title}
                                </h2>
                            </Link>
                        )}

                        <div className="grid sm:grid-cols-2 gap-6 mt-6">
                            {news.map((n) => (
                                <Link
                                    key={n.id}
                                    to={`/news/${n.slug || n.id}`}
                                    className="group block"
                                >
                                    <BlurImage
                                        src={n.image}
                                        alt={n.title}
                                        className="w-full h-40 object-cover rounded-lg group-hover:scale-105"
                                    />

                                    <div className="font-medium mt-2 line-clamp-2 group-hover:text-red-600">
                                        {n.title}
                                    </div>
                                </Link>
                            ))}
                        </div>

                    </div>

                    {/* RIGHT */}
                    <div className="lg:col-span-4">
                        <StickySidebar />
                    </div>
                </div>
            </div>
        </>
    )
}