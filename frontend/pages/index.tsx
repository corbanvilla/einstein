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
   console.log(classes);

  const [show, setShow] = useState(false);
  const [classData, setClassData] = useState({});
  const [height, setHeight] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = (name: string, des: string, timings: string[]) => {
    setClassData({name, des, timings});
    setShow(true)
  };

  //@ts-ignore
  function handleClick(e) {
    window.screen.height
    console.log('click');
    console.log(window.screen.height)
    // e.target.style.backgroundColor = 'blue';
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
  
  useEffect(() => {
    if (window) { 
      //@ts-ignore
      setHeight(window.screen.height);
      console.log(`height: ${height}`);
    }
  });

  return (

    <div className="container max-w-full w-full h-full max-h-full">

      {/* Modal */}
      {/* <div className="absolute top-[50%] left-[50%]"> */}
        <div hidden={!show} id="defaultModal" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[100] w-full md:inset-0 h-modal md:h-full">
            <div className="absolute top-[50%] left-[50%] p-4 w-full max-w-3xl h-full md:h-auto translate-x-[-50%] translate-y-[-50%]">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {classData?.name}
                        </h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-6 space-y-6">
                        <p className="text-base leading-relaxed dark:text-gray-400 text-black">
                            {classData?.des}
                            <br></br><br></br>
                        </p>
                        {/* <tbody> */}
                          {/*@ts-ignore*/}


                          {classData?.timings?.map((timing: string) => (
                            <tr key={timing}>
                              <td className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                {timing}
                              </td>
                            </tr>
                            ))}
                        {/* </tbody> */}
                    </div>
                    <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                        <button onClick={handleClose} data-modal-toggle="defaultModal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Ok</button>
                    </div>
                </div>
            </div>
        </div>
      {/* </div> */}
      <div className="flex items-stretch bg-grey-lighter min-h-screen">

        {/*sidebar - scrollable*/}
        <div className="flex-flow w-[20%] bg-gray-200 z-10">

          <h2 className="text-2xl font-semibold bg-gray-200 sticky top-0 p-6 pt-4 pb-4 z-20">Classes</h2>

          {/* <div className="flex-none p-2 pl-4 w-[100%] bg-sky-100 rounded-2xl">
            <p className="text-black-700">Add class here</p>
          </div> */}

          <ul className="pl-6 pr-6 flex-wrap">
            {classes.map(({id, name, des, timings}) => (
              <li onClick={() => handleShow(name, des, timings)} key={id} className="z-5">
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
          <h2 className="text-xl font-semibold mb-2">Your Goal: Computer Science Major, Interactive Media Minor</h2>

          <div className="grid grid-cols-4">

            <div className="col-span-1 col-start-1">
                <h2 className="font-medium mb-2">Major Requirements</h2>
                <input type="checkbox"/>
                <label className="text-xs"> CS-UH 1001: Intro to CS</label><br/>
                <input type="checkbox"/>
                <label className="text-xs"> CS-UH 1002: Discrete Math</label><br/>
                <input type="checkbox"/>
                <label className="text-xs"> CS-UH 1050: Data Structures</label><br/>
                <input type="checkbox"/>
                <label className="text-xs"> CS-UH 1052: Algorithms</label><br/>
                <input type="checkbox"/>
                <label className="text-xs"> CS-UH 2010: CSO</label><br/>
                <input type="checkbox"/>
                <label className="text-xs"> CS-UH 2012: Software Eng</label><br/>
                <input type="checkbox"/>
                <label className="text-xs"> CS-UH 3010: OS</label><br/>
            </div>

            <div className="col-span-1 col-start-2">
                <h2 className="mb-2 font-medium text-white"> rrr  </h2>
                <input type="checkbox"/>
                <label className="text-xs"> CS-UH 3012: Computer Networks</label><br/>
                <input type="checkbox"/>
                <label className="text-xs"> MATH-UH 1012Q: Calculus</label><br/>
                <input type="checkbox"/>
                <label className="text-xs"> CS-UH 3090 Research Sem (1/2)</label><br/>
                <input type="checkbox"/>
                <label className="text-xs"> CS Elective</label><br/>
                <input type="checkbox"/>
                <label className="text-xs"> CS Elective</label><br/>
                <input type="checkbox"/>
                <label className="text-xs"> CS Capstone</label><br/>
                <input type="checkbox"/>
                <label className="text-xs"> CS Capstone</label><br/>
            </div>

            <div className="col-span-1 col-start-3">
                <h2 className="mb-2 font-medium">Core Curriculum</h2>
                <input type="checkbox"/>
                <label className="text-xs"> FYWS</label><br/>
                <input type="checkbox"/>
                <label className="text-xs"> Colloquium</label><br/>
                <input type="checkbox"/>
                <label className="text-xs"> Colloquium</label><br/>
                <input type="checkbox"/>
                <label className="text-xs"> Core: CCEA</label><br/>
                <input type="checkbox"/>
                <label className="text-xs"> Core: CSTS</label><br/>
                <input type="checkbox"/>
                <label className="text-xs"> Core: CADT</label><br/>
                <input type="checkbox"/>
                <label className="text-xs"> Core: CDAD</label><br/>
            </div>

          </div>

          
        </div>

    </div>
  )
}
