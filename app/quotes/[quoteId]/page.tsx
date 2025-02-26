'use client'
import { getQuote } from "@/app/lib/utils"
import { Button, Card, CardHeader, CardBody, addToast } from "@heroui/react"
import { error } from "console"
// import { format } from "date-fns"
import { ArrowLeft, Trash2 } from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { format } from "path"
import { useState, useEffect } from "react"
import { TQuote } from "../page"
import { Header } from "@/components/header"
import DeleteQuote from "@/components/deleteQuote"



export default function QuotePage({
  params,
}: {
  params: { quoteId: string }
}) {
  const [quote, setQuote] = useState<TQuote>()
  const { data } = useSession()
  useEffect(() => {
    (async () => {
      const { quoteId } = await params

      const res = await getQuote(quoteId)

      if (!res.ok) {
        addToast({
          title: 'Error getting quote.',
          description: (res.error as Error).message,
          color: 'danger'
        })
        return;
      }
      setQuote(res.data)
    })()
  }, [])


  return <>
    <Header />
    <section className="relative min-h-screen flex items-center justify-center">
      {quote?.user_id === data?.user?.id && <DeleteQuote userId={data?.user?.id as string} quote={quote as TQuote} />}
      <p className="text-[40px] md:text-[57px] text-center p-2">" {quote?.content} "</p>
    </section>
  </>

}