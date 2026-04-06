export default function readTime(html) {
    if (!html) return 1;

    const text = html.replace(/<[^>]*>?/gm, "");

    const words = text.split(/\s+/).length;

    const minutes = Math.ceil(words / 200);

    return minutes;
}