
import getSong from "@/actions/getSong";
import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import PageContent from "@/components/PageContent";

export const relative = 0;


export default async function Home() {

  const songs = await getSong();
  

  return (
    <div className="
    bg-neutral-900
    rounded-lg
    overflow-hidden
    overflow-y-auto
    w-full
    h-full
    ">
      <Header>
        <div className="mb-2">
          <h1
          className="text-white text-3xl font-semibold"
          >
            Bienvenido
          </h1>
          <div
          className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-3
          2xl:grid-cols-4
          gap-3
          mt-4
          "
          >
            <ListItem 
            image="/images/like.png" 
            name="Tus favoritas" 
            href="liked"          
            />
          </div>
        </div>
      </Header>

      <div className="mt-2 mb-7 px-6">
        <div
        className="flex justify-between items-center"
        >
          <h1 className="text-white text-2xl font-semibold">
            Nuevas canciones
          </h1>
        </div>
        <div>
          <PageContent 
            songs={songs}
          />
        </div>
      </div>
    </div>
  );
}
