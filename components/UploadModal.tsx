import uniqid from "uniqid";
import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";



export default function UploadModal() {
    const [isLoading, setIsLoading] = useState(false);
    const {user} = useUser();
    const uploadModal = useUploadModal();
    const supabaseClient = useSupabaseClient();
    const router = useRouter();

    const {register , handleSubmit, reset } = useForm<FieldValues>({
        defaultValues: {
            author: '',
            title: '',
            song: null,
            image: null
        }
    })

    const onChange = (open: boolean) => {
        if(!open){
            reset();
            uploadModal.onClose();
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true);

            const imageFile = values.image?.[0];
            const songFile = values.song?.[0];
            if(!imageFile || !songFile || !user) {
                toast.error("Falta completar campos");
                return;
            }
            const uniqueID = uniqid();

            const {
                data: songData,
                error: songError
            } = await supabaseClient
                .storage
                .from('songs')
                .upload(`song-${values.title}-${uniqueID}`,
                    songFile, {
                        cacheControl: '3600',
                        upsert: false
                    }
                );
            
                if(songError) {
                    setIsLoading(false);
                    return toast.error("Falla al cargar la cancion");
                }

                const {
                    data: imageData,
                    error: imageError
                } = await supabaseClient
                    .storage
                    .from('images')
                    .upload(`image-${values.title}-${uniqueID}`,
                        imageFile, {
                            cacheControl: '3600',
                            upsert: false
                        }
                    );
                
                    if(imageError) {
                        setIsLoading(false);
                        return toast.error("Falla al cargar la imagen");
                    }

                    const {error: supabaseError}
                    = await supabaseClient
                        .from('songs')
                        .insert({
                            user_id: user.id,
                            title: values.title,
                            author: values.author,
                            image_path: imageData.path,
                            song_path: songData.path
                        });
                    
                    if(supabaseError){
                        setIsLoading(false);
                        return toast.error(supabaseError.message);
                    }
                    router.refresh();
                    setIsLoading(false);
                    toast.success('Cancion guardada');
                    reset();
                    uploadModal.onClose();

        } catch (error) {
            toast.error("Algo salio mal ...");
        } finally {
            setIsLoading(false);
        }
    }

    return(
        <Modal
            title="Añade una cancion"
            description="Sube un archivo .mp3"
            isOpen = {uploadModal.isOpen}
            onChange={onChange}
        >

            <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-4"
            >
                <Input 
                    id="title"
                    disabled={isLoading}
                    {...register('title', {required: true})}
                    placeholder="Titulo de la cancion"
                />
                <Input 
                    id="author"
                    disabled={isLoading}
                    {...register('author', {required: true})}
                    placeholder="Autor de la cancion"
                />
                <div>
                    <div className="pb-1">
                        Suba su cancion en formato .mp3
                    </div>
                        <Input 
                        id="song"
                        type="file"
                        accept=".mp3"
                        disabled={isLoading}
                        {...register('song', {required: true})}
                        placeholder="Autor de la cancion"
                        />
                </div>
                <div>
                    <div className="pb-1">
                        Suba la imagen 
                    </div>
                        <Input 
                        id="image"
                        type="file"
                        accept="image/*"
                        disabled={isLoading}
                        {...register('image', {required: true})}
                        placeholder="Imagen de la cancion"
                        />
                </div>
                {
                isLoading && 
                <div
                className="text-green-500 text-center"
                > 
                    Subiendo los archivos ... 
                </div>
                }

                <Button
                disabled={isLoading}
                type="submit"
                >
                    Crear
                </Button>
            </form>
           
        </Modal>
    );
}