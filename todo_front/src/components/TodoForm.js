import React from 'react'


class TodoForm extends React.Component {
    constructor(props) {
      super(props)
      this.state = {project: props.projects[0].id, user: '', text:'', status: ''}
    }

    handleChange(event)
    {
        this.setState(
                {
                    [event.target.name]: event.target.value
                }
            );
    }

    handleSubmit(event) {
//      console.log(this.state.project)
//      console.log(this.state.user)
//      console.log(this.state.text)
//      console.log(this.state.status)
      this.props.createTodo(this.state.project, this.state.user, this.state.text, this.state.status)
      event.preventDefault()
    }

    render() {
      return (
        <form onSubmit={(event)=> this.handleSubmit(event)}>

            <div className="form-group">
            <label htmlFor="project">project</label>
                <select name="project" className="form-control" onChange={(event)=>this.handleChange(event)} >
                        {this.props.projects.map((item)=><option value={item.id}>{item.name}</option>)}
                </select>

            </div>

            <div className="form-group">
            <label htmlFor="user">user</label>
                <input type="text" className="form-control" name="user" value={this.state.user} onChange={(event)=>this.handleChange(event)} />
            </div>

            <div className="form-group">
            <label htmlFor="text">text</label>
                <input type="text" className="form-control" name="text" value={this.state.text} onChange={(event)=>this.handleChange(event)} />
            </div>

            <div className="form-group">
            <label htmlFor="status">status</label>
                <input type="text" className="form-control" name="status" value={this.state.status} onChange={(event)=>this.handleChange(event)} />
            </div>


          <input type="submit" className="btn btn-primary" value="Save" />
        </form>
      );
    }
  }

  export default TodoForm