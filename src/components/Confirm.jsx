export default function Confirm({
    show,
    onCancel,
    onConfirm,
    title = "Устгах уу?"
}) {
    if (!show) return null

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl p-6 w-full max-w-sm">
                <h3 className="text-lg font-semibold mb-4">
                    {title}
                </h3>

                <div className="flex justify-end gap-2">
                    <button
                        className="px-4 py-2 border rounded-lg"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                    <button
                        className="px-4 py-2 bg-red-600 text-white rounded-lg"
                        onClick={onConfirm}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}