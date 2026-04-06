import { Link } from "react-router-dom"

export default function Tags({ tags }) {
    if (!tags || !tags.length) return null

    return (
        <div className="mt-8 border-t pt-6">
            <div className="text-sm font-semibold mb-3">
                Түлхүүр үг
            </div>

            <div className="flex flex-wrap gap-2">
                {tags.map((tag, i) => (
                    <Link
                        key={i}
                        to={`/search?q=${tag}`}
                        className="text-sm bg-gray-100 hover:bg-red-50 hover:text-red-600 px-3 py-1.5 rounded-md transition-colors"
                    >
                        #{tag}
                    </Link>
                ))}
            </div>
        </div>
    );
}