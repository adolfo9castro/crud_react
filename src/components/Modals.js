import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    TextField
} from "@mui/material/"

const Modals = ({
    alertMessage,
    setAlertMessage,
    launchFunction,
    setTasks,
    tasks,
    taskId,
    themeForModal
}) => {
    const [editedTask, setEditedTask] = useState("")
    const functionLauched = {
        justOnlyCloseModal: () => {
            setAlertMessage(false)
        },
        askForEliminateTask: () => {
            setAlertMessage(false)
            setTasks(tasks.filter(task => task.id !== taskId))
        },
        askForEditeTask: () => {
            setAlertMessage(false)
            setTasks(tasks.map(task => task.id === taskId ? { ...task, name: editedTask } : task))
            setEditedTask("")
        }
    }

    return (

        <Dialog
            open={alertMessage}
            onClose={() => (setAlertMessage(false))}
            fullWidth={true}
        >
            <DialogTitle id="alert-dialog-title">
                {themeForModal.title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {themeForModal.message}
                </DialogContentText>

                {
                    themeForModal.editTaskModal
                        ?

                        <FormControl fullWidth sx={{ m: 1 }}>
                            <TextField
                            id="outlined-basic"
                            label="Tarea..."
                            autoFocus
                            margin="dense"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={(text) => { setEditedTask(text.target.value) }}
                            value={editedTask}
                            />
                        </FormControl>
                        : ""
                }

            </DialogContent>
            <DialogActions>
                {
                    themeForModal.buttonSecundary
                        ?
                        <Button 
                            variant="outlined"
                            color={themeForModal.buttonSecundary} 
                            onClick={() => (setAlertMessage(false))}
                        >
                            {themeForModal.messageButtonSecundary}
                        </Button>
                        : ""
                }
                <Button 
                    variant="outlined"
                    onClick={() => (functionLauched[launchFunction]())} 
                    autoFocus
                    color={themeForModal.button}
                >
                    {themeForModal.messageButton}
                </Button>
            </DialogActions>
        </Dialog>

    )
}

export default Modals