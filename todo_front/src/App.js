import React from 'react'
import UserList from './components/User.js'
import ProjectList from './components/Project.js'
import TodoList from './components/Todo.js'
import LoginForm from './components/Auth.js'
import ProjectForm from './components/ProjectForm.js'
import TodoForm from './components/TodoForm.js'
import {BrowserRouter, Route, Switch, Redirect, Link} from 'react-router-dom'
import axios from 'axios'
import Cookies from 'universal-cookie';


const NotFound404 = ({ location }) => {
  return (
    <div>
        <h1>Страница по адресу '{location.pathname}' не найдена</h1>
    </div>
  )
}


class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      'users': [],
      'projects': [],
      'todo': [],
      'token': ''
    }
  }

  set_token(token) {
    const cookies = new Cookies()
    cookies.set('token', token)
    this.setState({'token': token}, ()=>this.load_data())
  }

  is_authenticated() {
    return this.state.token != ''
  }

  logout() {
    this.set_token('')
  }

  get_token_from_storage() {
    const cookies = new Cookies()
    const token = cookies.get('token')
    this.setState({'token': token}, ()=>this.load_data())
  }

  get_token(username, password) {
    axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
    .then(response => {
        this.set_token(response.data['token'])
    }).catch(error => alert('РќРµРІРµСЂРЅС‹Р№ Р»РѕРіРёРЅ РёР»Рё РїР°СЂРѕР»СЊ'))
  }

  get_headers() {
    let headers = {
      'Content-Type': 'application/json'
    }
  if (this.is_authenticated())
    {
        headers['Authorization'] = 'Token ' + this.state.token
    }
    return headers
  }

   deleteProject(id) {
    const headers = this.get_headers()
    axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers, headers})
        .then(response => {
          this.setState({projects: this.state.projects.filter((item)=>item.id !== id)})
        }).catch(error => console.log(error))
  }

   deleteTodo(id) {
     const headers = this.get_headers()
     axios.delete(`http://127.0.0.1:8000/api/todo/${id}`, {headers, headers})
         .then(response => {
           this.setState({todo: this.state.todo.filter((item)=>item.id !== id)})
         }).catch(error => console.log(error))
  }


   createProject(name, repo_link) {
    const headers = this.get_headers()
    const data = {name: name, repo_link: repo_link}
    axios.post(`http://127.0.0.1:8000/api/projects/`, data, {headers, headers})
        .then(response => {
          let new_project = response.data


          this.setState({projects: [...this.state.projects, new_project]})
        }).catch(error => console.log(error))
  }

   createTodo(project, user, text, status) {
     const headers = this.get_headers()
     const data = {project: project, user: user, text: text, status: status}
     axios.post(`http://127.0.0.1:8000/api/todo/`, data, {headers, headers})
         .then(response => {
             let new_todo = response.data
             console.log(new_todo)

           this.setState({todo: [...this.state.todo, new_todo]})
         }).catch(error => console.log(error))
  }




  load_data() {

    const headers = this.get_headers()
    axios.get('http://127.0.0.1:8000/api/users/', {headers})
        .then(response => {
            this.setState({users: response.data.results})
        }).catch(error => console.log(error))


    axios.get('http://127.0.0.1:8000/api/projects/', {headers})
        .then(response => {
            this.setState({projects: response.data.results})
        }).catch(error => {
          console.log(error)
          this.setState({projects: []})
        })

     axios.get('http://127.0.0.1:8000/api/todo/', {headers})
        .then(response => {
            this.setState({todo: response.data.results})
        }).catch(error => {
          console.log(error)
          this.setState({todo: []})
        })
  }

  componentDidMount() {
    this.get_token_from_storage()
  }

  render() {
    return (
        <div className="App">
          <BrowserRouter>
            <nav>
              <ul>
                <li>
                  <Link to='/'>Users</Link>
                </li>
                <li>
                  <Link to='/projects'>Projects</Link>
                </li>
                <li>
                  <Link to='/todo'>Todo</Link>
                </li>
                <li>
                    {this.is_authenticated() ? <button onClick={()=>this.logout()}>Logout</button> : <Link to='/login'>Login</Link>}
                </li>
              </ul>
            </nav>
            <Switch>
              <Route exact path='/' component={() => <UserList items={this.state.users} />}  />
              <Route exact path='/projects' component={() => <ProjectList items={this.state.projects} deleteProject={(id)=>this.deleteProject(id)} />} />
              <Route exact path='/projects/create' component={() => <ProjectForm createProject={(name, repo_link) => this.createProject(name, repo_link)}/>}  />
              <Route exact path='/todo' component={() => <TodoList items={this.state.todo} deleteTodo={(id)=>this.deleteTodo(id)} />} />
              <Route exact path='/todo/create' component={() => <TodoForm projects={this.state.projects} createTodo={(project, user, text, status) => this.createTodo(project, user, text, status)} />}  />
              <Route exact path='/login' component={() => <LoginForm get_token={(username, password) => this.get_token(username, password)} />} />

              <Redirect from='/users' to='/' />
              <Route component={NotFound404} />
            </Switch>
          </BrowserRouter>
        </div>
    )
  }
}

export default App