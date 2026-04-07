import SEO from "../components/SEO"
import BreakingTicker from "../components/BreakingTicker"
import HomepageSlider from "../components/HomepageSlider"
import NewsGrid from "../components/NewsGrid"
import StickySidebar from "../components/StickySidebar"
import CategorySection from "../components/CategorySection"
import TopNews from "../components/TopNews"
import FeaturedGrid from "../components/FeaturedGrid"
import TrendingWidget from "../components/TrendingWidget"
import Sidebar from "../components/Sidebar"
import HomepageBanner from "../components/HomepageBanner"
import FeaturedNewsSlider from "../components/FeaturedNewsSlider"
import NewsSlider from "../components/NewsSlider"


export default function Home() {
    return (
        <>
            <SEO
                title="Suudernews - Шуурхай мэдээ"
                description="Монголын хамгийн сүүлийн үеийн мэдээ мэдээлэл"
                url="https://suudernews.mn"
            />

            <div className="max-w-7xl mx-auto px-4">

                {/* <div className="mt-2">
                    <BreakingTicker />
                </div> */}

                {/* SLIDER + TRENDING + MOST READ */}
                <div className="grid lg:grid-cols-12 gap-8 mt-4 items-start">

                    {/* LEFT */}
                    <div className="lg:col-span-8 flex flex-col">
                        <HomepageSlider />
                        <HomepageBanner />
                    </div>

                    {/* RIGHT */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <div className="mt-0">
                            <TrendingWidget />
                        </div>

                        <Sidebar />
                    </div>

                </div>


                {/* FEATURED */}
                <div className="mt-6">
                    <FeaturedGrid />
                </div>

                {/* <FeaturedNewsSlider /> */}

                <NewsSlider />





                <div className="grid lg:grid-cols-12 gap-8 mt-8">

                    {/* <div className="lg:col-span-8 space-y-10">

                        <CategorySection
                            title="Улс төр"
                            category="politics"
                        />

                        <CategorySection
                            title="Эдийн засаг"
                            category="economy"
                        />

                        <CategorySection
                            title="Нийгэм"
                            category="society"
                        />

                        <CategorySection
                            title="Нийтлэл"
                            category="niitlel"
                        />

                        <CategorySection
                            title="Нэвтрүүлэг"
                            category="nevtruuleg"
                        />



                    </div> */}

                    {/* <div className="lg:col-span-4">
                        <StickySidebar />
                    </div> */}

                </div>

            </div>
        </>
    )
}