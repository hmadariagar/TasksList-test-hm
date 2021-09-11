import { useState } from 'react'
import { Checkbox, TableCell, TableRow, TextField, IconButton, Typography } from '@material-ui/core'
import { Delete, Edit, Close } from '@material-ui/icons'
import {useMutation} from "react-apollo";
import { DELETE_TODO_MUTATION, TASK_LIST_QUERY, UPDATE_TODO_MUTATION, TOGGLE_TODO_MUTATION } from '../services/services';

const ItemCrud = ({task}) => {

    const {id, text, completed} = task
    const [isSelected, setIsSelected] = useState(completed)
    const [textTask, setTextTask] = useState(text)
    const [edit, setEdit] = useState(false)
    const styleFont = {textDecoration:isSelected && !edit?"line-through":"none", justifyContent:"center"}

    const handleOnChangeText = (e) => {
        const {value} = e.target
        setTextTask(value) 
    }

    //Función para actualiza la Tarea
    const [editTask] = useMutation(UPDATE_TODO_MUTATION);
    const handleEditTask = (value) => {
        if(value){
            editTask({
                variables: { id, text:textTask, completed:false},
                refetchQueries: [{query: TASK_LIST_QUERY }]
            })
        }else{
            setTextTask(text) 
        }
        setEdit(false)
    }

    //Función que actualiza si la tarea "esta compleada" o "por realizar"
    const [editToggle] = useMutation(TOGGLE_TODO_MUTATION);
    const handleOnChangeCheckBox = (e) => {
        const {checked} = e.target
        setIsSelected(checked)

        editToggle({
            variables: { id, completed:checked },
            refetchQueries: [{ query: TASK_LIST_QUERY }]
        })

    }

    //Funcion para eliminar la Tarea seleccionada
    const [deleteTask] = useMutation(DELETE_TODO_MUTATION);
    const handleDelete = () => {
        deleteTask({
            variables: { id },
            refetchQueries: [{query: TASK_LIST_QUERY }]
        })
    }


    return (
        <TableRow 
            // selected={isSelected} 
            hover>
            <TableCell padding="checkbox">
                <Checkbox
                    value="Task Completed"
                    inputProps={{ 'aria-label': 'Task Completed' }}
                    checked={isSelected}
                    onChange={handleOnChangeCheckBox}
                    // onClick={() => onToggle()}
                />
            </TableCell>
            <TableCell style={styleFont}>
                {edit?
                    <>
                    <TextField autoFocus id="standard-basic" label="Tarea" variant="outlined" onChange={handleOnChangeText}/>
                    <IconButton style={{color:"#ff8100"}} color="primary"  aria-label="actions" component="span" onClick={()=>handleEditTask(true)}>
                        <Edit/>
                    </IconButton>
                    <IconButton color="primary"  aria-label="actions" component="span" onClick={()=>handleEditTask(false)}>
                        <Close/>
                    </IconButton>
                    </>
                :
                <Typography onClick={() =>setEdit(true)} color="inherit" variant="subtitle1" component="div">
                    {textTask}
                </Typography>
                
                }
            </TableCell>
            {/* <TableCell style={styleFont}>{textTask}</TableCell> */}
            <TableCell>{isSelected?"Completada ✔":"Por Realizar"}</TableCell>
            <TableCell>

                <IconButton color="secondary" aria-label="actions" component="span" onClick={handleDelete}>
                    <Delete/>
                </IconButton>
            </TableCell>
        </TableRow>
    )
}

export default ItemCrud
