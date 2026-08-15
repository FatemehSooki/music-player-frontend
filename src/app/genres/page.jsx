export const dynamic = 'force-dynamic'
import React from 'react'
import STRAPI_URL from '@/lib/api'
import { IoMusicalNote } from "react-icons/io5";
import Link from 'next/link';

export default async function page() {

 const res = await fetch(`${STRAPI_URL}/api/songs?populate=*`)
 const para = await res.json()
 const genres = [...new Set(para && para.data.map(songs => songs.genre))]
 const colors = [
  "bg-gradient-to-br from-emerald-800 to-emerald-950 shadow-lg shadow-emerald-950/50",
  "bg-gradient-to-br from-blue-800 to-blue-950 shadow-lg shadow-blue-950/50",
  "bg-gradient-to-br from-violet-800 to-violet-950 shadow-lg shadow-violet-950/50",
  "bg-gradient-to-br from-rose-800 to-rose-950 shadow-lg shadow-rose-950/50",
  "bg-gradient-to-br from-red-900 to-red-950 shadow-lg shadow-red-950/50",
  "bg-gradient-to-br from-cyan-800 to-cyan-950 shadow-lg shadow-cyan-950/50",
  "bg-gradient-to-br from-amber-800 to-amber-950 shadow-lg shadow-amber-950/50",
  "bg-gradient-to-br from-fuchsia-800 to-fuchsia-950 shadow-lg shadow-fuchsia-950/50"
 ]

 return (
  <div className='w-full flex flex-wrap gap-4 sm:gap-6 justify-center sm:justify-evenly my-6 sm:my-10 px-4 sm:px-0 *:my-3'>
   {genres.map((val, i) => {
    return (
     <Link key={val} href={`/genres/${val}`}>
      <div className={`relative w-[140px] h-[140px] sm:w-[170px] sm:h-[170px] md:w-[200px] md:h-[200px] rounded-2xl ${colors[i % colors.length]} flex justify-center items-center cursor-pointer transition-shadow duration-300 hover:shadow-xl hover:shadow-black/60`}>
       <IoMusicalNote className='text-[50px] sm:text-[65px] md:text-[80px] opacity-20 text-white' />
       <h3 className='absolute z-10 text-center text-white text-sm sm:text-base md:text-[20px] capitalize font-bold'>{val}</h3>
      </div>
     </Link>
    )
   })}
  </div>
 )
}