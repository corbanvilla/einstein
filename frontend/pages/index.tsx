import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react';
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

const col = 289;

const printCoords = (i:any, data:any) => {
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

  const [creditSum1, setcreditSum1] = useState(0);
  const [creditSum2, setcreditSum2] = useState(0);
  const [creditSum3, setcreditSum3] = useState(0);
  const [creditSum4, setcreditSum4] = useState(0);

  //@ts-ignore
  function handleClick(e) {
    window.screen.height
    console.log('click');
    e.target.style.backgroundColor = 'blue';
  }


  const addCredits = (i:any, data:any) => {
    //column 1
    if (data.x>=col && data.x<col*2) {setcreditSum1(creditSum1+4);}
    //column 2
    if (data.x>=col*2 && data.x<col*3) {setcreditSum2(creditSum2+4);}
    //column 3
    if (data.x>=col*3 && data.x<col*4) {setcreditSum3(creditSum3+4);}
    //column 4
    if (data.x>=col*4 && data.x<col*5) {setcreditSum4(creditSum4+4);}
  }

  const removeCredits = (i:any, data:any) => {
    //column 1
    if (data.x>=col && data.x<col*2) {setcreditSum1(creditSum1-4);}
    //column 2
    if (data.x>=col*2 && data.x<col*3) {setcreditSum2(creditSum2-4);}
    //column 3
    if (data.x>=col*3 && data.x<col*4) {setcreditSum3(creditSum3-4);}
    //column 4
    if (data.x>=col*4 && data.x<col*5) {setcreditSum4(creditSum4-4);}
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
                  onStart={removeCredits}
                  onStop={addCredits}
                >
                  <div className="flex-none p-3 pl-4 mt-4 mb-4 w-[100%] bg-white rounded">
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
            <p className="">Credits: {creditSum1}</p>
          </div>
        </div>
        
        {/*sidebar2*/}
        <div className="flex-none bg-blue-200 fh-screen w-[20%]">
          <div className="bg-blue-200 p-6 pt-4 pb-3 sticky top-0 z-20">
            <h2 className="text-2xl font-semibold">Sophomore Year</h2>
            <p className="">Credits: {creditSum2}</p>
          </div>
        </div>

        {/*sidebar2*/}
        <div className="flex-none bg-yellow-200 fh-screen w-[20%]">
          <div className="bg-yellow-200 p-6 pt-4 pb-3 sticky top-0 z-20">
            <h2 className="text-2xl font-semibold">Junior Year</h2>
            <p className="">Credits: {creditSum3}</p>
          </div>
        </div>

        <div className="flex-none bg-green-200 fh-screen w-[20%]">
          <div className="bg-green-200 p-6 pt-4 pb-3 sticky top-0 z-20">
            <h2 className="text-2xl font-semibold">Senior Year</h2>
            <p className="">Credits: {creditSum4}</p>
          </div>
        </div>

      </div>
      
      {/*content - sticky*/}
       <div className="sticky bottom-0 right-0 h-[20%] h-min-[800px] p-6 ml-[288px] bg-white z-50">
          <h2 className="text-xl font-semibold mb-2">Requirements</h2>

          <div className="grid grid-cols-5">

            <div className="col-span-1 col-start-1">
                <h2 className="text-l font-semibold mb-2">CS Major</h2>
                <input type="checkbox"/>
                <label> Class 1</label><br/>
                <input type="checkbox"/>
                <label> Class 2</label><br/>
                <input type="checkbox"/>
                <label> Class 3</label><br/>
                <input type="checkbox"/>
                <label> Class 4</label><br/>
                <input type="checkbox"/>
                <label> Class 5</label><br/>
            </div>

            <div className="col-span-1 col-start-2">
                <h2 className="text-l font-semibold mb-2">CS Major</h2>
                <input type="checkbox"/>
                <label> Class A</label><br/>
                <input type="checkbox"/>
                <label> Class 2</label><br/>
                <input type="checkbox"/>
                <label> Class 3</label><br/>
                <input type="checkbox"/>
                <label> Class 4</label><br/>
                <input type="checkbox"/>
                <label> Class 5</label><br/>
            </div>


          </div>

          
        </div>

    </div>
  )
}
