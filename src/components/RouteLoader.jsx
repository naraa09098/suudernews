import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import NProgress from "nprogress"
import "nprogress/nprogress.css"

export default function RouteLoader() {
    const location = useLocation()

    useEffect(() => {
        NProgress.start()

        const timeout = setTimeout(() => {
            NProgress.done()
        }, 300)

        return () => clearTimeout(timeout)
    }, [location])

    return null
}