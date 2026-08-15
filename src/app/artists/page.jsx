export const dynamic = 'force-dynamic'
import React from 'react'
import STRAPI_URL from '@/lib/api'
import TopArtists from '@/components/TopArtists'

export default async function page() {
  const res = await fetch(`${STRAPI_URL}/api/songs?populate=*&pagination[pageSize]=100`)
  const para = await res.json()
  const artists = [...new Set(para.data.map(song => song.artist))]

  return (
    <div className='w-full min-h-screen bg-zinc-950 px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-7 md:mb-8 tracking-tight'>
          All Artists
        </h1>
        

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-5 md:gap-6'>
          {artists?.map((artistName) => {
            const artistSong = para.data.find(s => s.artist === artistName)
            return (
              <TopArtists
                key={artistName}
                artist={artistName}
                image={artistSong.artistCover || artistSong.cover}
                href={`/artists/${encodeURIComponent(artistName)}`}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}