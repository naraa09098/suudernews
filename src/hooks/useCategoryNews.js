import { useEffect, useState } from "react";
import {
    collection,
    query,
    where,
    orderBy,
    limit,
    getDocs,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function useCategoryNews(category, count = 6) {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                const q = query(
                    collection(db, "news"),
                    where("category", "==", category),
                    orderBy("createdAt", "desc"),
                    limit(count)
                );

                const snap = await getDocs(q);

                const data = snap.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setNews(data);
            } catch (e) {
                console.error(e);
            }

            setLoading(false);
        };

        fetch();
    }, [category, count]);

    return { news, loading };
}