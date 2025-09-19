import Image from "next/image";
import styles from './sidenav.module.css';
import { useReducer } from 'react';


export default function Sidenav({modals, dispatch}) {

  
  function handleCreateSection() {
    const uniqueId = crypto.randomUUID();
  }


  function handleOpenElmntsModal() {
        
    dispatch({
        type: 'elementsOpen',
    })
      
  }

  return(
    <>
      <div className={styles.container}>
          <button role="button" data-testid="add-elmnt-btn" type="button" onClick={handleOpenElmntsModal} className="icon-button">
            <Image src="add-elements.svg" alt="Add Elements" width={24} height={24} />
          </button>
          <button type="button" onClick={handleCreateSection} className="icon-button">
            <Image src="add-section.svg" alt="Add Section" width={24} height={24} />
          </button>
          <button type="button" onClick={handleCreateSection} className="icon-button">
            <Image src="add-page.svg" alt="Add Page" width={24} height={24} />
          </button>
          <button type="button" onClick={handleCreateSection} className="icon-button">
            <Image src="add-media.svg" alt="Add Media" width={24} height={24} />
          </button>
      </div>
    </>
  )

}
