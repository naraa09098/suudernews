import SkeletonCard from "./SkeletonCard"

export default function SkeletonGrid() {
    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
                <SkeletonCard key={i} />
            ))}
        </div>
    )
}