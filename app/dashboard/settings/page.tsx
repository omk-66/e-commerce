
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SettingsCard from "./settings-card";


export default async function Settings() {
    const session = await auth();
    if(!session) redirect("/")
    return (
        <div><SettingsCard session={session}/></div>
    )
}

