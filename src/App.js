import React, { useState } from "react";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Typography,
  TextField,
  Grid,
  Divider,
  Container,
  FormControl,
  Button,
  List,
  ListItem,
  ListItemText,
  Stack
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
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
        title: "Atención",
        message: "No puede crear una tarea sin un nombre",
        button: "primary",
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
      title: "⚠ Precaución",
      message: "Está a punto de eliminar una tarea y no se puede recuperar",
      button: "danger",
      messageButton: "Sí, eliminar",
      buttonSecundary: "primary",
      messageButtonSecundary: "No, no eliminar",

    })
  }

  const editeTask = (id) => {
    setAlertMessage(true)
    setLaunchFunction("askForEditeTask")
    setTaskId(id)
    setThemeForModal({
      title: "Editar una tarea",
      message: "¿Desea editar esta tarea?",
      button: "success",
      messageButton: "Sí, actualizar",
      buttonSecundary: "primary",
      messageButtonSecundary: "No, cancelar",
      editTaskModal: true
    })
  }

  return (
    <Container fixed >

      <Grid container alignItems="center">
        <Grid container marginBottom={5} borderBottom={2} paddingBottom={3}>
          <Typography level="h2" variant="h3">Tareas</Typography>
        </Grid>

        <Divider />
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Typography level="h3" variant="h4" align="center">Tareas por hacer</Typography>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary="Brunch this weekend?"
                  secondary=" — I'll be in your neighborhood doing errands this…"
                />
                <Stack direction="row" spacing={2}>

                  <Button variant="contained" color="warning" startIcon={<EditIcon/>}>
                    Editar
                  </Button>
                  <Button variant="contained" color="error" startIcon={<DeleteIcon />}>
                    Eliminar
                  </Button>
                </Stack>
              </ListItem>


            </List>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography level="h3" variant="h4" align="center">Agregar tarea</Typography>
            <Grid item xs={12}>
              <FormControl fullWidth sx={{ m: 1 }}>
                <TextField id="outlined-basic" label="Ingresa nueva tarea" variant="outlined" />

              </FormControl>
              <FormControl fullWidth sx={{ m: 1 }}>
                <Button variant="contained" startIcon={<AddIcon />}>Agregar</Button>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

    </Container>
    /*     <div className="container mt-5">
          
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
        </div> */
  );
}

export default App;
