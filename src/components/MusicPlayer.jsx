'use client'
import Image from "next/image";
import {
 FaPlay,
 FaPause,
 FaTimes,
 FaVolumeUp,
 FaVolumeMute,
} from "react-icons/fa";
import {
 IoPlaySkipBack,
 IoPlaySkipForward,
} from "react-icons/io5";
import { usePlayer } from "@/app/context/PlayerContext";
import { useEffect, useRef, useState } from "react";
import STRAPI_URL from "@/lib/api";



export default function MusicPlayer() {
 const { isVisible, setIsVisible, currentSong, queue, currentIndex, setCurrentIndex, setCurrentSong } = usePlayer()
 if (!isVisible || !currentSong) return null
 const [currentTime, setCurrentTime] = useState(0)

 function formatTime(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
 }


 const audioRef = useRef(null)
 const [isPlaying, setIsPlaying] = useState(false)
const [volume, setVolume] = useState(0.75)

const handleVolumeClick = (e) => {
  const rect = e.currentTarget.getBoundingClientRect()
  const clickX = e.clientX - rect.left
  const percent = clickX / rect.width
  const newVolume = Math.max(0, Math.min(1, percent))
  
  if (audioRef.current) {
    audioRef.current.volume = newVolume
  }
  setVolume(newVolume)
}


const handleMusicClick = (e)=> {
  const rect = e.currentTarget.getBoundingClientRect()
  const clickX = e.clientX - rect.left
  const percent = Math.max(0, Math.min(1, clickX / rect.width))
  
  if (audioRef.current && currentSong?.duration) {
    const newTime = percent * currentSong.duration
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }
}

 useEffect(() => {
  if (audioRef.current && currentSong) {
   audioRef.current.play()
   setIsPlaying(true)
  }
 }, [currentSong])


 function musicToggle() {
  if (isPlaying) {
   audioRef.current.pause()
  } else {
   audioRef.current.play()
  }
  setIsPlaying(!isPlaying)
 }

 function nextSong() {
  if (currentIndex < queue.length - 1) {
   let nextI = currentIndex + 1
   let next = queue[nextI]
   setCurrentIndex(nextI)
   setCurrentSong({
    title: next.title,
    artist: next.artist,
    cover: next.cover,
    audio: next.audio,
    duration: next.duration
   })
  }
 }


 function previousSong() {
  if (currentIndex > 0) {
   let prevI = currentIndex - 1
   let prev = queue[prevI]
   setCurrentIndex(prevI)
   setCurrentSong({
    title: prev.title,
    artist: prev.artist,
    cover: prev.cover,
    audio: prev.audio,
    duration: prev.duration
   })
  }
 }

 function handleTime() {
  if (audioRef.current) {
   setCurrentTime(audioRef.current.currentTime)
  }


 }

 const progressTime = ((currentTime) * 100) / currentSong.duration

 return (
  <main className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xl">

   {/* real player */}
   <audio onTimeUpdate={handleTime} ref={audioRef} src={currentSong.audio} onEnded={nextSong} className="hidden" />

   {/* Card */}
   <div className="relative w-[520px] rounded-[28px] border border-white/[0.06] bg-zinc-900/80 backdrop-blur-2xl shadow-[0_32px_100px_rgba(0,0,0,0.6)] px-10 py-10 transition-all duration-500 hover:shadow-[0_32px_100px_rgba(0,0,0,0.7)]">

    {/* Close */}
    <button onClick={() => setIsVisible(false)} className="absolute right-6 top-6 rounded-full p-2 text-zinc-500 transition-all duration-300 hover:bg-white/5 hover:text-white hover:rotate-90">
     <FaTimes size={20} />
    </button>

    {/* Album Cover */}
    <div className="flex justify-center">
     <div className="group relative">
      <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-3xl transition-all duration-700 group-hover:bg-emerald-500/30" />

      <Image
       src={currentSong.cover}
       alt={currentSong.title}
       width={220}
       height={220}
  className={`relative h-56 w-56 rounded-full border-[3px] border-white/[0.08] object-cover shadow-[0_0_50px_rgba(255,255,255,0.06)] transition-transform duration-700 hover:scale-[1.03] hover:border-white/[0.15] animate-spin-slow ${
    !isPlaying ? 'paused' : ''
  }`}
       unoptimized
      />

      {/* Playing ring */}
      <div className="absolute inset-[-6px] rounded-full border border-emerald-500/20 animate-pulse" />
     </div>
    </div>

    {/* Song Info */}
    <div className="mt-8 text-center">
     <h2 className="text-[28px] font-bold tracking-tight text-white transition-colors duration-300">
      {currentSong.title}
     </h2>
     <p className="mt-1.5 text-base font-medium text-zinc-400 transition-colors duration-300 hover:text-zinc-300 cursor-default">
      {currentSong.artist}
     </p>
    </div>

    {/* Time */}
    <div className="mt-7 flex justify-between text-xs font-medium tracking-wider text-zinc-500 uppercase">
     <span>{formatTime(currentTime)}</span>
     <span>{formatTime(currentSong.duration)}</span>
    </div>

    {/* Progress Bar */}
    <div onClick={handleMusicClick} className="group mt-3 h-1.5 w-full cursor-pointer overflow-hidden rounded-full bg-zinc-800">
     <div style={{ width: `${progressTime}%` }} className="relative h-full rounded-full bg-emerald-500 transition-all duration-300 group-hover:bg-emerald-400">
      <div className="absolute right-0 top-1/2 h-3 w-3 -translate-y-1/2 translate-x-1/2 rounded-full bg-white opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100" />
     </div>
    </div>

    {/* Controls */}
    <div className="mt-9 flex items-center justify-center gap-10">

     <button onClick={previousSong} className="text-[28px] text-zinc-400 transition-all duration-200 hover:scale-110 hover:text-white active:scale-95">
      <IoPlaySkipBack />
     </button>

     {/* Play Button */}
     <button onClick={musicToggle} className="group/play relative flex h-[72px] w-[72px] items-center justify-center rounded-full bg-white text-zinc-900 shadow-[0_8px_30px_rgba(255,255,255,0.25)] transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_40px_rgba(255,255,255,0.35)] active:scale-95">
      {isPlaying ?
       (
        <FaPause size={24} className="transition-transform duration-300 group-hover/play:scale-110" />
       ) : (
        <FaPlay size={24} className="ml-1 transition-transform duration-300 group-hover/play:scale-110" />
       )
      }


      {/* Ripple ring animation */}
      <span className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-20" />
     </button>

     <button onClick={nextSong} className="text-[28px] text-zinc-400 transition-all duration-200 hover:scale-110 hover:text-white active:scale-95">
      <IoPlaySkipForward />
     </button>
    </div>

    {/* Volume */}
    <div className="mt-8 flex items-center justify-center gap-4">
     <button className="text-zinc-500 transition-colors duration-200 hover:text-zinc-300">
      <FaVolumeUp size={16} />
     </button>

     <div onClick={handleVolumeClick} className="group relative h-1.5 w-28 cursor-pointer overflow-hidden rounded-full bg-zinc-800">
      <div style={{ width: `${volume * 100}%` }} className="h-full w-3/4 rounded-full bg-zinc-500 transition-all duration-300 group-hover:bg-emerald-500">
       <div className="absolute right-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 translate-x-1/2 rounded-full bg-white opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100" />
      </div>
     </div>
    </div>

   </div>
  </main>
 );
}