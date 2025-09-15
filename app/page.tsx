/**
 * @jest-environment jsdom
 */
import Image from "next/image";
import styles from "./page.module.css";
import Sidenav from "@/components/sidenav/sidenav"
import WebsiteComponent from "@/components/WebsiteComponent/WebsiteComponent"

const pageStructure : any= {
  styles: { },
  children: [
   { 
     tag: "section",
     children: [
       { src: "https://www.pexels.com/photo/photo-of-neon-signage-1820770/" , 
         alt: "banner", tag: "image", className: "banner",  role: "banner", id: "banner"  },
       { className: "title", tag: "title", text: "Hello Website", role: "heading" },
      ],
      className: "section",
      id: "section",
   }

  ],
};


export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Dashboard />
      </main>
    </div>
  );
}


function Dashboard() {

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
              <WebsiteComponent components={pageStructure.children} />
            </div>

        </div>
    </>
  )
}
