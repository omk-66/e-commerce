import { Input, InputProps } from "@/components/ui/input"
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction, useState } from "react"
import { useFormContext } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";

type InputTagsProps = InputProps & {
    value: string[],
    onChange: Dispatch<SetStateAction<string[]>>
}
export default function InputTags({ onChange, value }: InputTagsProps) {
    const [pendingDataPoint, setPendingDataPoint] = useState("");
    const [focused, setFocused] = useState(false);

    function addPendingDataPoins() {
        if (pendingDataPoint) {
            const newDataPoins = new Set([...value, pendingDataPoint]);
            onChange(Array.from(newDataPoins))
            setPendingDataPoint("");
        }
    }

    const { setFocus } = useFormContext()
    return (
        <div
            className={cn(
                "min-h-[40px] w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 flex",
                focused ? "ring-offset-2 outline-none ring-ring ring-2" : "ring-offset-0 outline-none ring-ring ring-0"
            )}
            onClick={() => setFocus("tags")}
        >
            <motion.div className="rounded-md min-h-[2.5rem] p-2 flex gap-2 flex-wrap items-center">
                <AnimatePresence>
                    {value.map((tag) => (
                        <motion.div key={tag} animate={{scale: 1}} initial={{scale: 0}} exit={{scale: 0}}>
                            <Button onClick={() => onChange(value.filter(i => i !== tag))}>
                                <XIcon className="w-3" />
                            </Button>
                            <Badge variant="secondary">{tag}</Badge>
                        </motion.div>
                    ))}
                </AnimatePresence>
                <div className="flex">
                    <Input value={pendingDataPoint}
                    onKeyDown={(e) => {
                        if(e.key === "Enter"){
                            e.preventDefault();
                            addPendingDataPoins()
                        }
                    }}
                    onFocus={(e) => setFocused(true)} onBlurCapture={(e) => setFocused(false)} onChange={(e) => setPendingDataPoint(e.target.value)} />
                </div>
            </motion.div>
        </div>
    );
}
