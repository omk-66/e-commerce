import { IoCheckmarkCircle } from "react-icons/io5";

interface FormSuccessProps {
    message?: string;
}

export function FormSuccess({ message }: FormSuccessProps) {
    return (
        <div className="bg-green-500 text-white p-3 rounded-md  space-x-2 flex gap-2 justify-start items-center">
            <IoCheckmarkCircle className="w-4 h-4" />
            <p>{message}</p>
        </div>
    );
}
