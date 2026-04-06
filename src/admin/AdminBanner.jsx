import { useEffect, useState } from "react";
import {
    collection,
    addDoc,
    deleteDoc,
    doc,
    updateDoc,
    onSnapshot,
    orderBy,
    query
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const DEFAULT = "/default-banner.svg";

export default function AdminBanner() {
    const [banners, setBanners] = useState([]);
    const [file, setFile] = useState(null);

    const [form, setForm] = useState({
        title: "",
        image: "",
        link: "",
        position: "homepage",
        order: 1
    });

    useEffect(() => {
        const q = query(
            collection(db, "banners"),
            orderBy("order", "asc")
        );

        const unsub = onSnapshot(q, (snap) => {
            setBanners(
                snap.docs.map((d) => ({
                    id: d.id,
                    ...d.data()
                }))
            );
        });

        return () => unsub();
    }, []);

    const uploadImage = async () => {

        // upload байхгүй, url байхгүй
        if (!file && !form.image) {
            return DEFAULT;
        }

        // upload байхгүй, url байгаа
        if (!file && form.image) {
            return form.image;
        }

        // upload хийх
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "suudernews");

        const res = await fetch(
            "https://api.cloudinary.com/v1_1/dkrrwqptv/image/upload",
            {
                method: "POST",
                body: formData
            }
        );

        const data = await res.json();
        return data.secure_url;
    };

    const handleAdd = async (e) => {
        e.preventDefault();

        const imageUrl = await uploadImage();

        await addDoc(collection(db, "banners"), {
            ...form,
            image: imageUrl,
            active: true,
            createdAt: new Date()
        });

        setForm({
            title: "",
            image: "",
            link: "",
            position: "homepage",
            order: 1
        });

        setFile(null);
    };

    const handleDelete = async (id) => {
        if (!confirm("Banner устгах уу?")) return;
        await deleteDoc(doc(db, "banners", id));
    };

    const handleActiveChange = async (id, value) => {
        await updateDoc(
            doc(db, "banners", id),
            { active: value }
        );
    };

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">
                Banner удирдах
            </h1>

            <form
                onSubmit={handleAdd}
                className="bg-white p-4 rounded-xl shadow space-y-3"
            >
                <input
                    placeholder="Гарчиг"
                    className="w-full border p-2 rounded"
                    value={form.title}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            title: e.target.value
                        })
                    }
                />

                <input
                    placeholder="Image URL"
                    className="w-full border p-2 rounded"
                    value={form.image}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            image: e.target.value
                        })
                    }
                />

                <input
                    type="file"
                    className="w-full"
                    onChange={(e) =>
                        setFile(e.target.files[0])
                    }
                />

                <input
                    placeholder="Link"
                    className="w-full border p-2 rounded"
                    value={form.link}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            link: e.target.value
                        })
                    }
                />

                <select
                    className="w-full border p-2 rounded"
                    value={form.position}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            position: e.target.value
                        })
                    }
                >
                    <option value="homepage">
                        Homepage
                    </option>
                    <option value="sidebar">
                        Sidebar
                    </option>
                    <option value="detail">
                        News Detail
                    </option>
                </select>

                <input
                    type="number"
                    className="w-full border p-2 rounded"
                    placeholder="Order"
                    value={form.order}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            order: Number(e.target.value)
                        })
                    }
                />

                <button className="bg-yellow-400 px-4 py-2 rounded font-semibold">
                    Banner нэмэх
                </button>
            </form>

            <div className="space-y-3">
                {banners.map((banner) => (
                    <div
                        key={banner.id}
                        className="flex items-center gap-4 bg-white p-3 rounded-xl shadow"
                    >
                        <img
                            src={banner.image ? banner.image : DEFAULT}
                            className="w-40 h-16 object-cover rounded"
                        />

                        <div className="flex-1">
                            <div className="font-semibold">
                                {banner.title}
                            </div>

                            <div className="text-sm text-gray-500">
                                {banner.position}
                            </div>
                        </div>

                        <input
                            type="checkbox"
                            checked={banner.active || false}
                            onChange={(e) =>
                                handleActiveChange(
                                    banner.id,
                                    e.target.checked
                                )
                            }
                            className="w-5 h-5"
                        />

                        <button
                            onClick={() =>
                                handleDelete(banner.id)
                            }
                            className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}