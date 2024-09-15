import { IoAlertCircle } from "react-icons/io5"

interface FormErrorProps {
    message?: string
}

export function FormError({ message }: FormErrorProps) {
    return (
        <div className="bg-destructive text-secondary-foreground p-3 rounded-md flex gap-2 justify-start items-center"><IoAlertCircle className="w-4 h-4" /><p>{message}</p></div>
    )
}

