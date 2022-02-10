import React from 'react'
import {Link} from 'react-router-dom'

const TodoItem = ({item, deleteTodo}) => {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.project}</td>
            <td>{item.user}</td>
            <td>{item.text}</td>
            <td>{item.status}</td>
            <td><button onClick={()=>deleteTodo(item.id)} type='button'>Delete</button></td>
        </tr>
    )
}


const TodoList = ({items, deleteTodo}) => {
    return (
        <div>
        <table>
        <tbody>
            <tr>
                <th>ID</th>
                <th>PROJECT</th>
                <th>USER</th>
                <th>TEXT</th>
                <th>STATUS</th>
                <th></th>

            </tr>
            {items.map((item) => <TodoItem item={item} deleteTodo={deleteTodo} />)}
        </tbody>
        </table>
        <Link to='/todo/create'>Create</Link>
        </div>

    )
}

export default TodoList

