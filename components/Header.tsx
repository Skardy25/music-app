"use client";

import { useRouter } from "next/navigation";
import { HiHome, HiSearch } from "react-icons/hi";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { twMerge } from "tailwind-merge";
import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { BiHeart } from "react-icons/bi";

interface HeaderProps {
    children: React.ReactNode;
    className?: string;
}

export default function Header({
    children,
    className
}: HeaderProps) {

    const router = useRouter();

    const {onOpen} = useAuthModal();

    const supabaseClient= useSupabaseClient();
    const {user} = useUser();

    const handleLogout = async () => {
        const {error} = await supabaseClient.auth.signOut();
        router.refresh();
        if(error){
            toast.error(error.message);
        }else{
            toast.success('Gracias por su visita');
        }
    }

    return(
        <div
        className={twMerge(`
            h-fit
            bg-gradient-to-b
            from-emerald-800
            p-6
            `, className)}
        >
            <div
            className="w-full mb-4 flex 
            items-center justify-between
            "
            >
                <div
                className="hidden md:flex gap-x-2 items-center"
                >
                    <button
                    onClick={() => router.back()}
                        className="rounded-full
                        bg-black
                        flex
                        items-center justify-center
                        hover:opacity-80
                        transition
                        ease-in-out
                        duration-300
                        hover:scale-120
                        "
                    >
                        <RxCaretLeft  className="text-white" size={26}/>
                    </button>   
                    <button
                    onClick={() => router.forward()}
                        className="rounded-full
                        bg-black
                        flex
                        items-center justify-center
                        hover:opacity-80
                        transition
                        ease-in-out
                        duration-300
                        hover:scale-120
                        "
                    >
                        <RxCaretRight  className="text-white" size={26}/>
                    </button>   
                </div>

                {/** MOBILE VIEW */}
                <div
                className="
                flex md:hidden gap-x-2 items-center"
                >
                    <button
                    onClick={() => router.push("/")}
                    className="
                    rounded-full
                    p-2
                    bg-white
                    flex
                    items-center justify-center
                    hover:opacity-80
                    transition

                    "
                    >
                        <HiHome className="text-black"
                            size={20}
                        />

                    </button>
                    <button
                    onClick={() => router.push("/liked")}
                     className="
                     rounded-full
                     p-2
                     bg-white
                     flex
                     items-center justify-center
                     hover:opacity-80
                     transition
                     
                     "
                    >
                    <BiHeart className="text-black"
                            size={20}
                        />
                    </button>
                    <button
                    onClick={() => router.push("/search")}
                     className="
                     rounded-full
                     p-2
                     bg-white
                     flex
                     items-center justify-center
                     hover:opacity-80
                     transition
                     
                     "
                    >
                    <HiSearch className="text-black"
                            size={20}
                        />
                    </button>
                    
                </div>


                <div
                className="flex items-center justify-center gap-x-4"
                >
                    {
                        user ? (
                            <div
                            className="flex gap-x-4 items-center"
                            >
                                <Button
                                className="
                                bg-white px-6 py-2"
                                onClick={handleLogout}
                                >
                                    Salir
                                </Button>
                                <Button
                                onClick={() => router.push("/me")}
                                className="bg-white rounded-full"
                                >
                                    <FaUserAlt size={20} />
                                </Button>
                            </div>
                        )
                        : (
                            <>
                        
                            <div>
                                <Button
                                onClick={onOpen}
                                className="bg-transparent
                                text-neutral-300
                                font-medium
                                "
                                >
                                    Registrate
                                </Button>
                            </div>
                            <div>
                                <Button
                                onClick={onOpen}
                                className="
                                bg-white
                                px-6
                                py-2
                                "
                                >
                                    Iniciar Sesion
                                </Button>
                            </div>
                        </>

                        )
                    }
                </div>
            </div>
            {children}
        </div>
    );
}