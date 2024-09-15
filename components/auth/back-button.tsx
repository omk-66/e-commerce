import { link } from "fs"
import { Button } from "../ui/button"
import Link from "next/link"

interface BackButtonProps {
    backButtonHref: string
    backButtonLabel: string
}
export function BackButton({backButtonHref, backButtonLabel }: BackButtonProps) {
    return (
        <div>
            <Link href={backButtonHref} className="flex"><Button variant={"link"} className="w-full mx-auto">{backButtonLabel}</Button></Link>
        </div>
    )
}
