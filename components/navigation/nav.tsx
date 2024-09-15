import { Logo } from "./logo";
import { UserButton } from "./user-button";
import { auth } from "@/auth";

export async function NavBar() {
    const session = await auth();
    const user = session?.user;

    return (
        <header className="w-full py-4 flex flex-col">
            <nav>
                <ul className="flex justify-between px-10">
                    <li><Logo /></li>
                    <li><UserButton user={user} /></li>
                </ul>
            </nav>
        </header>
    );
}
