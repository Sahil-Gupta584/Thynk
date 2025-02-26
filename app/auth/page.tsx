'use client';
import { Button } from "@heroui/react";
import { useEffect, useState } from "react";
import { handleEmailSignIn, handleGoogleSignIn } from "../lib/utils";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function AuthPage() {
    const [email, setEmail] = useState("");
    const { data: session } = useSession();
    const router = useRouter()
    
    useEffect(() => {
        if (session?.user) router.push("/quotes")
    }, [session?.user?.id])



    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-6 font-medium">
            <h1 className="text-4xl text-center font-thin">Sign in to
                <span className="text-blue-500 ml-2 font-semibold">
                    Thynk
                </span>
            </h1>
            <p className="text-xl text-default-500 text-center max-w-md">
                Capture and organize your quotes effortlessly
            </p>
            <div className="w-full max-w-sm space-y-4 flex flex-col items-center">
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 text-xl border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-black"
                />
                <Button className="text-xl" onPress={() => handleEmailSignIn(email)} color="primary" >
                    Continue
                </Button>
                <div className="text-center text-default-500">or</div>
                <Button className="text-xl" onPress={() => handleGoogleSignIn()} color="secondary">
                    <img src="https://img.clerk.com/static/google.svg?width=80" alt="Google" />
                    oogle

                </Button>
            </div>
        </div>
    );
}
