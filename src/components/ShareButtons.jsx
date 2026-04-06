export default function ShareButtons({ title }) {
    const url = window.location.href

    const facebook = () => {
        window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${url}`,
            "_blank"
        )
    }

    const twitter = () => {
        window.open(
            `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
            "_blank"
        )
    }

    const copy = async () => {
        await navigator.clipboard.writeText(url)
    }

    return (
        <div className="flex items-center gap-3 mb-3">
            <button
                onClick={facebook}
                className="text-sm text-gray-500 hover:text-blue-600"
            >
                Facebook
            </button>

            <button
                onClick={twitter}
                className="text-sm text-gray-500 hover:text-black"
            >
                Twitter
            </button>

            <button
                onClick={copy}
                className="text-sm text-gray-500 hover:text-red-600"
            >
                Copy
            </button>
        </div>
    )
}