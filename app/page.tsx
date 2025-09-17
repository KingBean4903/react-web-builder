/**
 * @jest-environment jsdom
 */
'use client'
import Image from "next/image";
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import styles from "./page.module.css";
import Sidenav from "@/components/sidenav/sidenav"
import WebsiteComponent from "@/components/WebsiteComponent/WebsiteComponent"

const pageStructure : any= {
  styles: {
  },
  children: [
   { 
     tag: "section",
     role: "section",
     children: [
       { src: "banner.jpg" , 
         alt: "banner", tag: "image", className: "banner",  role: "banner", id: "banner"  },
       { className: "title", tag: "title", text: "Hello Website", role: "heading" },
      ],
      className: "section",
      id: "section",
   }

  ],
};


export default function Home() {
  
  const [state, setState] = useState(pageStructure);

  function handleAddSection(insertAtID, newSecId) {
      
    const idx = state.children.indexOf(state.children.filter(one => insertAtID == one.id )[0]);

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
    })


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

  return(
    <>
        <div className={styles.dashboard}>

            <div className={styles.topbar}>
              <h1>Topbar</h1>
            </div>
            
            <div role="sidenav" className={styles.sidenav}>
              <Sidenav /> 
            </div>
       
            <div className={styles.content}>
              <WebsiteComponent components={data.children} handleAddSection={handleAddSection} />
            </div>

        </div>
    </>
  )
}
