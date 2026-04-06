export default function SkeletonCard() {
    return (
        <div className="animate-pulse">
            <div className="bg-gray-200 aspect-[16/9] w-full rounded-lg" />

            <div className="mt-3 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
            </div>
        </div>
    )
}