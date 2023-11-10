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
      button: "error",
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
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            {
              tasks.length === 0
                ?
                <Typography level="h3" variant="h4" align="center">Aún no hay tareas</Typography>
                :
                <><Typography level="h3" variant="h4" align="center">
                  Tareas por hacer: {tasks.length}
                </Typography>
                  <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {
                      tasks.map((task) => (
                        <ListItem alignItems="flex-start" key={task.id}>
                          <ListItemText >
                            <Typography variant="h5">{task.name}</Typography>
                          </ListItemText>
                          <Stack direction="row" spacing={2}>
                            <Button 
                              variant="contained" 
                              color="warning" 
                              startIcon={<EditIcon />}
                              onClick={() => editeTask(task.id)}
                            >
                              Editar
                            </Button>
                            <Button 
                              variant="contained" 
                              color="error" 
                              startIcon={<DeleteIcon />}
                              onClick={() => deleteTask(task.id)}
                            >
                              Eliminar
                            </Button>
                          </Stack>
                        </ListItem>
                      ))
                    }
                  </List></>
            }
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography level="h3" variant="h4" align="center">Agregar tarea</Typography>
            <Grid item xs={12}>
              <FormControl fullWidth sx={{ m: 1 }}>
                <TextField
                  id="outlined-basic"
                  label="Ingresa nueva tarea"
                  variant="outlined"
                  onChange={(text) => { setTask(text.target.value) }}
                  value={task}
                />

              </FormControl>
              <FormControl fullWidth sx={{ m: 1 }}>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  type="submit"
                  onClick={addTask}
                >
                  Agregar
                </Button>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Modals
        alertMessage={alertMessage}
        setAlertMessage={setAlertMessage}
        launchFunction={launchFunction}
        setTasks={setTasks}
        tasks={tasks}
        taskId={taskId}
        themeForModal={themeForModal}
      />

    </Container>
  );
}

export default App;
