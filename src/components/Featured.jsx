import { Link } from "react-router-dom"
import useNews from "../hooks/useNews"
import BlurImage from "./BlurImage"

export default function Featured() {
    const news = useNews()

    const featured = news?.filter((n) => n?.featured)

    if (!featured?.length) return null

    const main = featured[0]
    const side = featured.slice(1, 4)

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* BIG NEWS */}
            <div className="md:col-span-2">
                <Link to={`/news/${main?.id}`} className="block group">
                    <div className="relative overflow-hidden rounded-lg">
                        <BlurImage
                            src={main?.image}
                            alt={main?.title}
                            className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-300"
                        />

                        <div className="absolute bottom-0 bg-white/90 p-4 w-full">
                            <h2 className="text-xl font-semibold group-hover:text-red-600 transition-colors">
                                {main?.title}
                            </h2>
                        </div>
                    </div>
                </Link>
            </div>

            {/* SIDE NEWS */}
            <div className="space-y-4">
                {side.map((item) => (
                    <Link
                        to={`/news/${item?.id}`}
                        key={item.id}
                        className="block group"
                    >
                        <div className="flex gap-3">
                            <div className="w-28 h-20 overflow-hidden rounded">
                                <BlurImage
                                    src={item?.image}
                                    alt={item?.title}
                                    className="w-28 h-20 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            <div className="text-sm font-medium line-clamp-2 group-hover:text-red-600 transition-colors">
                                {item?.title}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}