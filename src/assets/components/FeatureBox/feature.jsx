import style from './feature.module.css'

function Features(props){
   return(
      <>
         <div className={style.overview}>
            <div className={style.overview_body}>
               <div className={style.image_con}>
                  <img className={`${style.image} dis_u_drg`} src={props.image} alt="" />
               </div>
               <div className={style.information}>
                  <h2 className={style.info_title}>{props.title}</h2><br/>
                  <p className={style.text}>{props.text}</p>
               </div>
            </div>
         </div>
      </>
   )
}

export default Features


