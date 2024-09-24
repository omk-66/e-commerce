"use client";
import { useRouter, useSearchParams } from "next/navigation"

export default function EmailVerificationForm() {
    const token = useSearchParams().get("token");
    const router = useRouter();
    return (
        <div>{token}</div>
    )
}

