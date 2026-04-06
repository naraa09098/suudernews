import { Link } from "react-router-dom"
import useTrending from "../hooks/useTrending"
import BlurImage from "./BlurImage"
import SectionTitle from "./SectionTitle"

export default function TrendingWidget() {
    const { news, loading } = useTrending()

    if (loading) {
        return (
            <div className="bg-white border rounded-lg p-4 animate-pulse">
                <div className="h-5 bg-gray-200 w-32 mb-4" />

                <div className="space-y-3">
                    <div className="h-16 bg-gray-200" />
                    <div className="h-16 bg-gray-200" />
                    <div className="h-16 bg-gray-200" />
                    <div className="h-16 bg-gray-200" />
                </div>
            </div>
        )
    }

    if (!news?.length) return null

    return (
        <div className="bg-white border rounded-lg p-4">

            <SectionTitle title="🔥 Эрэлттэй" />

            <div className="space-y-4">
                {news.map((item, i) => (
                    <Link
                        key={item.id}
                        to={`/news/${item?.slug || item?.id}`}
                        className="flex gap-3 group items-start"
                    >

                        {/* NUMBER */}
                        <span className="text-amber-500 font-bold text-lg w-5">
                            {i + 1}
                        </span>

                        {/* IMAGE */}
                        <div className="w-[72px] h-[52px] flex-shrink-0 overflow-hidden rounded">
                            <BlurImage
                                src={item?.image}
                                alt={item?.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>

                        {/* TEXT */}
                        <div className="flex-1">
                            <div className="text-sm font-medium line-clamp-2 group-hover:text-amber-500 transition-colors">
                                {item?.title}
                            </div>

                            <div className="text-xs text-gray-500">
                                {item?.views || 0} уншсан
                            </div>
                        </div>

                    </Link>
                ))}
            </div>

        </div>
    )
}