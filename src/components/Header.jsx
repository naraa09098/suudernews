import { Link, NavLink, useNavigate } from "react-router-dom"
import { useState } from "react"

export default function Header() {
    const [q, setQ] = useState("")
    const [open, setOpen] = useState(false)
    const [mega, setMega] = useState(false)
    const navigate = useNavigate()

    const submit = (e) => {
        e.preventDefault()
        if (!q.trim()) return
        navigate(`/search?q=${q}`)
        setOpen(false)
    }

    const navClass = ({ isActive }) =>
        isActive
            ? "text-amber-500 border-b-2 border-amber-500 pb-2"
            : "hover:text-amber-500 pb-2 border-b-2 border-transparent"

    return (

        <header className="sticky top-0 z-50 bg-white border-b">

            <div className="max-w-7xl mx-auto px-4">

                {/* TOP */}
                <div className="flex items-center justify-between py-3">

                    {/* MOBILE MENU BTN */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="md:hidden text-2xl"
                    >
                        ☰
                    </button>

                    {/* LOGO */}
                    <Link
                        to="/"
                        className="flex flex-col leading-tight select-none"
                    >
                        <div className="flex items-end gap-1">

                            <span className="text-xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                                Suuder
                            </span>

                            <span className="text-xl md:text-3xl font-black text-amber-500 tracking-tight">
                                News
                            </span>

                            <span className="text-xs md:text-base text-gray-900 mb-1">
                                .mn
                            </span>

                        </div>

                        <span className="text-[10px] md:text-xs text-gray-500 tracking-wide">
                            Мэдээ, мэдээллийн сайт
                        </span>

                        <span className="hidden md:block text-[10px] text-gray-400 italic leading-tight mt-1">
                            Эрх мэдэл зөв хүнд очвол ард түмэнд гэрэл мэт цагаан сүүдэр тусгадаг.
                            <br />
                            Харин буруу хүнд очвол нийгэмд хар сүүдэр улам тэлдэг.
                        </span>

                    </Link>



                    {/* MOBILE SEARCH ICON */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="md:hidden text-xl"
                    >
                        🔍
                    </button>

                    {/* DESKTOP SEARCH */}
                    <form onSubmit={submit} className="hidden md:block">
                        <input
                            className="border rounded-xl px-4 py-2 w-72 focus:outline-none focus:ring-2 focus:ring-amber-500"
                            placeholder="Хайх мэдээ..."
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                        />
                    </form>

                </div>

                {/* NAV */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-semibold border-t relative">

                    <NavLink to="/category/uls-tur" className={navClass}>
                        Улс төр
                    </NavLink>

                    <NavLink to="/category/niigem" className={navClass}>
                        Нийгэм
                    </NavLink>

                    <NavLink to="/category/ediin-zasag" className={navClass}>
                        Эдийн засаг
                    </NavLink>

                    <NavLink to="/category/niitlel" className={navClass}>
                        Нийтлэл
                    </NavLink>

                    <NavLink to="/category/nevtruuleg" className={navClass}>
                        Нэвтрүүлэг
                    </NavLink>

                    {/* <div
                        className="relative"
                        onMouseEnter={() => setMega(true)}
                        onMouseLeave={() => setMega(false)}
                    >
                        <button className="hover:text-amber-500 pb-2">
                            Бусад
                        </button>

                        {mega && (
                            <div className="absolute left-0 top-full mt-2 w-[600px] bg-white border rounded-xl shadow-xl p-6 grid grid-cols-3 gap-6 z-50">

                                <div className="space-y-2">
                                    <div className="font-bold">Улс төр</div>
                                    <Link to="/category/politics">Ерөнхийлөгч</Link>
                                    <Link to="/category/politics">УИХ</Link>
                                    <Link to="/category/politics">ЗГ</Link>
                                </div>

                                <div className="space-y-2">
                                    <div className="font-bold">Нийгэм</div>
                                    <Link to="/category/society">ЭМЯ</Link>
                                    <Link to="/category/society">Боловсрол</Link>
                                    <Link to="/category/society">Зам</Link>
                                </div>

                                <div className="space-y-2">
                                    <div className="font-bold">Бусад</div>
                                    <Link to="/category/niitlel">Нэвтрүүлэг</Link>
                                    <Link to="/category/nevtruuleg">Нийтлэл</Link>
                                    <Link to="/category/economy">Эдийн засаг</Link>
                                </div>

                            </div>
                        )}
                    </div> */}

                </nav>

            </div>

            {/* MOBILE PANEL */}
            {open && (
                <div className="md:hidden border-t bg-white shadow-lg">

                    <div className="p-4 space-y-4">

                        <form onSubmit={submit}>
                            <input
                                className="border rounded-xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-amber-500"
                                placeholder="Хайх мэдээ..."
                                value={q}
                                onChange={(e) => setQ(e.target.value)}
                            />
                        </form>

                        <div className="grid grid-cols-2 gap-3 font-medium">

                            <Link to="/category/uls-tur">Улс төр</Link>
                            <Link to="/category/niigem">Нийгэм</Link>
                            <Link to="/category/ediin-zasag">Эдийн засаг</Link>
                            <Link to="/category/niitlel">Нийтлэл</Link>
                            <Link to="/category/nevtruuleg">Нэвтрүүлэг</Link>

                        </div>

                    </div>

                </div>
            )}

        </header>
    )
}