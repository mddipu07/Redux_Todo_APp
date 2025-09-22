import { useState,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import {addTodo,removeTodo,toggleTodo} from './Redux/todoSlice'

const TodoApp = () => {
const [text,setText] = useState("");
const [editId,setEditId] = useState(null);
const todos = useSelector((state)=>state.todos)
const dispatch = useDispatch();

useEffect(()=>{
  const savedTodos = JSON.parse(localStorage.getItem("todos"))
  || [];
  if(savedTodos.length > 0){
    savedTodos.forEach((todo)=> {
        dispatch({
            type:"todos/loadFromStorage",
            payload:todo,
        })
    })
  }

},[dispatch])

useEffect(()=>{
     localStorage.setItem("todos",JSON.stringify(todos));
},[todos])

const handleAddTodo = () => {
    if(text.trim()){
        if(editId){
            dispatch(removeTodo(editId));
            dispatch(addTodo(`${text}(edited)`));
            setEditId(null)
        }else{
            dispatch(addTodo(text))
        }
        setText("")
    }
}

const handleEditTodo = (todo) =>{
     setText(todo.text);
     setEditId(todo.id)
}
return(
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
         <h1 className="text-4xl font-bold mb-5">Redux Todo App</h1>

         <div>
             <div>
                
             </div>
         </div>
      </div>
    </>
)




}



export default TodoApp;