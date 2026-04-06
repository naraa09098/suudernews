import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "@/firebase"
import { Navigate } from "react-router-dom"

export default function AdminRoute({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!auth) return

        const unsubscribe = onAuthStateChanged(auth, (u) => {
            setUser(u)
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        )
    }

    if (!user) {
        return <Navigate to="/" />
    }

    return children
}