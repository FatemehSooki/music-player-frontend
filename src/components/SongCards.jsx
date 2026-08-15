'use client'
import Image from 'next/image'
import React from 'react'
import { usePlayer } from '@/app/context/PlayerContext';

export default function SongCards({ src, title, artist, audio, duration, index, allSongs, artistCover }) {
  const { setCurrentSong, setIsVisible, setQueue, setCurrentIndex } = usePlayer()

  function handleClick() {
    setQueue(allSongs)
    setCurrentIndex(index)
    setCurrentSong({
      title: title,
      artist: artist,
      cover: src,
      audio: audio,
      duration: duration,
      artistCover: artistCover
    })
    setIsVisible(true)
  }

  return (
    <div onClick={handleClick} className='w-36 sm:w-40 md:w-44 lg:w-52 bg-zinc-800 rounded-2xl p-3 sm:p-4 overflow-hidden cursor-pointer transition-all duration-300 hover:bg-zinc-800 hover:scale-105 m-2 sm:m-3'>

      <Image
        className="w-full aspect-square object-cover rounded-xl"
        src={src}
        width={300}
        height={300}
        alt={title}
        unoptimized
      />

      <h3 className='mt-2 sm:mt-3 md:mt-4 text-sm sm:text-base md:text-lg font-semibold text-white truncate'>
        {title}
      </h3>

      <h4 className='mt-1 text-xs sm:text-sm text-zinc-400 truncate'>
        {artist}
      </h4>

    </div>
  )
}