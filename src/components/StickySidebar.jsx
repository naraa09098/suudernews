import TrendingWidget from "./TrendingWidget"
import Sidebar from "./Sidebar"

export default function StickySidebar() {
    return (
        <aside className="space-y-8 lg:sticky lg:top-24 self-start">

            <div className="bg-white rounded-xl border p-4">
                <TrendingWidget />
            </div>

            <div className="bg-white rounded-xl border p-4">
                <Sidebar />
            </div>

        </aside>
    )
}