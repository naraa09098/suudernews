import { Link } from "react-router-dom"
import useRelatedNews from "../hooks/useRelatedNews"
import BlurImage from "./BlurImage"
import SectionTitle from "./SectionTitle"

export default function RelatedNews({ category, currentId }) {
    const news = useRelatedNews(category, currentId)

    if (!news?.length) return null

    return (
        <div className="mt-12">
            <SectionTitle title="Холбоотой мэдээ" />

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                {news.map((item) => (
                    <Link
                        key={item.id}
                        to={`/news/${item?.id}`}
                        className="group block"
                    >
                        <BlurImage
                            src={item?.image}
                            alt={item?.title}
                            className="aspect-[16/9] w-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                        />

                        <div className="mt-2 font-semibold line-clamp-2 group-hover:text-red-600 transition-colors">
                            {item?.title}
                        </div>

                        <div className="text-xs text-gray-500 mt-1">
                            {item?.views || 0} уншсан
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}