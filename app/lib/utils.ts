"use server";

import { auth, signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { supabase } from "./db";
import { data } from "framer-motion/client";
import { TQuote } from "../quotes/page";

export async function logOut() {
    await signOut();
}
export async function handleEmailSignIn(email: string) {
    await signIn("nodemailer", { email: email, redirectTo: "/" });
}
export async function handleGoogleSignIn() {
    await signIn("google", { redirectTo: "/quotes" });
}

export async function deleteQuote(quote: TQuote, userId: String) {
    try {
        if (quote.user_id !== userId) {
            return { ok: false, error: { message: "You don't have permission to delete this quote" } };
        }
        await supabase.from("quotes").delete().eq("id", quote.id).eq("user_id", userId);

        return { ok: true };
    } catch (error) {
        console.error("Error from deleteQuote", error);
        return { ok: false, error };
    }
}

export async function getUserQuotes(userId: string) {
    try {
        console.log("userId", userId);

        const { data, error } = await supabase.from("quotes").select().eq("user_id", userId);

        if (error) throw error;

        return { data, ok: true };
    } catch (error) {
        console.error("Error from getUserQuotes", error);
        return { ok: false, error };
    }
}
export async function getQuote(quoteId: string) {
    try {
        const { data, error } = await supabase.from("quotes").select().eq("id", quoteId).single();
        console.log(data, error);

        return { ok: true, data };
    } catch (error) {
        return { ok: false, error };
    }
}

export async function createQuote(quote: string, userId: string) {
    try {
        const { data, error } = await supabase
            .from("quotes")
            .insert([{ content: quote, user_id: userId }])
            .select();

        if (error) throw error;

        return { data, ok: true };
    } catch (error) {
        console.error("Error creating quote", error);
        return { ok: false, error };
    }
}
