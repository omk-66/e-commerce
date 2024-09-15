import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { FormLabel } from "./form-label";
import { BackButton } from "./back-button";
import { ShowSocials } from "./show-socials";

interface CardWrapperProps {
    children: React.ReactNode;
    label: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocials?: boolean;
    className?: string
}

export function CardWrapper({
    children,
    label,
    backButtonLabel,
    backButtonHref,
    showSocials,
    className
}: CardWrapperProps) {
    return (
        <div className='w-full flex flex-col items-center py-6 ${className}}'>
            <Card className="w-full max-w-md mx-4 sm:mx-6 md:max-w-lg lg:max-w-xl">
                <CardHeader>
                    <CardTitle>
                        <FormLabel label={label} />
                    </CardTitle>
                </CardHeader>
                <CardContent>{children}</CardContent>
                {showSocials && <CardFooter><ShowSocials /></CardFooter>}
                <CardFooter>
                    <BackButton backButtonHref={backButtonHref} backButtonLabel={backButtonLabel} />
                </CardFooter>
            </Card>
        </div>
    );
}
