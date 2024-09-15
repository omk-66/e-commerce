interface FormLabelProps{
    label: string
}

export function FormLabel({ label }: FormLabelProps) {
    return (
        <div className="text-3xl flex justify-center items-center">{label}</div>
    )
}

