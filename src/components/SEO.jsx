import { Helmet } from "react-helmet-async"

export default function SEO({
    title,
    description,
    image,
    url,
    type = "website",
    publishedTime,
    author = "Suudernews"
}) {
    const siteTitle = "Suudernews.mn"

    const fullTitle = title
        ? `${title} | ${siteTitle}`
        : siteTitle

    const metaDescription =
        description || "Монголын шуурхай мэдээ мэдээлэл"

    const metaImage =
        image || "https://suudernews.mn/logo.png"

    const metaUrl =
        url || "https://suudernews.mn"

    return (
        <Helmet>
            <title>{fullTitle}</title>

            <meta name="description" content={metaDescription} />

            <link rel="canonical" href={metaUrl} />

            {/* Open Graph */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={metaImage} />
            <meta property="og:url" content={metaUrl} />

            {publishedTime && (
                <meta property="article:published_time" content={publishedTime} />
            )}

            <meta property="article:author" content={author} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={metaImage} />
        </Helmet>
    )
}