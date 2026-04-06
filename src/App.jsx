import { Routes, Route } from "react-router-dom"

import Header from "./components/Header"
import Footer from "./components/Footer"

import Home from "./pages/Home"
import NewsDetail from "./pages/NewsDetail"
import Category from "./pages/Category"
import AdminLogin from "./pages/AdminLogin"
import AdminDashboard from "./pages/AdminDashboard"
import SearchPage from "./pages/SearchPage"
import NotFound from "./pages/NotFound"
import ScrollToTop from "./components/ScrollToTop"
import RouteLoader from "./components/RouteLoader"

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <RouteLoader />
      <ScrollToTop />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/news/:id"
            element={<NewsDetail />}
          />

          <Route
            path="/category/:name"
            element={<Category />}
          />

          <Route
            path="/search"
            element={<SearchPage />}
          />

          <Route
            path="/admin"
            element={<AdminLogin />}
          />

          <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}