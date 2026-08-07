'use client'
import React, { useEffect, useState } from 'react'
import STRAPI_URL from '@/lib/api'
import { usePlayer } from '@/app/context/PlayerContext'
import SongCards from './SongCards'


export default function Search() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState([])
  const [showRes, setShowRes] = useState(false)

  useEffect(() => {
    if (query == '') {
      setResult([])
      setShowRes(false)
    } else {
      let timer = setTimeout(async () => {
        const res = await fetch(`${STRAPI_URL}/api/songs?filters[$or][0][title][$containsi]=${query}&filters[$or][1][artist][$containsi]=${query}&populate=*`)
        const para = await res.json()

        setResult(para.data || [])
        setShowRes(true)
      }, 300);

      return () => clearTimeout(timer)
    }




  }, [query])



  const { setCurrentSong, setIsVisible } = usePlayer()

  const handleSelect = (song) => {
    setCurrentSong({
      title: song.title,
      artist: song.artist,
      cover: `${STRAPI_URL}${song.cover.url}`,
      audio: `${STRAPI_URL}${song.audio.url}`,
      duration: song.duration,

    })

    setIsVisible(true)
    setQuery('')
    setShowRes(false)
  }


  return (
    <div className="relative w-full flex justify-center">
      <input onChange={(e) => setQuery(e.target.value)} value={query} className='p-3 rounded-full flex h-[60px] w-[40%] bg-zinc-700 pl-5 relative z-50 justify-center' type="text" placeholder='Search...' />



      {showRes && (
        <div className="fixed inset-0 z-40 bg-zinc-950 pt-24 px-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6 mt-15">Results for "{query}"</h2>

            {result.length > 0 ? (
              <div className="flex flex-wrap gap-4">
                {result.map((song, i) => (
                  <SongCards
                    key={song.documentId}
                    index={i}
                    allSongs={result}
                    duration={song.duration}
                    title={song.title}
                    src={`${STRAPI_URL}${song.cover.url}`}
                    artist={song.artist}
                    audio={`${STRAPI_URL}${song.audio.url}`}
                  />
                ))}
              </div>
            ) : (
              <p className="text-zinc-400 text-lg mt-15">No results found</p>
            )}
          </div>
        </div>
      )}

    </div>
  )
}
