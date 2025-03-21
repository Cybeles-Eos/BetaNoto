import style from './home.module.css'
import { useState } from 'react';

import Features from '../../components/FeatureBox/feature.jsx';

import dummy_img_black from '../../images/dummy_img_black.jpg'
import dummy_img_white from '../../images/dummy_img_white.jpg'

function Home(){
   let featureObject = [
      {
         image: dummy_img_black,
         title: 'To-do List',
         text: 'A to-do list helps you stay organized by keeping track of your tasks in one place. You can create new tasks, update them as needed, delete completed ones, and save your progress for later. With a to-do list, managing your daily goals becomes simple and efficient.'
      },
      {
         image: dummy_img_white,
         title: 'Personal Notes',
         text: 'Personal notes help you organize thoughts, ideas, and important information in a structured way. You can create notes with a title, edit and save them, delete when needed, and even customize the header color. With features like adding dates and formatting content with breaklines, your notes stay clear and easy to manage.'
      }
   ]
   let [active, setActive] = useState(true);

   return(
      <>
         <main className={style.main}>
            <div className={style.introduction}>

               <p id='title' className={style.title}>Your digital desk for tasks and notes</p>
               <label htmlFor="title" className={style.label}>Capture ideas, organize tasks, and stay on top of your day effortlessly. Your all-in-one space for planning and productivity.</label>
               <div className={style.buttons_con}>
                  <button onClick={() => setActive(true)} className={`${style.btn} ${style.btn_todo} dis_u_drg ${active ? "btn_active" : ""}`}>
                     To-do List
                  </button>
                  <button onClick={() => setActive(false)} className={`${style.btn} ${style.btn_note} dis_u_drg ${!active ? "btn_active" : ""}`}>
                     Notes
                  </button>
               </div>
            </div>
            
            {active ? <Features 
                        image={featureObject[0].image} 
                        title={featureObject[0].title} 
                        text={featureObject[0].text}/> : 
                     <Features 
                        image={featureObject[1].image} 
                        title={featureObject[1].title} 
                        text={featureObject[1].text}/> }
            
         </main>
      </>
   )
}

export default Home
