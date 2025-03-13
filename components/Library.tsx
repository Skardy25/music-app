"use client";

import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";
import { AiOutlinePlus } from "react-icons/ai";
import { TbPlaylist } from "react-icons/tb";
import { GiLoveSong } from "react-icons/gi";
import MediaItem from "./MediaItem";
import useOnPlay from "@/hooks/useOnPlay";

interface LibraryProps {
  songs: Song[]
}

export default function Library(
  {songs } : LibraryProps
) {

  const authModal = useAuthModal();
  const uploadModal = useUploadModal();

  const {user} = useUser();

  const onPlay = useOnPlay(songs);

    const onClick = () => {
        if(!user){
          return authModal.onOpen();
        }
        return uploadModal.onOpen();
    }

  return (
    <div className="flex flex-col">
      <div className="
      flex
      items-center
      justify-between
      px-5
      pt-4
      ">
        <div
        className="inline-flex
        items-center
        gap-x-2"
        >
            <TbPlaylist 
                className="text-neutral-400"
                size={26}
            />
            <p
            className="text-neutral-400
            font-medium
            text-md
            "
            >
                Tu Lista
            </p>
        </div>

        <AiOutlinePlus
            className="text-neutral-400
            cursor-pointer
            hover:text-white
            transition
            "
            onClick={onClick}
            size={20}
        />

      </div>

      <div
      className="flex flex-col 
      gap-y-2
      mt-4
      px-3"
      >
        {
          songs.map((item) => (
           <MediaItem 
            onClick={(id: string) => onPlay(id)}
            key={item.id}
            data={item}
           />
          ))
        }
      </div>
    </div>
  );
}