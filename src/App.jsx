import { useState, useEffect} from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';

 

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)

    useEffect(() => {
     let todoString = localStorage.getItem("todos")
    //  if(todoString){
    // let todos = JSON.parse(localStorage.getItem("todos"))
     setTodos(todos)
      // } 
    }, [])
  

   const saveToLS = (params) =>{
   localStorage.setItem("todos",JSON.stringify(todos))
   }

   const toggleFinished = (e) => {
    setShowFinished(!showFinished)

     
   }
   

  const handleEdit = (e,id) =>{
  let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    saveToLS()

  }

  const handledelete = (e, id) =>{
    let newTodos = todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    saveToLS()

    
  }

  
  const handleAdd = () =>{
    setTodos([...todos, {id :uuidv4(), todo, isCompleted: false}])
    setTodo("")
    saveToLS()
  }
  const handleChange = (e) =>{
    setTodo(e.target.value)
   
  }
  const handleCheckbox = (e) =>{
    console.log(e, e.target)
   let id = e.target.name;
   console.log(`The id is ${id}`)
   let index =  todos.findIndex(item=>{
    return item.id === id ;
   })
   console.log(index)
   let newTodos = [...todos];
   newTodos[index].isCompleted = !newTodos[index].isCompleted;
   setTodos(newTodos)
   saveToLS()

  }
  

  return (
    <>
    <Navbar/>
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] w-1/2">
      <h1 className='font-bold text-center text-xl'>iTask - Manager Your todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full px-5 py-1'/>
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 hover:bg-violet-950 disable:bg-violet p-2 py-1 text-sm font-bold text-white rounded-md'>Save</button>
        </div>
        <input onChange={toggleFinished} type="checkbox" value={setShowFinished} /> showFinished 
          <h2 className='text-lg font-bold'>Your Todos</h2>
          <div className="todos">
            {todos.length ===0 && <div className='m-5'>No Todos to display</div>}
            {todos.map(item=>{

            
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex w-1/2 m-5 justify-between">
              <div className='flex gap-5'>
              <input name={item.id} onChange={handleCheckbox} type="checkbox" value={item.isCompleted}  id='' />
              <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>{handleEdit(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit /></button>
                <button onClick={(e)=>{handledelete(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><AiFillDelete /></button>
              </div>
            </div>
            })}
          </div>
        </div>
      
    </>
  )
}

export default App
