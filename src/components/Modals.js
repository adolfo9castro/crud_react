import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

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
            setTasks(tasks.map(task => task.id === taskId ? { ...task, name: editedTask} :task))
            setEditedTask("")
        }
    }

    return (
        <Modal
            show={alertMessage} onHide={() => (setAlertMessage(false))}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>{themeForModal.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {themeForModal.message}
                {
                    themeForModal.editTaskModal
                        ?
                        <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label></Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Tarea..."
                                    autoFocus
                                    onChange={(text) => { setEditedTask(text.target.value) }}
                                    value={editedTask}
                                />
                            </Form.Group>
                        </Form>
                        : ""
                }

            </Modal.Body>
            <Modal.Footer>
                {
                    themeForModal.buttonSecundary
                        ?
                        <Button variant={themeForModal.buttonSecundary} onClick={() => (setAlertMessage(false))}>
                            {themeForModal.messageButtonSecundary}
                        </Button>
                        : ""
                }


                <Button variant={themeForModal.button} onClick={() => (functionLauched[launchFunction]())}>
                    {themeForModal.messageButton}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default Modals