import React from 'react';
import SalesChart from './SalesChart';
import Tasks from './Tasks';
import LunchFeed from 'widgets/LunchFeed';
import Weather from 'widgets/Weather';
import {Draggable, Droppable, DragDropContext} from "react-beautiful-dnd";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    onDragEnd(result) {
        const {destination, source, draggableId} = result;
        console.log(result);
        if (!destination) {
            return;
        }

    }

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd} direction={"horizontal"}>
                <Droppable droppableId="drop1">
                    {(provided, snapshot) => (
                        <div className="content" ref={provided.innerRef}  {...provided.droppableProps}>
                            <div className="container-fluid">


                                <div className="row">

                                    <Draggable key={1} draggableId={1} index={1}>

                                        {(provided, snapshot) => (
                                            <div className="col-md-6">
                                                <SalesChart innerRef={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}/>
                                            </div>
                                        )}

                                    </Draggable>

                                    <Draggable key={2} draggableId={2} index={2}>

                                        {(provided, snapshot) => (
                                            <div className="col-md-6">
                                                <Tasks innerRef={provided.innerRef}
                                                       {...provided.draggableProps}
                                                       {...provided.dragHandleProps}/>
                                            </div>

                                        )}

                                    </Draggable>


                                </div>

                                <div className="row">

                                    <Draggable key={3} draggableId={3} index={3}>

                                        {(provided, snapshot) => (
                                            <div className="col-md-6">
                                                <LunchFeed innerRef={provided.innerRef}
                                                           {...provided.draggableProps}
                                                           {...provided.dragHandleProps}/>
                                            </div>

                                        )}

                                    </Draggable>
                                    <Draggable key={4} draggableId={4} index={4}>

                                        {(provided, snapshot) => (
                                            <div className="col-md-6">
                                                <Weather innerRef={provided.innerRef}
                                                         {...provided.draggableProps}
                                                         {...provided.dragHandleProps}/>
                                            </div>
                                        )}

                                    </Draggable>

                                </div>
                            </div>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        )
    }
}

export default Dashboard;