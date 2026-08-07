import React from 'react'
import STRAPI_URL from '@/lib/api'
import SongCards from '@/components/SongCards'

export default async function page() {
  const res = await fetch(
    `${STRAPI_URL}/api/songs?populate=*&sort=createdAt:desc&pagination[limit]=20`
  )
  const para = await res.json()

  return (
    <div className='w-full min-h-screen bg-zinc-950 px-8 py-10'>
      <h1 className='text-4xl font-bold text-white mb-8 capitalize'>new released</h1>
      
      <div className='flex flex-wrap justify-evenly gap-4'>
        {para.data?.map((song, i) => (
          <SongCards 
            allSongs={para.data}
            index={i}
            key={song.documentId}
            duration={song.duration}
            title={song.title}
            src={`${STRAPI_URL}${song.cover.url}`}
            artist={song.artist}
            audio={`${STRAPI_URL}${song.audio.url}`}
          />
        ))}
      </div>
    </div>
  )
}