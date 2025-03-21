import style from './Personal.module.css'
import noFile from '../../images/404 Error Page not Found with people connecting a plug-bro.svg'

function PersonalNote(){
   return(
      <>
         <main className={style.main}>
            <img src={noFile} alt="404" className={style.img} />
         </main>
      </>
   )
}

export default PersonalNote