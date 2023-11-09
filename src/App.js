import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuid } from "uuid";
import Modals from "./components/Modals";

function App() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])
  const [alertMessage, setAlertMessage] = useState(false)
  const [launchFunction, setLaunchFunction] = useState("")
  const [taskId, setTaskId] = useState("")
  const [themeForModal, setThemeForModal] = useState({})
  

  const addTask = () => {

    if (task === "") {
      setAlertMessage(true) 
      setLaunchFunction("justOnlyCloseModal")
      setThemeForModal({
        title:"Atención",
        message: "No puede crear una tarea sin un nombre",
        button:"primary",
        messageButton: "Entendido",
      })
    }
    else {
      const newTask = {
        id: uuid(),
        name: task
      }

      setTasks([...tasks, newTask])
      setTask("")
    }

  }

  const deleteTask = (id) => {
    setAlertMessage(true) 
    setLaunchFunction("askForEliminateTask")
    setTaskId(id)
    setThemeForModal({
      title:"⚠ Precaución",
      message: "Está a punto de eliminar una tarea y no se puede recuperar",
      button:"danger",
      messageButton: "Sí, eliminar",
      buttonSecundary:"primary",
      messageButtonSecundary: "No, no eliminar",

    })
  }

  const editeTask = (id) => {
    setAlertMessage(true) 
    setLaunchFunction("askForEditeTask")
    setTaskId(id)
    setThemeForModal({
      title:"Editar una tarea",
      message: "¿Desea editar esta tarea?",
      button:"success",
      messageButton: "Sí, actualizar",
      buttonSecundary:"primary",
      messageButtonSecundary: "No, cancelar",
      editTaskModal:true
    })
  }

  return (
    <div className="container mt-5">
      
      <h1>Tareas</h1><hr />
      <div className="row">
        <div className="col-12 col-md-8">
          {
            tasks.length === 0
              ? <h4 className="text-center">No hay tareas aún</h4>
              :
              <><h4 className="text-center">Tareas por hacer: {tasks.length}</h4>
                <ul className="list-group">
                  {tasks.map((task) => (
                    <li className="list-group-item" key={task.id}>
                      <span className="lead">{task.name}</span>
                      <button
                        className="btn btn-danger btn-sm float-end mx-2"
                        onClick={() => deleteTask(task.id)}
                      >
                        Eliminar
                      </button>
                      <button
                        className="btn btn-warning btn-sm float-end"
                        onClick={() => editeTask(task.id)}
                      >
                        Editar
                      </button>
                    </li>
                  ))}
                </ul></>
          }
        </div>
        <div className="col-12 col-md-4">
          <h4 className="text-center">Agragar tarea</h4>
          <div className="d-grid gap-2">
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingresa nueva tarea"
              onChange={(text) => { setTask(text.target.value) }}
              value={task}
            />
            <button
              className={`btn btn-dark btn-block ${task === "" ? "enable" : "enable"}`}
              type="submit"
              onClick={addTask}
            >
              Agregar
            </button>

          </div>
        </div>
        <Modals
        alertMessage={alertMessage}
        setAlertMessage={setAlertMessage}
        launchFunction={launchFunction}
        setTasks={setTasks}
        tasks={tasks}
        taskId={taskId}
        themeForModal={themeForModal}
      />
      </div>
    </div>
  );
}

export default App;
