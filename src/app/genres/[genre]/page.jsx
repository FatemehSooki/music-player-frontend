import React from 'react'
import STRAPI_URL from '@/lib/api'
import SongCards from '@/components/SongCards'

export default async function page({ params }) {
 const { genre } = await params
const decodedGenre = decodeURIComponent(genre)

 const res = await fetch(`${STRAPI_URL}/api/songs?populate=*&pagination[pageSize]=100`)
 const para = await res.json()
 const filterSong = await para.data.filter((song) => {
  return song.genre === decodedGenre
 })
 return (
  <div className='w-full flex flex-wrap justify-evenly gap-3'>
   <h1 className='text-4xl font-bold m-10 ml-16 w-full text-[50px] capitalize'>{decodedGenre}</h1>
   {filterSong.map((val, i) => {
    return (
     <SongCards allSongs={filterSong} index={i} key={val.documentId} duration={val.duration} title={val.title} src={`${STRAPI_URL}${val.cover.url}`} artist={val.artist} audio={`${STRAPI_URL}${val.audio.url}`}   />
    )
   })}
  </div>
 )
}
