export default function timeAgo(timestamp) {
    if (!timestamp) return ""

    const now = Date.now()
    const diff = now - timestamp

    const minute = 60 * 1000
    const hour = 60 * minute
    const day = 24 * hour

    if (diff < minute) return "саяхан"

    if (diff < hour)
        return Math.floor(diff / minute) + " минутын өмнө"

    if (diff < day)
        return Math.floor(diff / hour) + " цагийн өмнө"

    return Math.floor(diff / day) + " хоногийн өмнө"
}