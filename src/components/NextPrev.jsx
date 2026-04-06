import { Link } from "react-router-dom"
import useNextPrev from "../hooks/useNextPrev"
import BlurImage from "./BlurImage"

export default function NextPrev({ currentId }) {
    const { prev, next } = useNextPrev(currentId)

    return (
        <div className="grid md:grid-cols-2 gap-6 mt-10 border-t pt-6">
            {/* PREV */}
            <div>
                {prev && (
                    <Link
                        to={`/news/${prev?.id}`}
                        className="flex gap-3 group"
                    >
                        <div className="w-24 h-16 overflow-hidden rounded">
                            <BlurImage
                                src={prev?.image}
                                alt={prev?.title}
                                className="w-24 h-16 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>

                        <div>
                            <div className="text-xs text-gray-500">
                                ← Өмнөх мэдээ
                            </div>

                            <div className="font-medium line-clamp-2 group-hover:text-red-600 transition-colors">
                                {prev?.title}
                            </div>
                        </div>
                    </Link>
                )}
            </div>

            {/* NEXT */}
            <div className="md:text-right">
                {next && (
                    <Link
                        to={`/news/${next?.id}`}
                        className="flex gap-3 group md:justify-end"
                    >
                        <div className="md:order-2 w-24 h-16 overflow-hidden rounded">
                            <BlurImage
                                src={next?.image}
                                alt={next?.title}
                                className="w-24 h-16 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>

                        <div className="md:order-1">
                            <div className="text-xs text-gray-500">
                                Дараагийн мэдээ →
                            </div>

                            <div className="font-medium line-clamp-2 group-hover:text-red-600 transition-colors">
                                {next?.title}
                            </div>
                        </div>
                    </Link>
                )}
            </div>
        </div>
    )
}