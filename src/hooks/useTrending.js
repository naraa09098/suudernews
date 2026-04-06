import { useEffect, useState } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function useTrending() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            const q = query(
                collection(db, "news"),
                orderBy("views", "desc"),
                limit(5)
            );

            const snap = await getDocs(q);

            setNews(
                snap.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
            );

            setLoading(false);
        };

        fetch();
    }, []);

    return { news, loading };
}