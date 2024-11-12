import { useState, useEffect } from 'react'
import Navbar from './component/Navbar'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { stringify, v4 as uuidv4 } from 'uuid';

function App() {

  const [todo, setTodo] = useState("")
  const [showFinished, setShowFinished] = useState(true)
  const [todos, setTodos] = useState(() => {
    // Load todos from localStorage when the component mounts
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  
  useEffect(() => {
    // Save todos to localStorage whenever the todos array changes
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);


  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo);
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)

  }

  const toggleFinished = (e) => {
    setShowFinished(!showFinished)
  }

  const handleDelete = (e, id) => {
    let delConfirm = confirm("Are you sure, that you want to delete this task?")
    console.log(delConfirm)
    if (delConfirm) {
      let newTodos = todos.filter(item => {
        return item.id !== id
      });
      setTodos(newTodos)
    }

  }
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
  }

  const handleChange = (e) => {
    setTodo(e.target.value);

  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
  }



  return (
    <>
      <div className='bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 h-[110vh]'>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-8 rounded-xl p-5 min-h-[80vh] md:w-1/2 border-[2px] border-indigo-300">
      <h1 className='font-bold text-center md:text-3xl text-2xl'>iTask - Manage your todos at one place</h1>
          <h2 className='text-xl md:text-2xl font-bold my-5 gap-3'>Add a Todo</h2>
        <div className="addTodo my-5 flex gap-3">
          <input onChange={handleChange} value={todo} type="text" className='w-[85%] rounded-full px-5 py-1' />
          <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-violet-700 disabled:bg-violet-500 hover:bg-violet-900 text-white rounded-md px-2 text-sm font-semibold py-1'>Save</button>
        </div>
        <input className='my-4' onChange={toggleFinished} type="checkbox" checked={showFinished} />  
        <label className='mx-2' htmlFor="show">Show Finished</label>
        <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>      
         <h2 className='text-xl md:text-2xl font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length == 0 && <div className='m-5'>No Tasks to display.</div>}
          {todos.map(item => {

            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex my-3 justify-between ">
              <div className='flex gap-5'>
                <input type="checkbox" onChange={handleCheckbox} checked={item.isCompleted} name={item.id} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div> 
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => handleEdit(e, item.id)} className='bg-violet-700 hover:bg-violet-900 text-white rounded-md px-2 text-lg font-semibold py-1 mx-1 pl-2.5'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-700 hover:bg-violet-900 text-white rounded-md px-2 text-lg font-semibold py-1 mx-1'><MdDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>
      </div>
    </>
  )
}

export default App
