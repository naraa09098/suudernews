import { useState } from "react"

export default function BlurImage({
    src,
    alt,
    className = "",
    loading = "lazy"
}) {
    const [loaded, setLoaded] = useState(false)

    if (!src) {
        return (
            <div className={`bg-gray-200 ${className}`} />
        )
    }

    return (
        <div className={`relative overflow-hidden ${className}`}>
            <img
                src={src}
                alt={alt}
                loading={loading}
                onLoad={() => setLoaded(true)}
                className={`
                w-full h-full object-cover
                transition duration-500
                ${loaded ? "blur-0 scale-100" : "blur-xl scale-105"}
                `}
            />
        </div>
    )
}