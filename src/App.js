import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
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
  Skeleton,
  Backdrop,
  CircularProgress,
  Card,
  CardContent,
  CardActions
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import Modals from "./components/Modals";
import { getCollection, addDocument } from "./components/database";
import styles from "./styles"
import SkeletonComponent from "./components/Skeleton";

function App() {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])
  const [alertMessage, setAlertMessage] = useState(false)
  const [launchFunction, setLaunchFunction] = useState("")
  const [taskId, setTaskId] = useState("")
  const [taskName, setTaskName] = useState("")
  const [themeForModal, setThemeForModal] = useState({})
  const [getCollectionStatus, setGetCollectionStatus] = useState(false)
  const [openBrackDrop, setOpenBrackDrop] = useState(false)
  const [displayCircularProgress, setdisplayCircularProgress] = useState("")
  const [displayCheckCircleTwoToneIcon, setDisplayCheckCircleTwoToneIcon] = useState("none")
  //const [sessionAndAuthor, setSessionAndAuthor] = useState("")

  useEffect(() => {
    (async () => {
      const getSessionAndAuthor = document.cookie
      const result = await getCollection("tasks", getSessionAndAuthor)
      setTasks(result.data)
      setGetCollectionStatus(result.statusResponse)
    })()
  }, [])

  const addTask = async () => {

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
      let setSessionAndAuthor = ""
      if (!document.cookie) {
        setSessionAndAuthor = uuid()
        document.cookie = setSessionAndAuthor
      }
      else setSessionAndAuthor = document.cookie

        //await addDocument({ session: uuid() }, "users")
        setOpenBrackDrop(true)
      const result = await addDocument(
        {
          name: task,
          position: tasks.length,
          author: setSessionAndAuthor
        }, "tasks")

      if (!result.statusResponse) {
        setAlertMessage(true)
        setLaunchFunction("justOnlyCloseModal")
        setThemeForModal({
          title: "Atención ha habido un error:",
          message: result.error,
          button: "primary",
          messageButton: "Entendido",
        })
      }
      else {
        const newTask = {
          id: result.data.id,
          name: task
        }
        setTasks([...tasks, newTask])
        setTimeout(() => {
          setdisplayCircularProgress("none")
          setDisplayCheckCircleTwoToneIcon("block")
        }, 500);

        setTimeout(() => {
          setOpenBrackDrop(false)
          setdisplayCircularProgress("")
          setDisplayCheckCircleTwoToneIcon("none")
        }, 1500);

      }
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

  const editeTask = (id, taskName) => {
    setAlertMessage(true)
    setLaunchFunction("askForEditeTask")
    setTaskId(id)
    setTaskName(taskName)
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

  const {
    skeletonStyles: {
      mainTitle,
    }
  } = styles
  return (
    <Container fixed >
      <Grid container alignItems="center">
        <Grid container marginBottom={5} borderBottom={2} paddingBottom={3}>
          <Typography level="h2" variant="h3">Tareas</Typography>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            {
              <>
                {
                  getCollectionStatus
                    ?
                    <Typography level="h3" variant="h4" align="center">
                      {
                        tasks.length !== 0
                          ? `Tareas por hacer: ${tasks.length}`
                          : "No tiene tareas por hacer"
                      }

                    </Typography>
                    : <Skeleton style={mainTitle} animation="pulse" variant="text" height={40} width="100%" />
                }
                <List sx={{ width: '100%' }}>
                  {
                    !getCollectionStatus
                      ? <SkeletonComponent />
                      :
                      tasks.map((task) => (
                        <ListItem alignItems="flex-start" key={task.id}>
                          <Card
                            sx={{ width: "100%" }}
                          >
                            <CardContent>
                              <Typography variant="h5">
                                {task.name}
                              </Typography>
                            </CardContent>
                            <CardActions>
                              <Button
                                variant="contained"
                                color="warning"
                                startIcon={<EditIcon />}
                                onClick={() => editeTask(task.id, task.name)}
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
                            </CardActions>
                          </Card>
                        </ListItem>
                      ))
                  }
                </List>
              </>
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
        taskName={taskName}
        themeForModal={themeForModal}
      />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBrackDrop}
      >
        <CircularProgress color="inherit" sx={{ display: displayCircularProgress }} />
        <CheckCircleTwoToneIcon color="#FFF" sx={{ fontSize: 55, display: displayCheckCircleTwoToneIcon }} />
      </Backdrop>

    </Container>
  );
}

export default App;
