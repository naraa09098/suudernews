import { useEffect, useState } from "react";
import {
    collection,
    query,
    where,
    orderBy,
    limit,
    getDocs
} from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function useRelatedNews(category, currentId) {
    const [news, setNews] = useState([]);

    useEffect(() => {
        if (!category) return;

        const fetch = async () => {
            try {
                const q = query(
                    collection(db, "news"),
                    where("category", "==", category),
                    orderBy("createdAt", "desc"),
                    limit(4)
                );

                const snap = await getDocs(q);

                const data = snap.docs
                    .map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                    .filter((item) => item.id !== currentId);

                setNews(data);
            } catch (e) {
                console.error(e);
            }
        };

        fetch();
    }, [category, currentId]);

    return news;
}