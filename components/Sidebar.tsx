'use client';

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { BiHeart, BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";
import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";
import { twMerge } from "tailwind-merge";

interface SidebarProps {
    children: React.ReactNode;
    songs: Song[];
}

export default function Sidebar({ children, songs }: SidebarProps) {

    const pathname = usePathname();
    const player = usePlayer();

    const routes = useMemo(() =>[
        {
            icon: HiHome,
            label: 'Inicio',
            active: pathname !== '/search',
            href: '/',
        },
        {
            icon: BiSearch,
            label: 'Buscar',
            active: pathname.includes('/search'),
            href: '/search',
        },
        {
            icon: BiHeart,
            label: 'Tus favoritas',
            active: pathname.includes('/liked'),
            href: '/liked',
        }
        
    ], [pathname]);

  return (
    <div className={
        twMerge("flex h-full", 
            player.activeId && 'h-[calc(100%-80px)]'
        )
    }>
        <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
            <Box>
                <div 
                className="flex
                flex-col 
                gap-y-4
                px-5
                py-4">
                    {
                        routes.map((route) => (
                            <SidebarItem 
                                key={route.label}
                                {...route}
                            />
                        ))
                    }
                </div>
            </Box>
            <Box className="h-full overflow-y-auto">
                <Library 
                    songs={songs}
                />
            </Box>
        </div>
        <main className="h-full flex-1 overflow-y-auto py-2">
        {children}
        </main>
    </div>
  );
}
