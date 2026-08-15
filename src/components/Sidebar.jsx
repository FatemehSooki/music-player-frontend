'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaHome } from "react-icons/fa";
import { FaMusic } from "react-icons/fa";
import { TbMusicSearch } from "react-icons/tb";
import { IoIosArrowDown } from "react-icons/io";

export default function Sidebar() {
 const [openAcc, setOpenAcc] = useState(false)

 const side = [
   {
     title: 'Home',
     href: '/',
     icon: FaHome
   },
   {
     title: 'All songs',
     href: '/songs',
     icon: FaMusic
   },
   {
     title: 'Genres',
     href: '/genres',
     icon: TbMusicSearch,
   }
 ]

 const genres = [
   {
     title: "Pop",
     href: "/genres/pop",
   },
   {
     title: "Rap",
     href: "/genres/Rap",
   },
   {
     title: "Persian",
     href: "/genres/Persian",
   },
   {
     title: "R&B",
     href: "/genres/R%20&%20B",
   }
 ];

 return (
   <div className="w-[25%] sticky top-10 self-start h-screen max-h-[calc(100vh-5rem)] bg-zinc-900 rounded-2xl p-4 md:p-5 border border-white/[0.06] shadow-xl overflow-y-auto">
     {side.map((val, i) => {
       const Icon = val.icon

       return (
         <div key={i}>
           {val.title === "Genres" ? (
             <button
               onClick={para}
               className="cursor-pointer w-full flex items-center gap-3 md:gap-4 py-3 md:py-4 text-base md:text-[18px] text-zinc-300 transition-colors duration-200 hover:text-white"
             >
               <Icon size={22} />
               <span className="font-medium">{val.title}</span>

               <IoIosArrowDown
                 className={`ml-auto text-zinc-500 transition-transform duration-300 ${openAcc ? "rotate-180" : ""}`}
               />
             </button>
           ) : (
             <Link
               href={val.href}
               className="cursor-pointer w-full flex items-center gap-3 md:gap-4 py-3 md:py-4 text-base md:text-[18px] text-zinc-300 transition-colors duration-200 hover:text-white"
             >
               <Icon size={22} />
               <span className="font-medium">{val.title}</span>
             </Link>
           )}

           {val.title === 'Genres' && (
             <div 
               className={`overflow-hidden transition-all duration-300 ease-in-out ${openAcc ? "max-h-96 opacity-100 mb-2" : "max-h-0 opacity-0"}`}
             >
               {genres.map((genre) => (
                 <div key={genre.href} className="pl-6 md:pl-10 py-2">
                   <Link
                     href={genre.href}
                     className="block text-sm md:text-[15px] text-zinc-400 transition-colors duration-200 hover:text-emerald-400"
                   >
                     {genre.title}
                   </Link>
                 </div>
               ))}

               <Link
                 href="/genres"
                 className="block pl-6 md:pl-10 py-2 text-sm md:text-[15px] text-zinc-400 transition-colors duration-200 hover:text-emerald-400"
               >
                 More...
               </Link>
             </div>
           )}

         </div>
       )

     })}
   </div>
 )

 function para() {
   setOpenAcc(!openAcc)
 }
}