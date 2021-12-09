import { useState, useEffect } from "react";
import { TaskRow } from './components/taskRow';
import { TaskBanner } from './components/taskBanner';
import {TasksCreator} from './components/taskCreator'
import {VisibilityControl} from './components/visibilityControl'


function App() {
const [userName, setUserName] = useState('Facundo')

const [taskItems, setTaskItems] = useState([
  { name: "Task One", done: false },
  { name: "Task Two", done: false },
  { name: "Task Three", done: true },
  { name: "Task Four", done: false }
])

const[showCompleted, setShowCompleted]= useState(true)

useEffect(()=>{
 let data = localStorage.getItem('tasks')
 if(data != null){
   setTaskItems(JSON.parse(data))
 } else{
   setUserName('facu example')
   setTaskItems([
      { name: "Task One example", done: false },
      { name: "Task Two example", done: false },
      { name: "Task Three example", done: true },
      { name: "Task Four example", done: false }
   ])
   setShowCompleted(true)
 }
},[])

useEffect(()=>{
  localStorage.setItem('task', JSON.stringify(taskItems))
},[taskItems])

const crateNewTask= taskName =>{
  if(!taskItems.find( t=> t.name === taskName)){
    setTaskItems([...taskItems, {name: taskName, done:false}])
  }
}

const toggleTask = (task) =>
  setTaskItems(taskItems.map(t=>( t.name === task.name ? {...t, done: !t.done} : t)))


const taskTableRow=(doneValue)=>
   taskItems
   .filter(task => task.done === doneValue)
   .map(task=>(
     <TaskRow task={task} key={task.name} toggleTask={toggleTask}/>
   ))


  return (
    <div >
       <TaskBanner userName={userName} taskItems={taskItems}/>

       <TasksCreator callback={crateNewTask}/>
       <table className="table table-striped table-bordered">
          <thead>
              <tr>
                  <th>description</th>
                  <th>done</th>
              </tr>
          </thead>
           <tbody>
                {taskTableRow(false)}
          </tbody>
       </table>

       <div className="bg-secondary-text-white text-center p-2">
              <VisibilityControl
               description='completed task'
               isChecked= {showCompleted}
               callback={checked => setShowCompleted(checked)}
              />
       </div>

      {
         showCompleted && (
           <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>despcription</th>
                  <th>done</th>
                </tr>
              </thead>
              <tbody>
                {taskTableRow(true)}
              </tbody>
           </table>
         )
       }
    </div>
  );
  }

export default App;