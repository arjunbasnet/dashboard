import React, {Component} from 'react';

class TaskForm extends Component{
    constructor(props){
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentDidMount(){
        this.taskDesc.focus()
    }

    onSubmit(event){
        event.preventDefault()
        let description = this.taskDesc.value
        if(description){
            this.props.addTask(description);
            this.form.reset()
        }
    }

    render(){
        return(
            <form ref={el=>(this.form = el)} onSubmit= {this.onSubmit} name="addTaskForm" className="form form-horizontal">
            <div className="form-group">
                <div className="col-md-10">
                    <input ref={el => (this.taskDesc = el)} className="form-control" type="text" placeholder="What do you want to do?"/>
                </div>
                <div className="col-md-2">
                    <button type="submit" className="btn btn-primary btn-fill">ADD</button>
                </div>
            </div>
        </form>  
        )      
    }
}

export default TaskForm