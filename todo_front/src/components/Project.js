import React from 'react'


const ProjectItem = ({item}) => {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.repo_link}</td>
        </tr>
    )
}


const ProjectList = ({items}) => {
    return (
        <table>
        <tbody>
            <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>REPO_LINK</th>
            </tr>
            {items.map((item) => <ProjectItem item={item} />)}
        </tbody>
        </table>
    )
}

export default ProjectList

