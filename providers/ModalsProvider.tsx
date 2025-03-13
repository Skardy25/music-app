"use client";

import AuthModal from "@/components/AuthModal";
import UploadModal from "@/components/UploadModal";
import { useEffect, useState } from "react";

export default function ModalProvider() {
    const [isMounted, setisMounted] = useState(false);

    useEffect(() => {
        setisMounted(true);
    }, [])

    if(!isMounted){
        return null;
    }

    return(
        <>
           <AuthModal />
           <UploadModal />
        </>
    );

} 