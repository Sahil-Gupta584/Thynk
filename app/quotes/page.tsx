'use client';
import { addToast, Skeleton } from "@heroui/react";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { getUserQuotes } from "@/app/lib/utils";
import Link from "next/link";
import AddQuote from "@/components/addThought";
import { QuoteCard } from "@/components/quoteCard";
import { useRouter } from "next/navigation";

export type TQuote = {
    id: string,
    content: string,
    user_id: string,
    created_at: string,
}

export default function Home() {
    const [quotes, setQuotes] = useState<TQuote[] | null>(null)
    const { data: session } = useSession();
    const router = useRouter()

    useEffect(() => {
        (async () => {
            if (!session?.user?.id) {
                router.push('/')
                return
            }
            const res = await getUserQuotes(session?.user?.id as string)
            console.log(res);
            if (res.error) {
                addToast({
                    color: 'danger',
                    title: 'Error getting you quotes.',
                    description: (res.error as Error).message
                })
            }
            setQuotes(res.data as TQuote[])

        })()

    }, [session?.user?.id])

    return <>
        <Header session={session} borderB showAvatar />
        <div className="space-y-8 font-medium">
            <div className="grid gap-6 p-6 md:grid-cols-3 lg:grid-cols-3 xl:flex flex-wrap">
                {quotes && quotes?.map((quote, i) => (
                    <Link key={quote.id} className="h-fit" href={`/quotes/${quote.id}`}>
                        <QuoteCard quote={quote} />
                    </Link>
                ))}
                {!quotes &&
                    <>
                        <Skeleton className="h-[149px] rounded-lg " />
                        <Skeleton className="h-[149px] rounded-lg " />
                        <Skeleton className="h-[149px] rounded-lg " />
                        <Skeleton className="h-[149px] rounded-lg " />
                        <Skeleton className="h-[149px] rounded-lg md:block hidden" />
                        <Skeleton className="h-[149px] rounded-lg md:block hidden" />
                        <Skeleton className="h-[149px] rounded-lg md:block hidden" />
                        <Skeleton className="h-[149px] rounded-lg md:block hidden" />
                        <Skeleton className="h-[149px] rounded-lg md:block hidden" />
                        <Skeleton className="h-[149px] rounded-lg md:block hidden" />
                        <Skeleton className="h-[149px] rounded-lg md:block hidden" />
                        <Skeleton className="h-[149px] rounded-lg md:block hidden" />
                    </>
                }
            </div>
            <AddQuote />
        </div>
    </>

}
