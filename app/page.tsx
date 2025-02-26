'use client';
import { Button } from "@heroui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter()

  useEffect(() => {

    console.log('o');
    if (session?.user?.id) {
      console.log('in');

      router.push('/quotes')
    }
  }, [session?.user?.id])

  function handleRedirect() {
    if (session?.user?.id) {
      router.push('/quotes')
    } else {
      router.push('/auth')
    }

  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-4 font-thin">
      <h1 className="text-4xl font-bold text-center">Welcome to Thynk</h1>
      <p className="text-xl text-default-500 text-center max-w-md">
        A beautiful space to capture and organize your quotes
      </p>
      <Button onPress={handleRedirect} color="primary">
        Get Started
      </Button>
    </div>
  )

}
