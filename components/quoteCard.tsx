"use client"
import { TQuote } from "@/app/quotes/page"



export function QuoteCard({ quote }: { quote: TQuote }) {
  const date = new Date(quote.created_at).toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).replace(',', ' ·');
  return (
    <div className=" w-full bg-[#475f8a] rounded-lg p-6 xl:w-96 shadow-lg hover:shadow-xl transition cursor-pointer hover:scale-105 ">
      <p className="text-gray-100 text-lg italic text-center">" {quote.content} "</p>
      <div className="border-t border-white pt-3 mt-3">
        <p className="text-gray-300 text-sm font-mono text-right">{date}</p>
      </div>
    </div>
  )
}