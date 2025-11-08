"use client"
import { Zap } from "lucide-react";
import { SidebarTrigger } from "../ui/sidebar";

export function AppHeader() {


    return (
        <header className="bg-white border-b border-slate-200 px-6 py-4 xl:hidden">
            <div className="flex items-center gap-4">
                <SidebarTrigger className="hover:bg-slate-100 p-2 rounded-lg transition-colors" />
                <div className="flex items-center justify-center w-8 h-8 rounded-lg  bg-blue-700">
                    <Zap className='text-white size-4' />
                </div>
                <h1 className="text-xl font-bold text-slate-900">Emanaleads</h1>
            </div>
        </header>
    )
}
