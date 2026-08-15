export const dynamic = 'force-dynamic'
import SongCards from "@/components/SongCards";
import STRAPI_URL from "@/lib/api";

export default async function SongsPage() {
const res = await fetch(`${STRAPI_URL}/api/songs?populate=*&pagination[pageSize]=100`)
const para = await res.json()

 return (
  <main className="p-4 md:p-6 lg:p-8">
   <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 lg:mb-8">
    All Songs
   </h1>

   <div className="flex flex-wrap justify-center sm:justify-evenly gap-3">
    {para.data && para.data.map((song, i) => (
     <SongCards allSongs={para.data} index={i} key={song.documentId}  duration={song.duration} title={song.title} src={song.cover} artist={song.artist} audio={song.audio}   />
    ))}
   </div>
  </main>
 );
}