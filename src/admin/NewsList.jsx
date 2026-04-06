import { useEffect, useState } from "react"
import {
    collection,
    getDocs,
    deleteDoc,
    doc,
    updateDoc
} from "firebase/firestore"

import { db } from "../firebase/firebase"
import Confirm from "../components/Confirm"
import Toast from "../components/Toast"

export default function NewsList({ setEditing, reload }) {
    const [news, setNews] = useState([])
    const [filtered, setFiltered] = useState([])

    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("")
    const [sort, setSort] = useState("newest")
    const [onlyFeatured, setOnlyFeatured] = useState(false)
    const [onlyBreaking, setOnlyBreaking] = useState(false)

    const [confirm, setConfirm] = useState(false)
    const [deleteId, setDeleteId] = useState(null)
    const [showToast, setShowToast] = useState(false)

    const [page, setPage] = useState(1)
    const perPage = 10

    useEffect(() => {
        load()
    }, [reload])

    const load = async () => {
        const snap = await getDocs(collection(db, "news"))

        const list = snap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }))

        setNews(list)
        setFiltered(list)
    }

    useEffect(() => {
        let list = [...news]

        if (search) {
            list = list.filter((n) =>
                n.title
                    ?.toLowerCase()
                    .includes(search.toLowerCase())
            )
        }

        if (category) {
            list = list.filter((n) => n.category === category)
        }

        if (onlyFeatured) {
            list = list.filter((n) => n.featured)
        }

        if (onlyBreaking) {
            list = list.filter((n) => n.breaking)
        }

        if (sort === "newest") {
            list.sort((a, b) => b.createdAt - a.createdAt)
        }

        if (sort === "oldest") {
            list.sort((a, b) => a.createdAt - b.createdAt)
        }

        setFiltered(list)
        setPage(1)
    }, [
        search,
        category,
        sort,
        onlyFeatured,
        onlyBreaking,
        news
    ])

    const remove = async () => {
        await deleteDoc(doc(db, "news", deleteId))

        setNews(news.filter((n) => n.id !== deleteId))

        setConfirm(false)
        setShowToast(true)
    }

    const toggleFeatured = async (item) => {
        const value = !item.featured

        await updateDoc(doc(db, "news", item.id), {
            featured: value
        })

        setNews(
            news.map((n) =>
                n.id === item.id ? { ...n, featured: value } : n
            )
        )
    }

    const toggleBreaking = async (item) => {
        const value = !item.breaking

        await updateDoc(doc(db, "news", item.id), {
            breaking: value
        })

        setNews(
            news.map((n) =>
                n.id === item.id ? { ...n, breaking: value } : n
            )
        )
    }

    const totalPages = Math.ceil(filtered.length / perPage)

    const paginated = filtered.slice(
        (page - 1) * perPage,
        page * perPage
    )

    return (
        <div>

            <h3 className="font-bold mb-3">
                News List
            </h3>

            {/* SEARCH */}

            <input
                placeholder="Хайх..."
                className="border p-2 w-full mb-3"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {/* FILTER */}

            <div className="flex flex-wrap gap-2 mb-4">

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">All</option>
                    <option value="uls-tur">Улс төр</option>
                    <option value="niigem">Нийгэм</option>
                    <option value="ediin-zasag">Эдийн засаг</option>
                    <option value="niitlel">Нийтлэл</option>
                    <option value="nevtruuleg">Нэвтрүүлэг</option>
                </select>

                <select
                    className="border p-2"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                </select>

                <label className="flex items-center gap-1">
                    <input
                        type="checkbox"
                        checked={onlyFeatured}
                        onChange={(e) =>
                            setOnlyFeatured(e.target.checked)
                        }
                    />
                    Featured
                </label>

                <label className="flex items-center gap-1">
                    <input
                        type="checkbox"
                        checked={onlyBreaking}
                        onChange={(e) =>
                            setOnlyBreaking(e.target.checked)
                        }
                    />
                    Breaking
                </label>

            </div>

            {/* LIST */}

            <div className="space-y-2">

                {paginated.map((item) => (
                    <div
                        key={item.id}
                        className="border p-3 flex justify-between items-center"
                    >
                        <div>
                            <div className="font-semibold">
                                {item.title}
                            </div>

                            <div className="text-sm text-gray-500">
                                {item.category}
                            </div>

                            <div className="flex gap-3 mt-1 text-xs">

                                <button
                                    onClick={() =>
                                        toggleFeatured(item)
                                    }
                                    className={`px-2 py-1 border ${item.featured
                                        ? "bg-black text-white"
                                        : ""
                                        }`}
                                >
                                    Featured
                                </button>

                                <button
                                    onClick={() =>
                                        toggleBreaking(item)
                                    }
                                    className={`px-2 py-1 border ${item.breaking
                                        ? "bg-red-600 text-white"
                                        : ""
                                        }`}
                                >
                                    Breaking
                                </button>

                            </div>

                        </div>

                        <div className="flex gap-2">

                            <button
                                className="px-3 py-1 bg-blue-600 text-white"
                                onClick={() => setEditing(item)}
                            >
                                Edit
                            </button>

                            <button
                                className="px-3 py-1 bg-red-600 text-white"
                                onClick={() => {
                                    setDeleteId(item.id)
                                    setConfirm(true)
                                }}
                            >
                                Delete
                            </button>

                        </div>
                    </div>
                ))}

            </div>

            <div className="flex gap-2 mt-4 flex-wrap">
                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setPage(i + 1)}
                        className={`px-3 py-1 border ${page === i + 1
                            ? "bg-black text-white"
                            : ""
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>

            <Confirm
                show={confirm}
                onCancel={() => setConfirm(false)}
                onConfirm={remove}
            />

            <Toast
                show={showToast}
                message="Устгагдлаа"
                onClose={() => setShowToast(false)}
            />

        </div>
    )
}