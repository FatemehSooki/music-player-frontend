import SongCards from "@/components/SongCards";
import STRAPI_URL from "@/lib/api";

export default async function SongsPage() {
const res = await fetch(`${STRAPI_URL}/api/songs?populate=*&pagination[pageSize]=100`)
const para = await res.json()

 return (
  <main className="p-8">
   <h1 className="text-4xl font-bold mb-8">
    All Songs
   </h1>

   <div className="flex flex-wrap justify-evenly gap-3">
    {para.data && para.data.map((song, i) => (
     <SongCards allSongs={para.data} index={i} key={song.documentId}  duration={song.duration} title={song.title} src={`${STRAPI_URL}${song.cover.url}`} artist={song.artist} audio={`${STRAPI_URL}${song.audio.url}`}   />
    ))}
   </div>
  </main>
 );
}