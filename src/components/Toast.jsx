import { useEffect } from "react"

export default function Toast({ message, show, onClose }) {
    useEffect(() => {
        if (!show) return

        const timer = setTimeout(() => {
            onClose()
        }, 2000)

        return () => clearTimeout(timer)
    }, [show, onClose])

    if (!show) return null

    return (
        <div className="fixed top-6 right-6 z-50">
            <div className="bg-black text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in">
                {message}
            </div>
        </div>
    )
}