export const add_todo =(id,text) => (
    {   
        type : 'ADD_TODO',
        payload : {id:id, text:text},
    }
)

export const remove_todo = (id) => (
    {
        type : 'REMOVE_TODO',
        payload : id,

    }
)