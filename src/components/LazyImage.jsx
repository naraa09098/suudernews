import { useState } from "react";

export default function LazyImage({
    src,
    alt,
    className
}) {
    const [loaded, setLoaded] = useState(false);

    if (!src) return null;

    return (
        <div className="relative">
            {!loaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
            )}

            <img
                src={src}
                alt={alt}
                loading="lazy"
                onLoad={() => setLoaded(true)}
                className={`${className} ${loaded ? "opacity-100" : "opacity-0"
                    } transition`}
            />
        </div>
    );
}