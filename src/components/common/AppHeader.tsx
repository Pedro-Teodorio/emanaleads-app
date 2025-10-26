"use client"

import { Button } from "@/components/ui/button"
import { useLogout } from "@/features/auth/hooks/useLogout";
import { LogOut, Zap } from "lucide-react"
import Link from "next/link"

export function AppHeader() {
    const { mutate: logout } = useLogout();
    const handleLogout = () => logout();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className=" flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-6">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg  bg-blue-700">
                            <Zap className='text-white size-4' />
                        </div>
                        <span className="font-bold text-lg">EmanaLeads</span>
                    </Link>
                </div>

                <div className="flex items-center gap-2">
                    <Button onClick={handleLogout} variant="ghost" size="sm" className="gap-2">
                        <LogOut className="h-4 w-4" />
                        <span className="hidden sm:inline">Sair</span>
                    </Button>
                </div>
            </div>
        </header>
    )
}
