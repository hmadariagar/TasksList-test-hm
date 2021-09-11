import { useState } from "react"
import { Button, IconButton, TableCell, TableRow, TextField, Typography } from "@material-ui/core"
import { Add, Remove } from "@material-ui/icons"
import {useMutation} from "react-apollo";
import { CREATE_TODO_MUTATION, TASK_LIST_QUERY } from '../services/services';

const CreateTask = () => {

    const [showAddTask, setShowAddTask] = useState(false)
    const [taskInput, setTaskInput] = useState("")

    //funcion que muestra u oculta el input
    const handleClick = () => {
        setShowAddTask(!showAddTask)
        setTaskInput("")
    }

    //funcion que modifica estado de taskInput 
    const handleOnChange = (e) => {
        const {value} = e.target
        setTaskInput(value)
    }

    //funcion para crear la nueva Tarea
    const [createNewTask] = useMutation(CREATE_TODO_MUTATION);
    const handleCreate = () => {
        if(taskInput){
            createNewTask({
                variables: {data: {text:taskInput, completed: false}} ,
                refetchQueries: [{query: TASK_LIST_QUERY }]
            })
            setTaskInput("")
            setShowAddTask(false)
        }
    }


    return (
        <TableRow hover={!showAddTask} onClick={()=>!showAddTask && setShowAddTask(true)}>
            <TableCell padding="checkbox">
                <IconButton color="primary" aria-label="upload picture" component="span" onClick={handleClick}>
                    {showAddTask?<Remove/>:<Add/>}
                </IconButton>
            </TableCell>
            {!showAddTask?
                <TableCell variant='footer'>
                    <Typography color="inherit" variant="subtitle1" component="div">
                        Crear nueva Tarea
                    </Typography>
                </TableCell>
            :
            <>
                <TableCell>
                    <TextField value={taskInput} id="standard-basic" label="Tarea" variant="outlined" size="small" autoFocus onChange={handleOnChange}/>
                </TableCell>
                <TableCell>
                    <Button variant="outlined" color="primary" onClick={handleCreate} >Crear</Button>
                </TableCell>
            </>
            }
        </TableRow>
    )
}

export default CreateTask
