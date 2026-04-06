import useBanners from "../hooks/useBanners";

const DEFAULT = "/default-banner.svg";

export default function HomepageBanner() {
    const { banners, loading } = useBanners("homepage");

    if (loading) {
        return (
            <div className="w-full h-[100px] md:h-[120px] bg-gray-100 animate-pulse rounded-lg my-6" />
        );
    }

    // banner байхгүй бол default харуулна
    if (!banners || banners.length === 0) {
        return (
            <div className="my-16">
                <img
                    src={DEFAULT}
                    className="w-full h-[100px] md:h-[120px] object-cover rounded-lg"
                />
            </div>
        );
    }

    return (
        <div className="my-16">
            {banners.map((banner) => (
                <a
                    key={banner.id}
                    href={banner.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                >
                    <img
                        src={banner.image ? banner.image : DEFAULT}
                        alt={banner.title}
                        className="
                        w-full
                        h-[100px]
                        md:h-[120px]
                        object-cover
                        rounded-lg
                    "
                    />
                </a>
            ))}
        </div>
    );
}