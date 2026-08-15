'use client'
import Image from 'next/image'
import { FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa'
import { useState } from 'react'

export default function Developer() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >

      <button className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 top-3 left-3 sm:top-4 sm:left-4 md:top-5 md:left-5 rounded-full overflow-hidden border-2 border-emerald-500/40 bg-zinc-900 transition-all duration-500 hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-110 group">
        <Image 
          src="me.jpg" 
          alt="Developer" 
          fill 
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          unoptimized
        />
        <span className="absolute bottom-0 right-0 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-emerald-500 border-2 border-zinc-900 rounded-full"></span>
      </button>


      <div className={`absolute left-2 sm:left-8 md:left-12 top-14 sm:top-16 md:top-20 w-52 sm:w-60 md:w-64 bg-zinc-900/95 backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-3 sm:p-4 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] transition-all duration-300 origin-top-right z-50 ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 -translate-y-2 pointer-events-none'}`}>
        
        <div className="absolute -inset-px bg-emerald-500/10 rounded-2xl blur-lg -z-10"></div>
        
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-white/10">
            <Image src="me.jpg" alt="Developer" width={48} height={48} className="object-cover w-full h-full" unoptimized />
          </div>
          <div>
            <h3 className="text-white font-bold text-sm sm:text-base">Fatemeh Sooki</h3>
            <p className="text-emerald-400 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider">Frontend Developer</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <a href="https://www.linkedin.com/in/fatemeh-sooki-197060396?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 bg-zinc-800 hover:bg-[#0077b5] text-zinc-400 hover:text-white py-2 sm:py-2.5 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <FaLinkedin className="text-base sm:text-lg" />
            <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider">LinkedIn</span>
          </a>
          <a href="https://github.com/FatemehSooki" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white py-2 sm:py-2.5 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <FaGithub className="text-base sm:text-lg" />
            <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider">GitHub</span>
          </a>
          <a href="https://www.instagram.com/fatemeh_sooki?igsh=MXM4ZHBrNW55bmF0cQ==" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 bg-zinc-800 hover:bg-[#E4405F] text-zinc-400 hover:text-white py-2 sm:py-2.5 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <FaInstagram className="text-base sm:text-lg" />
            <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider">Insta</span>
          </a>
        </div>
      </div>
    </div>
  )
}