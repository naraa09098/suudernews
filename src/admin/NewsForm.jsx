import { useState, useEffect } from "react"
import { addDoc, collection, updateDoc, doc } from "firebase/firestore"
import { db } from "../firebase/firebase"
import Editor from "../components/Editor"
import Toast from "../components/Toast"

export default function NewsForm({ editing, setEditing, onSaved }) {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [category, setCategory] = useState("")
    const [featured, setFeatured] = useState(false)
    const [trending, setTrending] = useState(false)
    const [file, setFile] = useState(null)
    const [breaking, setBreaking] = useState(false)
    const [showToast, setShowToast] = useState(false)
    const [editorKey, setEditorKey] = useState(0)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        if (editing) {
            setTitle(editing.title || "")
            setContent(editing.content || "")
            setCategory(editing.category || "")
            setFeatured(editing.featured || false)
            setTrending(editing.trending || false)
            setBreaking(editing.breaking || false)
        }
        setEditorKey(prev => prev + 1)
    }, [editing])

    const uploadImage = async () => {
        if (!file) return editing?.image || ""

        const formData = new FormData()
        formData.append("file", file)
        formData.append("upload_preset", "suudernews")

        const res = await fetch(
            "https://api.cloudinary.com/v1_1/dkrrwqptv/image/upload",
            { method: "POST", body: formData }
        )
        const data = await res.json()

        if (data.error) throw new Error("Cloudinary: " + data.error.message)
        return data.secure_url
    }

    const hardReset = () => {
        setTitle("")
        setContent("")
        setCategory("")
        setFeatured(false)
        setTrending(false)
        setBreaking(false)
        setFile(null)
        setEditorKey(prev => prev + 1)
    }

    const save = async () => {
        if (saving) return
        if (!title.trim()) return alert("Гарчиг оруулна уу")

        setSaving(true)

        try {
            const imageUrl = await uploadImage()

            const newsData = {
                title,
                content,
                category,
                featured,
                trending,
                breaking,
                image: imageUrl,
            }

            if (editing) {
                await updateDoc(doc(db, "news", editing.id), newsData)
            } else {
                await addDoc(collection(db, "news"), {
                    ...newsData,
                    views: 0,
                    createdAt: Date.now()
                })
            }

            setShowToast(true)
            if (!editing) hardReset()
            onSaved && onSaved()

        } catch (err) {
            alert("Алдаа гарлаа: " + err.message)
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="border p-4 mb-8">
            <h3 className="font-bold mb-4">
                {editing ? "Мэдээ засах" : "Мэдээ нэмэх"}
            </h3>

            <input
                className="border p-2 w-full mb-2"
                placeholder="Гарчиг"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <div className="mb-3">
                <Editor
                    key={editorKey}
                    value={content || ""}
                    onChange={(val) => setContent(val || "")}
                />
            </div>

            <select
                className="border p-2 w-full mb-2"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="">Ангилал сонгох</option>
                <option value="uls-tur">Улс төр</option>
                <option value="niigem">Нийгэм</option>
                <option value="ediin-zasag">Эдийн засаг</option>
                <option value="niitlel">Нийтлэл</option>
                <option value="nevtruuleg">Нэвтрүүлэг</option>
            </select>

            <input
                type="file"
                className="mb-3"
                onChange={(e) => setFile(e.target.files[0])}
            />

            <div className="flex gap-4 mb-3">
                <label className="flex items-center gap-1 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={featured}
                        onChange={(e) => setFeatured(e.target.checked)}
                    />
                    Featured
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={trending}
                        onChange={(e) => setTrending(e.target.checked)}
                    />
                    Trending
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={breaking}
                        onChange={(e) => setBreaking(e.target.checked)}
                    />
                    Breaking
                </label>
            </div>

            <div className="flex gap-2 items-center">
                <button
                    className={`px-4 py-2 text-white transition-colors ${saving
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-black hover:bg-gray-800"
                        }`}
                    onClick={save}
                    disabled={saving}
                >
                    {saving ? "Хадгалж байна..." : editing ? "Шинэчлэх" : "Хадгалах"}
                </button>

                {editing && (
                    <button
                        className="px-4 py-2 border hover:bg-gray-100"
                        onClick={() => {
                            setEditing(null)
                            hardReset()
                        }}
                    >
                        Болих
                    </button>
                )}
            </div>

            <Toast
                show={showToast}
                message="Амжилттай хадгаллаа ✓"
                onClose={() => setShowToast(false)}
            />
        </div>
    )
}