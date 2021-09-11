    import gql from "graphql-tag";

    //Obtener lista de Tareas
    export const TASK_LIST_QUERY = gql`
        query TaskList {
            todosList(orderBy: [completed_ASC, createdAt_ASC]) {
            items {
                id
                text
                completed
            }
            }
        }
    `;


    //Crear tarea
    export const CREATE_TODO_MUTATION = gql`
        mutation TodoCreate($data: TodoCreateInput!) {
            todoCreate(data: $data) {
            id
            text
            completed
            }
        }
    `;
    
    //Update task
    export const UPDATE_TODO_MUTATION = gql`
        mutation TodoUpdate($id: ID!, $text: String!, $completed: Boolean!) {
            todoUpdate(filter: { id: $id }, data: { text: $text, completed: $completed }) {
            id
            text
            completed
            }
        }
    `;

    //Update Toggle checkTask
    export const TOGGLE_TODO_MUTATION = gql`
        mutation TodoToggle($id: ID!, $completed: Boolean!) {
            todoUpdate(filter: { id: $id }, data: { completed: $completed }) {
            id
            text
            completed
            }
        }
    `;

    //Eliminar tarea
    export const DELETE_TODO_MUTATION = gql`
        mutation TodoDelete($id: ID!) {
            todoDelete(filter: { id: $id }) {
            success
            }
        }
    `;
