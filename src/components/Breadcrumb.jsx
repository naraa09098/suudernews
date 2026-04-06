import { Link } from "react-router-dom"

const categoryNames = {
    "uls-tur": "Улс төр",
    "niigem": "Нийгэм",
    "ediin-zasag": "Эдийн засаг",
    "delhii": "Дэлхий",
    "nevtruuleg": "Нэвтрүүлэг",
    "busad": "Бусад"
}

export default function Breadcrumb({ category, title }) {
    const label = categoryNames[category] || category

    return (
        <div className="text-sm text-gray-500 mb-3">
            <Link to="/" className="hover:underline">
                Нүүр
            </Link>

            <span className="mx-2">›</span>

            <Link
                to={`/category/${category}`}
                className="hover:underline"
            >
                {label}
            </Link>

            <span className="mx-2">›</span>

            <span className="text-gray-700">
                {title}
            </span>
        </div>
    )
}