export default async function handler(req, res) {
    const base = "https://suudernews.mn"

    try {
        const response = await fetch(
            "https://firestore.googleapis.com/v1/projects/suudernews/databases/(default)/documents/news?pageSize=100"
        )

        const data = await response.json()

        const docs = data.documents || []

        const urls = docs.map(doc => {
            const id = doc.name.split("/").pop()
            const fields = doc.fields || {}

            const slug = fields.slug?.stringValue || id

            const date =
                fields.createdAt?.timestampValue ||
                new Date().toISOString()

            return `
      <url>
        <loc>${base}/news/${slug}</loc>
        <lastmod>${date}</lastmod>
        <priority>0.8</priority>
      </url>`
        }).join("")

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

      <url>
        <loc>${base}</loc>
        <priority>1.0</priority>
      </url>

      ${urls}

    </urlset>`

        res.setHeader("Content-Type", "text/xml")
        res.status(200).send(xml)

    } catch (e) {
        res.status(500).send("sitemap error")
    }
}