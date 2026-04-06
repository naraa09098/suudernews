import { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase/firebase"

export default function useNews() {

    const [news, setNews] = useState([])

    useEffect(() => {
        load()
    }, [])

    const load = async () => {
        const snap = await getDocs(collection(db, "news"))

        setNews(
            snap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
        )
    }

    return news
}