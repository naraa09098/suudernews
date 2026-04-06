import { useState } from "react"
import { signOut } from "firebase/auth"
import { auth } from "../firebase/firebase"

import NewsForm from "../admin/NewsForm"
import NewsList from "../admin/NewsList"
import AdminBanner from "../admin/AdminBanner"

export default function AdminDashboard() {
    const [editing, setEditing] = useState(null)
    const [reload, setReload] = useState(0)
    const [formKey, setFormKey] = useState(0)

    const logout = async () => {
        await signOut(auth)
        window.location.href = "/admin"
    }

    const refresh = () => {
        setReload(prev => prev + 1)
    }

    const handleAdd = () => {
        setEditing(null)
        setFormKey(prev => prev + 1) // force reset
    }

    const handleEdit = (item) => {
        setEditing(item)
        setFormKey(prev => prev + 1)
    }

    return (
        <div className="max-w-7xl mx-auto p-4">

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">
                    Admin Dashboard
                </h1>

                <div className="flex gap-2">
                    <button
                        onClick={handleAdd}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Add News
                    </button>

                    <button
                        onClick={logout}
                        className="bg-red-600 text-white px-4 py-2 rounded"
                    >
                        Logout
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">

                <div className="lg:col-span-7">
                    <NewsForm
                        key={formKey}
                        editing={editing}
                        setEditing={setEditing}
                        onSaved={refresh}
                    />
                </div>

                <div className="lg:col-span-3">
                    <NewsList
                        setEditing={handleEdit}
                        reload={reload}
                    />
                </div>

            </div>

            <div className="mt-10">
                <AdminBanner />
            </div>

        </div>
    )
}