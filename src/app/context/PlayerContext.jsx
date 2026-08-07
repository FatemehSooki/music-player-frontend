'use client'
import React, { createContext, useContext, useState } from 'react'


const PlayerContext = createContext(null)

export default function PlayerProvider({ children }) {
 const [currentSong, setCurrentSong] = useState(null)
 const [isVisible, setIsVisible] = useState(false)
 const [currentIndex, setCurrentIndex] = useState(0)
 const [queue, setQueue] = useState([])
 return (
  <PlayerContext.Provider value={{  currentSong, setCurrentSong,
  isVisible, setIsVisible,
  queue, setQueue,
  currentIndex, setCurrentIndex}}>
{children}
  </PlayerContext.Provider>
 )
}

export function usePlayer() {
  return useContext(PlayerContext)
}
