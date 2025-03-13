
import getSongByTitle from "@/actions/getSongByTitle";
import Header from "@/components/Header";
import SearchContent from "@/components/SearchContent";
import SearchInput from "@/components/SearchInput";
import { cookies } from "next/headers";
import React from "react";

interface SearchProps {
    searchParams:  Promise<{ title: string }> 
}
// Server component can receive searchParams prop directly
const Page: React.FC<SearchProps> = async ({searchParams}) => {    
    
const title = (await searchParams).title || "";
  const songs = await getSongByTitle(title);

  return (
    <div
      className="
      bg-neutral-900
      rounded-lg
      h-full
      w-full
      overflow-hidden
      overflow-y-auto
      "
    >
      <Header
        className="from-bg-neutral-900"
      >
        <div
          className="mb-2 flex
          flex-col
          gap-y-6
          "
        >
          <h1
            className="
            text-white
            text-3xl
            font-semibold
            "
          >
            <SearchInput />
          </h1>
        </div>
      </Header>
     
      <SearchContent
        songs={songs}
      />
    </div>
  );
}

export default Page;