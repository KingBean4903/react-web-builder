/**
 * @jest-environment jsdom
 */
'use client'
import Image from "next/image";
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import styles from "./page.module.css";
import Sidenav from "@/components/sidenav/sidenav"
import TopNav from "@/components/topnav/topnav"
import WebsiteComponent from "@/components/WebsiteComponent/WebsiteComponent"
import { useReducer } from 'react'; 
import { ModalsState, modalsReducer,modalsState  } from '@/lib/utils.ts'
import ElementsModal from '@/components/modals/ElementsModal';

const pageStructure : any= {
  styles: {
  },
  children: [
   { 
     tag: "section",
     role: "section",
     children: [
       { src: "banner.jpg" , style: { width: "100px", height: "100px"},
         alt: "banner", tag: "image", className: "banner",  role: "banner", id: "banner"  },
         { style: { color: "green" }, className: "title", tag: "title", text: "Hello Website", role: "heading" },
      ],
      className: "section",
      id: "section",
      style: { background: "#E0E0E0",  padding: "1em", width: "500px", height: "300px"},
   }

  ],
};


export default function Home() {
  
  const [state, setState] = useState(pageStructure);

  function handleAddSection(insertAtID, newSecId) {
      
    let idx = state.children.indexOf(state.children.filter(one => insertAtID == one.id )[0]);

    setState({
        ...state, 
        children: [
        ...state.children.slice(0, idx),
          { id: newSecId, role: "section", tag: "section", 
            children: [  
              { className: "title", tag: "title", text: "Hello Website", role: "heading" },
            ] },
          ...state.children.slice(idx),
        ]
    });
  }


  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Dashboard handleAddSection={handleAddSection} data={state}/>
      </main>
    </div>
  );
}


function Dashboard({ handleAddSection, data } : { data: any, handleAddSection: (string) => void }) {

  const [modals, dispatch] = useReducer(modalsReducer, modalsState);
  return(
    <>

        { modals.ElementsModal ? (<ElementsModal />) : '' }
        <div className={styles.dashboard}>

            <div className={styles.topbar}>
              <TopNav />
            </div>
            
            <div role="sidenav" className={styles.sidenav}>

              <Sidenav modals={modals} dispatch={dispatch}  /> 
            </div>
       
            <div className={styles.content}>
            </div>

        </div>
    </>
  )
}
