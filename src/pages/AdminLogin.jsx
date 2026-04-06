import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth"

import { auth } from "../firebase/firebase"

export default function AdminLogin() {
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState(null)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!auth) return

        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u)
        })

        return () => unsub()
    }, [])

    const login = async (e) => {
        e.preventDefault()

        if (!email || !password) return

        try {
            setLoading(true)

            await signInWithEmailAndPassword(
                auth,
                email,
                password
            )

            navigate("/admin/dashboard")
        } catch (err) {
            setError("Имэйл эсвэл нууц үг буруу")
        } finally {
            setLoading(false)
        }
    }

    const logout = async () => {
        await signOut(auth)
        setUser(null)
    }

    if (user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-white p-6 shadow w-96 text-center">
                    <h2 className="font-bold mb-4">
                        Admin нэвтэрсэн байна
                    </h2>

                    <button
                        onClick={() => navigate("/admin/dashboard")}
                        className="w-full bg-black text-white py-2 mb-2"
                    >
                        Dashboard
                    </button>

                    <button
                        onClick={logout}
                        className="w-full border py-2"
                    >
                        Logout
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form
                onSubmit={login}
                className="bg-white p-6 shadow w-96"
            >
                <h2 className="font-bold mb-4">
                    Admin Login
                </h2>

                <input
                    className="border p-2 w-full mb-2"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    className="border p-2 w-full mb-3"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                <button
                    disabled={loading}
                    className="bg-black text-white w-full py-2"
                >
                    {loading ? "Logging..." : "Login"}
                </button>

                {error && (
                    <div className="text-red-500 mt-2">
                        {error}
                    </div>
                )}
            </form>
        </div>
    )
}