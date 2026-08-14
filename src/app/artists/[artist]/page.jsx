import React from 'react'
import STRAPI_URL from '@/lib/api'
import SongCards from '@/components/SongCards'

export default async function page({ params }) {
  const { artist } = await params
  const decodedArtist = decodeURIComponent(artist)


  const res = await fetch(`${STRAPI_URL}/api/songs?populate=*&pagination[pageSize]=100`)
  const para = await res.json()

  const artistSongs = para.data.filter((song)=> song.artist == decodedArtist)

  return (
<div className='w-full min-h-screen bg-zinc-950 px-8 py-10'>
  <h1 className='text-4xl font-bold text-white mb-8 capitalize'>{decodedArtist}</h1>
  <div className='flex flex-wrap gap-4'>
    {artistSongs && artistSongs.map((song, i) => (
     <SongCards allSongs={artistSongs} index={i} key={song.documentId} duration={song.duration} title={song.title} src={song.cover} artist={song.artist} audio={song.audio}   />
    ))}
  </div>
</div>
  )
}
