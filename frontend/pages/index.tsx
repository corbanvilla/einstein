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

let creditSum = 0;

const printCoords = (i:any, data:any) => {
  //console.log(i);
  console.log(data);

  if (data.x>289 && data.x<575) { //first column

  }

  //console.log(data.node);
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

  //@ts-ignore
  function handleClick(e) {
    window.screen.height
    console.log('click');
    e.target.style.backgroundColor = 'blue';
  }

  return (

    <div className="container max-w-full w-full h-full max-h-full">

      <div className="flex items-stretch bg-grey-lighter min-h-screen">

        {/*sidebar - scrollable*/}
        <div className="flex-flow w-[20%] bg-gray-200 z-10">

          <h2 className="text-2xl font-semibold bg-gray-200 sticky top-0 p-6 pt-4 pb-4 z-20">Classes</h2>

          <ul className="pl-6 pr-6 flex-wrap">
            {classes.map(({id, name, des}) => (
              <li key={id}>
                <Draggable
                  onDrag={printCoords}
                  grid={[289, 20]}
                >
                  <div className="flex-none p-3 pl-4 mt-4 w-[100%] bg-white rounded">
                    <p className="text-xs">{id}</p>
                    <h3 className="text-l font-semibold" key={name}>{name}</h3>
                    {/* <p>{des.slice(0,80)}...</p> */}
                  </div>
                </Draggable>
              </li>
            ))}
          </ul>

        </div>
        
        {/*sidebar2*/}
        <div className="flex-none bg-red-200 fh-screen w-[20%]">
          <div className="bg-red-200 p-6 pt-4 pb-3 sticky top-0 z-20">
            <h2 className="text-2xl font-semibold">Freshman Year</h2>
            <p className="">Credits: <span className="creditSum">0</span></p>
          </div>
        </div>
        
        {/*sidebar2*/}
        <div className="flex-none bg-blue-200 fh-screen w-[20%]">
          <div className="bg-blue-200 p-6 pt-4 pb-3 sticky top-0 z-20">
            <h2 className="text-2xl font-semibold">Sophomore Year</h2>
            <p className="">Credits: <span className="creditSum">0</span></p>
          </div>
        </div>

        {/*sidebar2*/}
        <div className="flex-none bg-yellow-200 fh-screen w-[20%]">
          <div className="bg-yellow-200 p-6 pt-4 pb-3 sticky top-0 z-20">
            <h2 className="text-2xl font-semibold">Junior Year</h2>
            <p className="">Credits: <span className="creditSum">0</span></p>
          </div>
        </div>

        <div className="flex-none bg-green-200 fh-screen w-[20%]">
          <div className="bg-green-200 p-6 pt-4 pb-3 sticky top-0 z-20">
            <h2 className="text-2xl font-semibold">Senior Year</h2>
            <p className="">Credits: <span className="creditSum">0</span></p>
          </div>
        </div>

        {/*content - sticky*/}
        <div className="fh-screen sticky top-0"></div>

      </div>

    </div>
  )
}
