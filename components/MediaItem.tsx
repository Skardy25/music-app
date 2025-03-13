"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";

interface MediaItemProps {
    data: Song;
    onClick?: (id: string) => void;
}

export default function MediaItem(
    {data, onClick}: MediaItemProps
) {
    const imageUrl = useLoadImage(data);
    
    const handleClick = () => {
        if(onClick){
            return onClick(data.id)
        }
        //TODO: Default turn on player
    }

    return(
        <div
        onClick={handleClick}
        className="
        flex
        items-center
        gap-x-4
        cursor-pointer
        hover:bg-neutral-800/50
        w-full
        p-2
        rounded-md
        group
        "
        >
            <div
            className="
            relative
            rounded-md
            min-h-[48px]
            min-w-[48px]
            overflow-hidden
            "
            >
                <Image
                    fill
                    src={imageUrl || '/images/liked.png'}
                    alt="Media item"
                    className="
                    object-cover
                    group-hover:scale-110
                    duration-300
                    "
                />
            </div>
            <div
            className="flex
            flex-col
            gap-y-1
            overflow-hidden
            group-hover:scale-105
            duration-300
            "
            >
                <p
                className="
                text-white
                group-hover:text-green-400
                duration-300
                truncate"
                >
                    {data.title}
                </p>
                <p
                className="
                text-neutral-400 
                text-sm
                truncate
                group-hover:text-green-200
                duration-300
                "
                >
                    {data.author}
                </p>
            </div>

        </div>
    );
}