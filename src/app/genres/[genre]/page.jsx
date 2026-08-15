export const dynamic = 'force-dynamic'
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
  <div className='w-full flex flex-wrap justify-center sm:justify-evenly gap-3 px-4 md:px-6 lg:px-8'>
   <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold my-6 md:my-10 ml-4 sm:ml-8 md:ml-12 lg:ml-16 w-full capitalize'>{decodedGenre}</h1>
   {filterSong.map((val, i) => {
    return (
     <SongCards allSongs={filterSong} index={i} key={val.documentId} duration={val.duration} title={val.title} src={val.cover} artist={val.artist} audio={val.audio}   />
    )
   })}
  </div>
 )
}