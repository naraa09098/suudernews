import useNews from "../hooks/useNews"
import { Link } from "react-router-dom"
import BlurImage from "./BlurImage"

export default function Sidebar() {
    const news = useNews()

    const trending = [...news]
        .sort((a, b) => (b?.views || 0) - (a?.views || 0))
        .slice(0, 5)

    if (!trending?.length) return null

    return (
        <div className="border rounded-lg p-4 bg-white">

            <h3 className="
    font-bold 
    text-amber-500 
    mb-4 
    pb-2 
    border-b
">
                Их уншсан
            </h3>

            <div className="space-y-4">
                {trending.map((item, i) => (
                    <Link
                        to={`/news/${item?.id}`}
                        key={item.id}
                        className="flex gap-3 group items-start"
                    >

                        {/* number */}
                        <span className="text-amber-500 font-bold text-lg w-5">
                            {i + 1}
                        </span>

                        {/* image */}
                        <div className="w-[72px] h-[52px] flex-shrink-0 overflow-hidden rounded">
                            <BlurImage
                                src={item?.image}
                                alt={item?.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>

                        {/* title */}
                        <div className="flex-1 text-sm leading-snug line-clamp-2 group-hover:text-amber-500 transition-colors">
                            {item?.title}
                        </div>

                    </Link>
                ))}
            </div>

        </div>
    )
}