import { useEffect, useState } from "react";
import {
    collection,
    query,
    orderBy,
    getDocs
} from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function useNextPrev(currentId) {
    const [prev, setPrev] = useState(null);
    const [next, setNext] = useState(null);

    useEffect(() => {
        const fetch = async () => {
            const q = query(
                collection(db, "news"),
                orderBy("createdAt", "desc")
            );

            const snap = await getDocs(q);

            const list = snap.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            const index = list.findIndex(
                (item) => item.id === currentId
            );

            setPrev(list[index + 1] || null);
            setNext(list[index - 1] || null);
        };

        fetch();
    }, [currentId]);

    return { prev, next };
}