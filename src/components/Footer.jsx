import { Link } from "react-router-dom"

export default function Footer() {
    return (
        <footer className="mt-16 border-t bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-10">

                <div className="grid md:grid-cols-3 gap-8">

                    {/* LOGO */}
                    <div>
                        <Link
                            to="/"
                            className="flex flex-col leading-tight"
                        >
                            <div className="flex items-end gap-1">

                                <span className="text-2xl font-extrabold text-gray-900">
                                    Suuder
                                </span>

                                <span className="text-2xl font-black text-amber-500">
                                    News
                                </span>

                                <span className="text-sm text-gray-900 mb-1">
                                    .mn
                                </span>

                            </div>

                            <span className="text-xs text-gray-500">
                                Мэдээ, мэдээллийн сайт
                            </span>
                        </Link>

                        <p className="text-sm text-gray-500 mt-3">
                            Эрх мэдэл зөв хүнд очвол ард түмэнд гэрэл мэт цагаан
                            сүүдэр тусгадаг.
                        </p>

                        <p className="text-sm text-gray-500">
                            Харин буруу хүнд очвол нийгэмд хар сүүдэр улам тэлдэг.
                        </p>
                    </div>

                    {/* CONTACT */}
                    <div>
                        <div className="font-semibold mb-3">
                            Холбоо барих
                        </div>

                        <div className="text-sm text-gray-600 space-y-2">
                            <div>Утас: 88639079</div>
                            <div>Email: Erkhmedliinsvvder@gmail.com</div>
                        </div>
                    </div>

                    {/* POLICY */}
                    <div>
                        <div className="font-semibold mb-3">
                            Нууцлалын бодлого
                        </div>

                        <p className="text-sm text-gray-600 leading-relaxed">
                            Сэтгүүлч мэдээлэгчийнхээ нууцыг алдвал тухайн хэвлэл,
                            мэдээллийн байгууллагад итгэх иргэдийн итгэл алдрах
                            аюултай. Бид ямар ч тохиолдолд эх сурвалжаа нууцлахад
                            хариуцлагатай хандана.
                        </p>
                    </div>

                </div>

                {/* bottom */}
                <div className="border-t mt-8 pt-4 text-sm text-gray-500 text-center">
                    © {new Date().getFullYear()} Suuder News.mn. Бүх эрх хуулиар хамгаалагдсан.
                </div>

            </div>
        </footer>
    )
}