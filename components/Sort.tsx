"use client";

import { usePathname, useRouter } from "next/navigation";

const Sort = () => {
    const path = usePathname();
    const router = useRouter();

    const handleSort = (value: string) => {
        router.push(`${path}?sort=${value}`);
    };

    return (
        <div></div>
    )
}