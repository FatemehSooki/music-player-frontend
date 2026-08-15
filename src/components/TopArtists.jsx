import Image from 'next/image'
import Link from 'next/link'

export default function TopArtists({ artist, image, href }) {
  return (
    <Link 
      href={href || '#'} 
      className="group flex flex-col items-center gap-2 sm:gap-3 w-24 sm:w-28 md:w-32 lg:w-36"
    >

      <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-48 lg:h-48 rounded-full overflow-hidden border-2 border-transparent transition-all duration-300 group-hover:border-emerald-500/30">
        <Image
          src={image}
          alt={artist}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          unoptimized
        />
      </div>


      <span className="text-xs sm:text-sm font-semibold text-white text-center truncate w-full px-2 transition-colors duration-300 group-hover:text-emerald-400">
        {artist}
      </span>
    </Link>
  )
}