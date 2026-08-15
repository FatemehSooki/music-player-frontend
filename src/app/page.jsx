export const dynamic = 'force-dynamic'
import React from 'react'
import STRAPI_URL from '../lib/api.js'
import './globals.css'
import Sidebar from '@/components/Sidebar.jsx'
import { GiMusicSpell } from "react-icons/gi";
import SongCards from '@/components/SongCards.jsx';
import { FaFireAlt } from "react-icons/fa";
import { GiVineWhip } from "react-icons/gi";
import { GiMusicalScore } from "react-icons/gi";
import Sekuya from '@/lib/fonts.js'
import Link from 'next/link.js';
import MusicPlayer from '@/components/MusicPlayer.jsx';
import TopArtists from '@/components/TopArtists.jsx';


export default async function page() {
  const res = await fetch(`${STRAPI_URL}/api/songs?populate=*&pagination[pageSize]=100`)
  const para = await res.json()
  const slicedSong = para.data.slice(0, 4)

  const res2 = await fetch(
    `${STRAPI_URL}/api/songs?populate=*&sort=createdAt:desc&pagination[limit]=20`
  )
  const para2 = await res2.json()
  const slicedSong2 = para2.data.slice(0, 4)

  const uniqeArtists = [...new Set(para.data.map(s => s.artist))].slice(0, 5)

  return (
    <main className='bg-zinc-950 w-full min-h-screen'>
      <div className='w-full mt-10 flex flex-col lg:flex-row justify-between gap-3 px-3'>
        <div className="hidden lg:block shrink-0">
          <Sidebar />
        </div>

        {/* top songs */}
        <div className='w-full lg:w-[73%] bg-zinc-900 rounded-2xl p-4 md:p-6 flex flex-col gap-6 md:gap-8 mb-10'>
          <section className='w-full flex flex-col gap-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2 text-base md:text-[18px]'>
                <FaFireAlt />
                <h2 className='uppercase font-semibold tracking-wide'>top songs</h2>
              </div>
              <Link href="/songs" className="text-sm text-green-500 hover:text-green-400 transition-colors">
                See all
              </Link>
            </div>

            <div className='flex flex-wrap gap-4 justify-center sm:justify-start'>
              {slicedSong && slicedSong.map((topSong, i) => (
                <SongCards
                  key={topSong.documentId}
                  index={i}
                  allSongs={para.data}
                  duration={topSong.duration}
                  title={topSong.title}
                  src={topSong.cover}
                  artist={topSong.artist}
                  audio={topSong.audio}
                  artistCover={topSong.artistCover}
                />
              ))}
            </div>
          </section>




          {/* new released */}
          <section className='w-full flex flex-col gap-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2 text-base md:text-[18px]'>
                <GiVineWhip />
                <h2 className='uppercase font-semibold tracking-wide'>new released</h2>
              </div>
              <Link href="/newReleased" className="text-sm text-green-500 hover:text-green-400 transition-colors">
                See all
              </Link>
            </div>

            <div className='flex flex-wrap gap-4 justify-center sm:justify-start'>
              {slicedSong2 && slicedSong2.map((newsong, i) => (
                <SongCards
                  key={newsong.documentId}
                  index={i}
                  allSongs={para2.data}
                  duration={newsong.duration}
                  title={newsong.title}
                  src={newsong.cover}
                  artist={newsong.artist}
                  audio={newsong.audio}
                  artistCover={newsong.artistCover}
                />
              ))}
            </div>
          </section>

          {/* top artists */}
          <section className='w-full flex flex-col gap-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2 text-base md:text-[18px]'>
                <GiMusicalScore />
                <h2 className='uppercase font-semibold tracking-wide'>top artists</h2>
              </div>
              <Link href="/artists" className="text-sm text-green-500 hover:text-green-400 transition-colors">
                See all
              </Link>
            </div>

            <div className='flex flex-wrap justify-center sm:justify-evenly gap-4'>
              {uniqeArtists && uniqeArtists.map((artistName, i) => {
                const artistSong = para.data.find(s => s.artist === artistName)
                return (
                  <TopArtists
                    key={artistName}
                    artist={artistName}
                    image={artistSong.artistCover}
                    href={`/artists/${encodeURIComponent(artistName)}`}
                  />
                )
              })}
            </div>
          </section>

        </div>
      </div>
    </main>
  )
}