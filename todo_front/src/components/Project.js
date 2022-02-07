import React from 'react'
import {Link} from 'react-router-dom'


const ProjectItem = ({item, deleteProject}) => {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.repo_link}</td>
            <td><button onClick={()=>deleteProject(item.id)} type='button'>Delete</button></td>

        </tr>
    )
}


const ProjectList = ({items, deleteProject}) => {
    return (
        <div>
        <table>
        <tbody>
            <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>REPO_LINK</th>
                <th></th>
            </tr>
            {items.map((item) => <ProjectItem item={item} deleteProject={deleteProject}/>)}
        </tbody>
        </table>
        <Link to='/projects/create'>Create</Link>
        </div>
    )
}

export default ProjectList

