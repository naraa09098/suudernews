import { Link } from "react-router-dom"
import useCategoryNews from "../hooks/useCategoryNews"
import SkeletonGrid from "./SkeletonGrid"
import BlurImage from "./BlurImage"
import SectionTitle from "./SectionTitle"

export default function CategorySection({ title, category }) {
    const { news, loading } = useCategoryNews(category, 6)

    if (loading) {
        return (
            <section className="mt-10">
                <SectionTitle
                    title={title}
                    more={`/category/${category}`}
                />
                <SkeletonGrid />
            </section>
        )
    }

    if (!news?.length) return null

    const first = news[0]
    const rest = news.slice(1)

    return (
        <section className="mt-10">
            <SectionTitle
                title={title}
                more={`/category/${category}`}
            />

            <div className="grid lg:grid-cols-12 gap-6">

                {/* LEFT BIG */}
                <Link
                    to={`/news/${first?.slug || first?.id}`}
                    className="lg:col-span-5 group block"
                >
                    <div className="relative overflow-hidden rounded-xl">

                        <BlurImage
                            src={first?.image || ""}
                            alt={first?.title || ""}
                            className="w-full h-[220px] md:h-[260px] lg:h-[300px] object-cover group-hover:scale-105 transition duration-300"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                        <div className="absolute bottom-0 p-4">
                            <h3 className="text-white font-bold line-clamp-2">
                                {first?.title}
                            </h3>
                        </div>

                    </div>
                </Link>

                {/* RIGHT GRID */}
                <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">

                    {rest.map((item) => (
                        <Link
                            key={item.id}
                            to={`/news/${item?.slug || item?.id}`}
                            className="flex gap-3 group"
                        >
                            <div className="w-28 h-20 overflow-hidden rounded-lg flex-shrink-0">
                                <BlurImage
                                    src={item?.image || ""}
                                    alt={item?.title || ""}
                                    className="w-28 h-20 object-cover group-hover:scale-105 transition duration-300"
                                />
                            </div>

                            <div className="flex-1">
                                <h4 className="font-semibold leading-snug line-clamp-2 group-hover:text-red-600 transition-colors">
                                    {item?.title}
                                </h4>

                                <div className="text-xs text-gray-500 mt-1">
                                    {item?.views || 0} уншсан
                                </div>
                            </div>
                        </Link>
                    ))}

                </div>

            </div>
        </section>
    )
}