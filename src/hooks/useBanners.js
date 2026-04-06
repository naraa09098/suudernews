import { useEffect, useState } from "react";
import {
    collection,
    query,
    orderBy,
    onSnapshot
} from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function useBanners(position) {
    const [banners, setBanners] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(
            collection(db, "banners"),
            orderBy("order", "asc")
        );

        const unsub = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs
                .map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
                .filter(
                    (b) =>
                        b.active === true &&
                        b.position === position
                );

            setBanners(data);
            setLoading(false);
        });

        return () => unsub();
    }, [position]);

    return { banners, loading };
}