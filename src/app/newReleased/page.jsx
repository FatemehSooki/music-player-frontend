export const dynamic = 'force-dynamic'
import React from 'react'
import STRAPI_URL from '@/lib/api'
import SongCards from '@/components/SongCards'

export default async function page() {
  const res = await fetch(
    `${STRAPI_URL}/api/songs?populate=*&sort=createdAt:desc&pagination[limit]=20`
  )
  const para = await res.json()

  return (
    <div className='w-full min-h-screen bg-zinc-950 px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10'>
      <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6 lg:mb-8 capitalize'>new released</h1>
      
      <div className='flex flex-wrap justify-center sm:justify-evenly gap-4'>
        {para.data?.map((song, i) => (
          <SongCards 
            allSongs={para.data}
            index={i}
            key={song.documentId}
            duration={song.duration}
            title={song.title}
            src={song.cover}
            artist={song.artist}
            audio={song.audio}
          />
        ))}
      </div>
    </div>
  )
}