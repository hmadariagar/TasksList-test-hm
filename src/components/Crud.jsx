import {Container, TableContainer, Table, TableHead, TableCell, TableBody, TableRow, Typography, Box} from '@material-ui/core';
import { useEffect, useState } from 'react';
import ItemCrud from './ItemCrud';
import CreateTask from './CreateTask';
import {useQuery } from "react-apollo";
import { TASK_LIST_QUERY } from '../services/services';

const Crud = () => {

    const [arrayTasks, setArrayTasks] = useState([]) 
    const arrayHead = ["Tareas", "Status", "Acción"] 

    //obtencion de todas las tareas
    const {data} = useQuery(TASK_LIST_QUERY)

    //si existe data actualiza estado del array de Tareas
    useEffect(() => {
        if(data)setArrayTasks(data.todosList.items)
    }, [data])

    return (
        <Container maxWidth="md">
            <Box component="span" m={1}>
                <Typography color="primary" variant="h3">
                    Lista de Tareas
                </Typography>
            </Box>

            <TableContainer>
                <Table>
                    <TableHead >
                        <TableRow>
                            <TableCell padding="checkbox"/>
                            {
                                arrayHead.map((item) =>{
                                    return( 
                                        <TableCell key={item}>
                                            <Typography 
                                                variant="button" 
                                                color="primary"
                                            >
                                                {item}
                                            </Typography>
                                        </TableCell>
                                    )
                                })  
                            }
                           
                        </TableRow>
                    </TableHead>
                    
                    <TableBody>

                        {arrayTasks.length > 0 &&
                            arrayTasks.map((task, index)=>{
                                return(
                                    <ItemCrud 
                                        key={task.id}
                                        task={task} 
                                        
                                    />
                                )
                            })
                        }
                        
                        <CreateTask 
                            setArrayTasks={setArrayTasks}
                        />
                        
                    
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}

export default Crud
