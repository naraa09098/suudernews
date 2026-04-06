import { Link } from "react-router-dom"

export default function NotFound() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">

            <div className="text-6xl font-bold text-gray-300">
                404
            </div>

            <h1 className="text-2xl font-semibold mt-4">
                Хуудас олдсонгүй
            </h1>

            <p className="text-gray-500 mt-2">
                Таны хайсан хуудас байхгүй байна
            </p>

            <Link
                to="/"
                className="inline-block mt-6 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
            >
                Нүүр хуудас руу буцах
            </Link>

        </div>
    )
}