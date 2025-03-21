import style from './about.module.css'
import peoples from '../../images/Peoples.png'

function About(){
   return(
      <>
         <main className={style.main} >
            <img className={style.image} src={peoples} alt="" />

            <h1 className={style.about_title}>About</h1>
            <p className={style.about_text}>
               Welcome to Notes, your go-to platform for organizing thoughts, tasks, and reminders efficiently. 
               Whether you're managing a to-do list, keeping personal notes, or setting important reminders, 
               Notes helps you stay productive and in control.
            </p>
            <br />
            <p className={style.about_text}>
               Whether you're a student, professional, or just love staying organized, Log makes task management 
               effortless with simple yet powerful tools.
            </p><br />
            
            <h1 className={style.about_title}>What You Can Do with Notes:</h1><br />
            <ul className={style.capable_list}>
               <li className={style.capable_con}>
                  <p className={style.about_text}><b>To-Do Lists</b> - Keep track of daily tasks, set priorities, and check off completed items.</p>
               </li>
               <li className={style.capable_con}>
                  <p className={style.about_text}><b>Personal Notes</b> - Jot down ideas, meeting notes, or quick thoughts, all in one place</p>
               </li>
               <li className={style.capable_con}>
                  <p className={style.about_text}><b>Coming Soon</b> - Set alerts for important events, deadlines, and daily routines so you never miss anything.</p>
               </li>
            </ul>
            <br />
            <p className={style.about_text}>
               With a clean and user-friendly interface, Notes simplifies your workflow, making it easier than ever to stay on top of everything.
            </p>
         </main>
      </>
   )
}

export default About