export default async function handler(req, res) {

    const base = "https://suudernews.mn"

    const response = await fetch(
        "https://firestore.googleapis.com/v1/projects/YOUR_PROJECT_ID/databases/(default)/documents/news"
    )

    const data = await response.json()

    const news = data.documents || []

    const urls = news.map(doc => {
        const fields = doc.fields

        const id = doc.name.split("/").pop()

        const slug =
            fields.slug?.stringValue || id

        const date =
            fields.createdAt?.timestampValue ||
            new Date().toISOString()

        return `
<url>
<loc>${base}/news/${slug}</loc>
<lastmod>${date}</lastmod>
</url>
`
    }).join("")

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

<url>
<loc>${base}</loc>
</url>

${urls}

</urlset>`

    res.setHeader("Content-Type", "text/xml")
    res.send(xml)
}