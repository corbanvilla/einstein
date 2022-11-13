import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react';
import styles from '../styles/Home.module.css'
import { InferGetStaticPropsType } from 'next'
import { CSData } from './cs';

import Draggable from 'react-draggable';
import React from 'react'
import { PERMANENT_REDIRECT_STATUS } from 'next/dist/shared/lib/constants';

type DraggableEventHandler = (e: Event, data: DraggableData) => void | false;
type DraggableData = {
  node: HTMLElement,
  // lastX + deltaX === x
  x: number, y: number,
  deltaX: number, deltaY: number,
  lastX: number, lastY: number
};

interface ClassData {
  id: string;
  name: string;
  des: string;
  timings: string[];
  credits: number; 
}

// const displayData = (i:any, data:any) => {
//   console.log(i);
//   console.log(data);
// }

const printCoords = (i:any, data:any) => {
  console.log(i);
  console.log(data);
}

export function getServerSideProps(context: any) {

  return {
    props: {
      classes: CSData as ClassData[]
    }
  }

} 
 
export default function Home({ classes }: InferGetStaticPropsType<typeof getServerSideProps>) {

   console.log(classes);

  // const classes = [
  //   {
  //     id: 'CS-1001',
  //     name: 'Intro to CS',
  //     credits: 4,
  //     des: 'The intro class bro'
  //   },

  //   {
  //     id: 'CS-1002',
  //     name: 'Discrete Math',
  //     credits: 4,
  //     des: 'The second intro class bro'
  //   },

  //   {
  //     id: 'CS-1221',
  //     name: 'Data Structures',
  //     credits: 4,
  //     des: 'The third intro class bro'
  //   }

  // ]

  //@ts-ignore
  function handleClick(e) {
    console.log('click');
    e.target.style.backgroundColor = 'blue';
  }
  

  return (
    <div className="container max-w-full w-full h-full max-h-full">

      <div className="flex items-stretch bg-grey-lighter min-h-screen">

        {/*sidebar - scrollable*/}
        <div className="flex-none p-6 w-[20%] bg-blue-300 z-10">

          <h2 className="text-2xl font-semibold">Classes</h2>

          {/* <div className="flex-none p-2 pl-4 w-[100%] bg-sky-100 rounded-2xl">
            <p className="text-black-700">Add class here</p>
          </div> */}

          <ul>
            {classes.map(({id, name, des}) => (
              <li key={id} className="z-5">
                <Draggable
                  onDrag={printCoords}
                  grid={[360, 500]}
                >
                  <div className="flex-none p-3 pl-4 mt-4 w-[100%] bg-sky-100 rounded">
                    <p className="text-xs">{id}</p>
                    <h3 className="text-l font-semibold" key={name}>{name}</h3>
                    <p>{des.slice(0,80)}...</p>
                  </div>
                </Draggable>
              </li>
            ))}
          </ul>

        </div>
        
        {/*sidebar2*/}
        <div className="flex-none bg-red-200 fh-screen sticky p-6 w-[20%] z-0">
          <h2 className="text-2xl font-semibold">My Schedule</h2>
          <p className="">Credits: <span className="creditSum">0</span></p>
        </div>

        {/*content - sticky*/}
        <div className="fh-screen sticky top-0"></div>

      </div>

    </div>
  )
}
