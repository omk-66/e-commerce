import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div
      className="w-full min-h-screen flex flex-col bg-gradient-to-r from-violet-200 to-pink-200 justify-center items-center"
    >
      <Link href="/api/auth/signin">
        <Button>login</Button>
      </Link>
    </div>
  );
}