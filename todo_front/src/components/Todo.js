import React from 'react'


const TodoItem = ({item}) => {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.project}</td>
            <td>{item.user}</td>
            <td>{item.text}</td>
            <td>{item.status}</td>
            <td>{item.created_at}</td>
            <td>{item.updated_at}</td>
        </tr>
    )
}


const TodoList = ({items}) => {
    return (
        <table>
        <tbody>
            <tr>
                <th>ID</th>
                <th>PROJECT</th>
                <th>USER</th>
                <th>TEXT</th>
                <th>STATUS</th>
                <th>CREATED_AT</th>
                <th>UPDATED_AT</th>
            </tr>
            {items.map((item) => <TodoItem item={item} />)}
        </tbody>
        </table>
    )
}

export default TodoList

