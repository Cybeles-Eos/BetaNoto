import style from './todo.module.css'
import styleDialog from './dialog.module.css'
import { useState, useEffect } from 'react'

import TodoCard from '../../components/todocard/todocard.jsx'
import ListEmpty from '../../components/emptyList/empty.jsx'


function TodoList(){
   const [todoLists, setTodoList] = useState([])

   //load localStorage data only on mount or once the site display.
   useEffect(()=>{
      let storage = JSON.parse(localStorage.getItem("betaSaved")) || [];
      setTodoList(storage);
   }, [])

   let [openDialog, setOpenDialog] = useState(false);
   const disableOverflow = () =>{
      let html = document.getElementsByTagName('html')[0];
      html.style.overflow =  openDialog ? "auto" : "hidden";

      window.scrollTo({
         top: 0
      });
   }

   //Check if the list is empty.
   const [isEmpty, setIsEmpty] = useState(true);
   useEffect(() => {
      setIsEmpty(todoLists.length === 0 ? true : false); 
   }, [todoLists]); // Depend on `todoLists` to update correctly
  
 
   //Users Input Methods
   const TodoDialog = ()=>{
      // Methods and value
      let [userDate, setUserDate] = useState('');
      let [updDate, setUpdDate] = useState('');
      let [userTxt, setUserTxt] = useState('');
      let [word_length, setWord_length] = useState(0);

      const trackLength = ()=> {
         let textArea = document.getElementById('texts');
         setWord_length(textArea.value.length)
         setUserTxt(textArea.value);
      }
      const getdate = ()=> {
         let dateInp = document.getElementById('inp_date');
         let separate_inp = dateInp.value.split('-');
   
         let month_text = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
         let index = separate_inp[1].toString().charAt(0) == '0' ? Number(separate_inp[1].toString().charAt(1)) : separate_inp[1];
         
         let computedYear = separate_inp[0];
         let computedMonth = month_text[index - 1];
         let computedDay = separate_inp[2].toString().charAt(0) == '0' ? separate_inp[2].toString().charAt(1) : separate_inp[2];
         
         let date = `${computedMonth} ${computedDay}, ${computedYear}`;
         setUserDate(date);
         setUpdDate(dateInp.value);
      }
      const saveList = ()=> {
         if(userTxt.trim().length === 0) {
            document.getElementById('texts').classList.add('brd_notif');
            document.getElementById('inp_date').classList.remove('brd_notif');
            return;
         }
        
         if(userDate.trim() === '') {
            document.getElementById('inp_date').classList.add('brd_notif');
            document.getElementById('texts').classList.remove('brd_notif');
            return;
         }
         
         let textArea = document.getElementById('texts');
         let array = [
            ...todoLists,
            {date: userDate, upd: updDate, text: userTxt, words: word_length}
         ]
         setTodoList(array);
         localStorage.setItem("betaSaved", JSON.stringify(array));
         
         document.getElementById('inp_date').classList.remove('brd_notif');
         document.getElementById('texts').classList.remove('brd_notif');
         setUserDate('');
         setUpdDate('')
         setUserTxt('');
         setWord_length(0);
         textArea.value = '';

         setOpenDialog(false); 
         disableOverflow();
      }

      return(
         <div className={styleDialog.input_container}>
            <div className={styleDialog.input_body}>
               <textarea onInput={trackLength} name="text-input-field" id="texts" className={styleDialog.user_inp} placeholder='Input text here...'></textarea>
               <label className={styleDialog.word_count} htmlFor="textarea">Words: {word_length}</label>
               <div className={styleDialog.date_con}>
                  <p className={styleDialog.date_title}>Card Date: </p>
                  <input onChange={getdate} type="date" id='inp_date' className={styleDialog.user_date} />
               </div>
               <div className={styleDialog.btns}>
                  <button onClick={()=>{ 
                     setOpenDialog(!openDialog);
                     disableOverflow(); 
                  }} className={`${styleDialog.btn} ${styleDialog.btn_cancel} dis_u_drg`}>Cancel</button>
                  <button onClick={saveList} className={`${styleDialog.btn} ${styleDialog.btn_save} dis_u_drg`}>Save</button>
               </div>
            </div>
         </div>
      )
   }

   // Edit Tools Methods.
   const isDone = (index, mark)=>{
      let arr = [...todoLists]
      arr[index]['done'] = mark;
      setTodoList(arr);
      localStorage.setItem("betaSaved", JSON.stringify(arr));
   }
   const isPinned = (pin, index)=> {
      let arr = [...todoLists];

      arr[index].pin = pin; // Update pin status
      arr.sort((a, b) => (b.pin === true) - (a.pin === true)); // Reorder array: Move pinned items to the front
      setTodoList(arr);
      localStorage.setItem("betaSaved", JSON.stringify(arr));
   }
   const removeTask = (index)=>{
      let arr = todoLists.filter((_,i) => i !== index)
      setTodoList(arr);
      localStorage.setItem("betaSaved", JSON.stringify(arr));
   }
   const updatedTask = (index, text, date, updDate, wordLength)=>{
      let arr = [...todoLists]
      arr[index].text = text;
      arr[index].date = date;
      arr[index].upd = updDate;
      arr[index].words = wordLength;
      setTodoList(arr);
      localStorage.setItem("betaSaved", JSON.stringify(arr));
   }

   // Debug Crate inputs :
   // <button style={{padding: '12px'}} onClick={()=>{console.log(todoLists)}}>Debug</button>
   return(
      <>
         <main className={style.main}>
            <div className={style.header}>
               <p className={style.title}>To-do List</p>
               <hr />
               <button onClick={()=>{ 
                  setOpenDialog(!openDialog);
                  disableOverflow(); 
               }} className={`${style.createBtn} dis_u_drg`}>
                  Create
               </button>
            </div>
            <section id='main_container' className={style.list_container}>
            {isEmpty && <ListEmpty />}
            
            {               
               todoLists.map((todo,i)=>{
                  return <TodoCard
                     removeThisList={removeTask}
                     date={todo.date} 
                     rDate={todo.upd}
                     complete={todo.done} 
                     completeEdit={isDone} 
                     updateThisTask={updatedTask}
                     cPin={todo.pin}
                     text={todo.text} 
                     cardPin={isPinned}
                     wordsLength={todo.words}
                     index={i} 
                     key={i}
                  />
               })
            }

            </section>
         </main>
         
         {openDialog && <TodoDialog />}
      </>
   )
}

export default TodoList