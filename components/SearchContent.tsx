"use client";
import { Song } from "@/types";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import useOnPlay from "@/hooks/useOnPlay";

interface SearchContentProps {
    songs: Song[]
}

export default function SearchContent({songs}: SearchContentProps){

    const onPlay = useOnPlay(songs);

    if(songs.length === 0) {
        return (
            <div
            className="
            flex
            flex-col
            gap-y-2
            w-full
            px-6
            text-neutral-400
            "
            >
                No hay canciones.  
            </div>
        )
    }
    return(
        <div
        className="
        flex flex-col
        gap-y-2 w-full px-6
        "
        >
            {songs.map((song) => (
                <div
                key={song.id}
                className="flex items-center
                gap-x-4 w-full
                "
                >
                    <div
                    className="flex-1"
                    >
                        <MediaItem
                            onClick={(id: string) => onPlay(id)}
                            data={song}                        
                         />
                    </div>
                    {/** TODO: Add like button */}
                    <LikeButton 
                        songId={song.id} 
                    />
                </div>
            ))}
        </div>
    );
}