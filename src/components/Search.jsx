'use client'

import React, { useEffect, useState } from 'react'
import STRAPI_URL from '@/lib/api'
import { usePlayer } from '@/app/context/PlayerContext'
import SongCards from './SongCards'

export default function Search() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState([])
  const [showRes, setShowRes] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (query === '') {
      setResult([])
      setShowRes(false)
      return
    }

    setLoading(true)
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `${STRAPI_URL}/api/songs?filters[$or][0][title][$containsi]=${query}&filters[$or][1][artist][$containsi]=${query}&populate=*`
        )
        
        if (!res.ok) {
          console.error('API error:', res.status, res.statusText)
          setResult([])
          setShowRes(true)
          return
        }

        const para = await res.json()
        console.log('Search results:', para.data?.length || 0)
        setResult(para.data || [])
        setShowRes(true)
      } catch (err) {
        console.error('Fetch error:', err)
        setResult([])
        setShowRes(true)
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  const { setCurrentSong, setIsVisible } = usePlayer()

  const handleSelect = (song) => {
    setCurrentSong({
      title: song.title,
      artist: song.artist,
      cover: song.cover,
      audio: song.audio,
      duration: song.duration,
    })
    setIsVisible(true)
    setQuery('')
    setShowRes(false)
  }

  return (
    <div className="relative w-full flex justify-center">
      <input 
        onChange={(e) => {
          console.log('Typing:', e.target.value)
          setQuery(e.target.value)
        }} 
        value={query} 
        className='p-2.5 sm:p-3 rounded-full flex h-12 sm:h-14 md:h-[60px] w-[85%] sm:w-[60%] md:w-[50%] lg:w-[40%] bg-zinc-700 pl-4 sm:pl-5 relative z-50 justify-center' 
        type="text" 
        placeholder='Search...' 
      />

      {loading && <p className="text-white absolute top-16 sm:top-20">Loading...</p>}

      {showRes && (
        <div className="fixed inset-0 z-40 bg-zinc-950 pt-20 sm:pt-24 px-4 sm:px-6 md:px-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 mt-10 sm:mt-14 md:mt-16">Results for "{query}"</h2>

            {result.length > 0 ? (
              <div className="flex flex-wrap justify-center sm:justify-start gap-4">
                {result.map((song, i) => (
                  <SongCards
                    key={song.documentId}
                    index={i}
                    allSongs={result}
                    duration={song.duration}
                    title={song.title}
                    src={song.cover}
                    artist={song.artist}
                    audio={song.audio}
                  />
                ))}
              </div>
            ) : (
              <p className="text-zinc-400 text-base sm:text-lg mt-10 sm:mt-14 md:mt-16">No results found</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}