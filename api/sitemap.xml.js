export default async function handler(req, res) {

    const base = "https://suudernews.mn"

    const r = await fetch(
        "https://firestore.googleapis.com/v1/projects/suudernews/databases/(default)/documents/news"
    )

    const json = await r.json()

    const docs = json.documents || []

    let urls = ""

    for (const doc of docs) {

        const id = doc.name.split("/").pop()
        const f = doc.fields || {}

        const slug = f.slug?.stringValue || id

        const date =
            f.createdAt?.timestampValue ||
            new Date().toISOString()

        urls += `
<url>
<loc>${base}/news/${slug}</loc>
<lastmod>${date}</lastmod>
</url>
`
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

<url>
<loc>${base}/</loc>
</url>

${urls}

</urlset>`

    res.setHeader("Content-Type", "text/xml")
    res.send(xml)

}