import React, {Component} from 'react';
import TaskForm from './TaskForm';
import cx from 'classnames';
import uncheckImage from '../../assets/images/checkbox-uncheck.svg';
import checkImage from '../../assets/images/checkbox-check.svg';

let DEMO_USER = {
    firstName: "Dummy",
    lastName: "Bindra",
    email: "dum@task-tester.com"
}

class Tasks extends Component {
    state = {
        tasks: [],
        loading: true
    };

    componentDidMount(){
        this.loadUser()
    }

    async loadUser(){
        this.setState({loading: true})

        let response =   await fetch('/api/users?email='+DEMO_USER.email)
        let users = await response.json()
        
        // user with given email not found
        if(!users.length){
            response = await fetch('/api/users',{
                 method:'POST',
                 headers: {
                 'Content-Type': 'application/json'
                 },
                 body:JSON.stringify(DEMO_USER)
            })
            
            let result = await response.json()
            DEMO_USER.id = result.user._id
        }else{
            DEMO_USER.id = users[0]._id
        }

        // load tasks belongin to users
        response = await fetch('/api/tasks?user='+ DEMO_USER.id)
        let result = await response.json()
        if(!result.error){
            this.setState({tasks: result.tasks,loading:false})
        }else{
            this.setState({loading:false})
        }
    }

    listTask(){
        this.setState({loading:true})

        fetch('/api/tasks?user='+ DEMO_USER.id)
        .then(res => res.json())
        .then(res =>{
            this.setState({tasks:res.tasks})
        })
        .finally(()=>{
            this.setState({loading: false})
        })
    }

    async createTask(task){
        this.setState({loading:true})
        let response = await fetch('/api/tasks',{
            method:'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body:JSON.stringify(task)
       })
       
       let result = await response.json()
       this.setState({loading:false})
       return result.task
    }

    updateTask(id,updateData){
        fetch('/api/tasks/'+id,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(updateData)            
        })
        .then(res => res.json())
        .then((result)=>{
            console.log('task updated',result);
        })
    }

    deleteTask(id){
        fetch('/api/tasks/'+id,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }         
        })
        .then(res => res.json())
        .catch(err =>{
            console.log("something went wrong tryin gto delete");
        })
    }

    toggleComplete = todoId => {
        this.setState({
            tasks: this.state.tasks.map(todo => {
                if (todo._id === todoId) todo.completed = !todo.completed;
                return todo;
            })
        });
        let task = this.state.tasks.filter(task =>{ return task._id === todoId})[0]
        this.updateTask(todoId,{completed: task.completed})
    }

    removeTask = todoId => {
        this.setState({
            tasks: this.state.tasks.filter(todo => todo._id !== todoId)
        });

        this.deleteTask(todoId)
    }

    async addTask (desc){
        let task = {
            description: desc,
            completed: false,
            user: DEMO_USER.id
        }
        
        task = await this.createTask(task)

        this.setState((state)=>{
            return {tasks:state.tasks.concat(task)}
        })
    }

    render() {
        return (
            <div className="card" {...this.props} ref={this.props.innerRef}>
                <div className="header">
                    <h4 className="title">Tasks</h4>
                </div>
                <div className="content">
                    <TaskForm addTask={this.addTask.bind(this)} />
                    <form name="todoItemHandler">
                        {this.state.tasks.map(todo => (
                            <div className={cx("todo-item", {completed: todo.completed})} key={todo._id}>
                                <div className="todo-item-wrapper">
                                    <label className={cx("checkbox", {
                                        checked: todo.completed
                                    })}
                                    >
                                    <span className="icons">
                                        <img className="first-icon" src={uncheckImage} width={17}/>
                                        <img className="second-icon" src={checkImage} width={17}/>
                                    </span>
                                        <input type="checkbox" data-toggle="checkbox" checked={todo.completed}
                                               onChange={() => this.toggleComplete(todo._id)}/>
                                    </label>
                                    <div className="todo-content">{todo.description}</div>
                                    <a onClick={() => this.removeTask(todo._id)}>
                                        &times;
                                    </a>
                                </div>
                            </div>
                        ))}
                    </form>
                    {
                        !this.state.tasks.length?(<h4>No Tasks</h4>):""
                    }
                </div>
                <div className="footer">
                    <hr/>
                    <div className="stats">
                        {
                            this.state.loading?"LOADING ...":""
                        }
                    </div>
                </div>
            </div>

        );
    }
}

export default Tasks;