'use client';
import Link from "next/link"
import { logOut } from "@/app/lib/utils";
import { Avatar, Button, Popover, PopoverContent, PopoverTrigger, user } from "@heroui/react";
import { Session } from "next-auth";
import { Github } from "lucide-react";

export function Header({ session, borderB, showAvatar }: { session?: Session | null, showAvatar?: boolean, borderB?: boolean }) {

  return (
    <header className={`${borderB && 'border-b'}`}>
      <div className=" mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl ">
          Thynk
        </Link>
        <div className="flex items-center gap-4">
          {session && showAvatar ? (
            <form
              action={async () => await logOut()}
            >
              <Popover placement="bottom" showArrow={true}>
                <PopoverTrigger>

                  <Avatar className="cursor-pointer" isBordered fallback src={session?.user?.image as string} />
                </PopoverTrigger>

                <PopoverContent className="bg-[#2d333e] text-white">
                  <div className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden">
                        <img
                          src={session.user?.image as string}
                          alt={user.name as string}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{user.name}</h3>
                        <p className="text-sm ">{session.user?.email as string}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions Section */}
                  <div className="border-t border-gray-200 p-2 w-full">
                    <Link
                      target="_blank"
                      href="https://conceptify-kappa.vercel.app/feedbacks"
                      className="flex items-center space-x-2 p-2 hover:bg-[#6b7280] rounded-md  transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                      <span>Give us feedback </span>
                    </Link>
                    <Link
                      target="_blank"
                      href="https://conceptify-kappa.vercel.app/feedbacks"
                      className="flex items-center space-x-2 p-2 hover:bg-[#6b7280] rounded-md  transition-colors"
                    >🆕 &nbsp;Request Feature
                    </Link>
                    <Link
                      href="/"
                      className="flex items-center gap-2 p-2 hover:bg-[#6b7280] rounded-md  transition-colors"
                    ><Github className="text-[21px]" /> Github
                    </Link>

                    <button
                      onClick={async () => logOut()}
                      className="w-full flex items-center space-x-2 p-2 hover:bg-[#6b7280] rounded-md text-orange-500 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>Logout</span>
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            </form>
          ) : (
            <Button className={`${showAvatar ? 'flex' : 'hidden'}`} as={Link} href="/api/auth/signin" variant="bordered">
              Log In
            </Button>
          )}


        </div>
      </div>
    </header>
  )
}