'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { FaHome } from "react-icons/fa";
import { FaMusic } from "react-icons/fa";
import { TbMusicSearch } from "react-icons/tb";
import { IoIosArrowDown, IoMdMenu, IoMdClose } from "react-icons/io";

export default function Sidebar() {
 const [openAcc, setOpenAcc] = useState(false)
 const [mobileOpen, setMobileOpen] = useState(false)

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

 const navContent = (
   <>
     {side.map((val, i) => {
       const Icon = val.icon

       return (
         <div key={i}>
           {val.title === "Genres" ? (
             <button
               onClick={para}
               className="cursor-pointer w-full flex items-center gap-4 py-4 text-[18px] text-zinc-300 transition-colors duration-200 hover:text-white"
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
               onClick={() => setMobileOpen(false)}
               className="cursor-pointer w-full flex items-center gap-4 py-4 text-[18px] text-zinc-300 transition-colors duration-200 hover:text-white"
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
                 <div key={genre.href} className="pl-10 py-2">
                   <Link
                     href={genre.href}
                     onClick={() => setMobileOpen(false)}
                     className="block text-[15px] text-zinc-400 transition-colors duration-200 hover:text-emerald-400"
                   >
                     {genre.title}
                   </Link>
                 </div>
               ))}

               <Link
                 href="/genres"
                 onClick={() => setMobileOpen(false)}
                 className="block pl-10 py-2 text-[15px] text-zinc-400 transition-colors duration-200 hover:text-emerald-400"
               >
                 More...
               </Link>
             </div>
           )}

         </div>
       )

     })}
   </>
 );

 return (
   <>
     {/* Mobile Toggle Button */}
     <button
       onClick={() => setMobileOpen(true)}
       className="lg:hidden fixed bottom-6 right-6 z-50 p-4 rounded-full bg-zinc-800 border border-white/10 shadow-2xl text-white hover:bg-zinc-700 hover:scale-110 transition-all duration-300"
       aria-label="Open menu"
     >
       <IoMdMenu size={24} />
     </button>

     {/* Mobile Overlay */}
     {mobileOpen && (
       <div
         className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
         onClick={() => setMobileOpen(false)}
       />
     )}

     {/* Mobile Drawer */}
     <div className={`lg:hidden fixed inset-y-0 left-0 w-[280px] bg-zinc-900 z-50 p-6 border-r border-white/[0.06] shadow-2xl transform transition-transform duration-300 ease-in-out ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
       <button
         onClick={() => setMobileOpen(false)}
         className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white transition-colors"
         aria-label="Close menu"
       >
         <IoMdClose size={24} />
       </button>
       
       <div className="mt-12">
         {navContent}
       </div>
     </div>

     {/* Desktop Sidebar */}
     <div className="hidden lg:block w-[25%] sticky top-10 self-start h-screen max-h-[calc(100vh-5rem)] bg-zinc-900 rounded-2xl p-5 border border-white/[0.06] shadow-xl overflow-y-auto">
       {navContent}
     </div>
   </>
 )

 function para() {
   setOpenAcc(!openAcc)
 }
}