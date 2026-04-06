export default function SectionTitle({ title, more }) {
    return (
        <div className="flex items-center justify-between mb-4 border-b pb-2">
            <h2 className="text-lg md:text-xl font-bold">
                {title}
            </h2>

            {more && (
                <a
                    href={more}
                    className="text-sm text-red-600 hover:underline"
                >
                    Бүгд
                </a>
            )}
        </div>
    )
}