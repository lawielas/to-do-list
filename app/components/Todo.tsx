import { useState } from "react"
import { useTodoStore } from "../stores/todoStore"
import add from '../assets/svg/add.svg'
import close from '../assets/svg/close.svg'
import check from '../assets/svg/check.svg'
import deleteItem from '../assets/svg/delete.svg'
import done from '../assets/svg/done.svg'
import Image from "next/image"


const Todo = () => {
  const [inputTodo, setInputTodo] = useState('')
  const [todoId, setTodoId] = useState(1)  
  const {todos, addTodo, removeTodo, updateTodoStatus} = useTodoStore()

  const [showInput, setShowInput] = useState(false)

  return (
    <section className="shadow-xl p-4 rounded-2xl bg-white min-h-40 sm:min-h-52">
        <h2 className="bg-pink-500 text-white w-fit py-2 px-4 rounded -mt-8">TO DO</h2>
        <div className="relative">
          <div className={showInput ? "absolute z-40 left-8 sm:left-1/4 bg-gray-100 w-5/6 sm:w-3/6 p-3 rounded-xl flex flex-col gap-3" : "hidden"}>
            <button onClick={() => setShowInput(false)}><Image src={close} alt="close" className="w-7 sm:w-8 float-right" /></button>
            <div className="flex flex-col gap-3">
              <input className="w-full bg-white rounded-2xl p-3 outline-none" type="text" value={inputTodo} onChange={(e) => setInputTodo(e.target.value)}/>
              <button onClick={() =>{
                addTodo(todoId, inputTodo)
                setTodoId(todoId+1)
                setInputTodo('')
                setShowInput(false)
              }} className="bg-pink-500 p-3 text-white rounded-lg">Add Todo</button>
            </div>
          </div>
          <button onClick={() => setShowInput(true)} className="float-right mx-5"><Image src={add} alt="add" className="w-7 sm:w-10" /></button>
        </div>
        <div className="py-10">
          {todos.map((todo) => {
            return todo.status === false && <div key={todo.id} className="flex mt-2 w-full justify-between px-6">
              <p className={!todo.status ? "text-black" : "text-green-400"}>{todo.item}</p>
              <div className="flex gap-4 sm:gap-6">
                <button onClick={() => removeTodo(todo.id)}><Image src={deleteItem} alt="delete" className="w-7 sm:w-8" /></button>
                <button onClick={() => updateTodoStatus(todo.id)}><Image src={check} alt="check" className="w-7 sm:w-8" /></button>
              </div>
            </div>
          })}
          {todos.map((todo) => {
            return todo.status === true && <div key={todo.id} className="flex mt-2 w-full justify-between px-6">
              <p className='line-through decoration-gray-500 text-gray-700'>{todo.item}</p>
              <div className="flex gap-3">
                <button className="cursor-auto" onClick={() => updateTodoStatus(todo.id)}><Image src={done} alt="done" className="w-7 sm:w-8" /></button>
              </div>
            </div>
          })}
        </div>
      </section>
  )
}
export default Todo