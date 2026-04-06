import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { doc, getDoc, updateDoc, increment } from "firebase/firestore"
import { db } from "../firebase/firebase"

import SEO from "../components/SEO"
import RelatedNews from "../components/RelatedNews"
import ShareButtons from "../components/ShareButtons"
import readTime from "../utils/readTime"
import NextPrev from "../components/NextPrev"
import formatDate from "../utils/formatDate"
import Breadcrumb from "../components/Breadcrumb"
import Tags from "../components/Tags"
import BlurImage from "../components/BlurImage"
import StickySidebar from "../components/StickySidebar"
import timeAgo from "../utils/timeAgo"

export default function NewsDetail() {
    const { id } = useParams()
    const [news, setNews] = useState(null)

    useEffect(() => {
        const fetch = async () => {
            try {
                const ref = doc(db, "news", id)
                const snap = await getDoc(ref)

                if (snap.exists()) {
                    const data = snap.data()

                    setNews({
                        id: snap.id,
                        ...data,
                    })

                    await updateDoc(ref, {
                        views: increment(1),
                    })
                }
            } catch (err) {
                console.error("news detail error", err)
            }
        }

        fetch()
    }, [id])

    if (!news) return null

    const minutes = readTime(news?.content || "")
    const date = timeAgo(news?.createdAt)

    return (
        <>
            <SEO
                title={news?.title}
                description={news?.summary || news?.title}
                image={news?.image}
                url={`https://suudernews.mn/news/${news?.id}`}
            />

            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="grid lg:grid-cols-12 gap-8">

                    {/* LEFT CONTENT */}
                    <div className="lg:col-span-8">

                        <Breadcrumb
                            category={news?.category}
                            title={news?.title}
                        />

                        {/* CATEGORY + BREAKING */}
                        <div className="flex items-center gap-2 mb-2">

                            {news?.category && (
                                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 font-semibold">
                                    {news.category}
                                </span>
                            )}

                            {news?.breaking && (
                                <span className="bg-red-600 text-white text-xs px-2 py-1 font-bold">
                                    BREAKING
                                </span>
                            )}

                        </div>

                        <h1 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                            {news?.title}
                        </h1>

                        <ShareButtons title={news?.title} />

                        <div className="flex items-center gap-3 text-sm text-gray-500 mb-4 border-b pb-4">
                            <span className="font-semibold text-gray-900">
                                {news?.author || "Suudernews"}
                            </span>

                            <span>{date}</span>

                            <span>{news?.views || 0} уншсан</span>

                            <span>{minutes} минут</span>
                        </div>

                        {news?.image && (
                            <figure className="mb-6">
                                <div className="overflow-hidden rounded-lg">
                                    <BlurImage
                                        src={news?.image}
                                        alt={news?.title}
                                        className="w-full h-[260px] md:h-[420px] object-cover"
                                    />
                                </div>

                                {news?.imageCaption && (
                                    <figcaption className="text-xs text-gray-500 mt-2">
                                        {news?.imageCaption}
                                    </figcaption>
                                )}
                            </figure>
                        )}
                        {/* ARTICLE */}
                        <div
                            className="
                            prose 
                            prose-lg 
                            max-w-none

                            prose-headings:font-bold
                            prose-headings:text-gray-900
                            prose-headings:mt-8
                            prose-headings:mb-4

                            prose-p:text-gray-800
                            prose-p:leading-7
                            prose-p:my-4

                            prose-a:text-red-600
                            prose-a:no-underline
                            hover:prose-a:underline

                            prose-img:rounded-lg
                            prose-img:w-full
                            prose-img:max-w-full
                            prose-img:h-auto
                            prose-img:my-6
                            prose-img:mx-auto
                            prose-img:shadow-sm

                            prose-strong:text-gray-900

                            prose-ul:list-disc
                            prose-ul:pl-6

                            prose-ol:list-decimal
                            prose-ol:pl-6

                            prose-blockquote:border-l-4
                            prose-blockquote:border-red-500
                            prose-blockquote:pl-4
                            prose-blockquote:italic
                            prose-blockquote:my-6
                            "
                            dangerouslySetInnerHTML={{
                                __html: news?.content,
                            }}
                        />

                        <Tags tags={news?.tags} />

                        <NextPrev currentId={news?.id} />

                        <RelatedNews
                            category={news?.category}
                            currentId={news?.id}
                        />

                    </div>

                    {/* SIDEBAR */}
                    <div className="lg:col-span-4">
                        <StickySidebar />
                    </div>

                </div>
            </div>
        </>
    )
}