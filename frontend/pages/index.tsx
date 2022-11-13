import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className="container max-w-full w-full h-full max-h-full">

      
    
      <div className="flex items-stretch bg-grey-lighter min-h-screen">

        <div className="flex-none w-[30%] bg-sky-400">

        hello world
        </div>
        <div className="flex-1">else here</div>

      </div>

    </div>
  )
}

export default Home
