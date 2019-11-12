import React from 'react';
import SalesChart from './SalesChart';
import Tasks from './Tasks';
import LunchFeed from 'widgets/LunchFeed';
import Weather from 'widgets/Weather';
import {Draggable, Droppable, DragDropContext} from "react-beautiful-dnd";

const components = {
    saleschart: SalesChart,
    tasks: Tasks,
    lunchfeed: LunchFeed,
    weather: Weather
};

const getItems = (countRow,offset=0) => {

    let items = Array.from({length: countRow }, (v, k) => k).map(k => ({
        id: `item-${k+ offset}`,
        content: ''

    }));
    if(offset===0){
        items[0].content = 'SalesChart';
        items[1].content = 'Tasks';
    } else if(offset===2){
        items[0].content = 'LunchFeed';
        items[1].content = 'Weather';
    }


    return items;
};

const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    const [removed2] = destClone.splice(droppableDestination.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);
    sourceClone.splice(droppableSource.index,0, removed2);
    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};


function Widget(props) {
    const WidgetRenderer = components[props.widgetType.toLowerCase()];
    return <WidgetRenderer {...props} innerRef={props.innerRef}/>;
}

class Dashboard extends React.Component {
    id2List = {
        drop1: 'items0',
        drop2: 'items1'
    };

    getList = id => this.state[this.id2List[id]];
    constructor(props) {
        super(props);
        this.state = {
            items0: getItems(2,0),
            items1: getItems(2,2),
        };

        this.onDragEnd = this.onDragEnd.bind(this);
    }

    onDragEnd = result => {
        const { source, destination } = result;
       // console.log(result);
        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

            let state;

            if (source.droppableId === 'drop2') {
                state = { items1: items };
            } else if(source.droppableId === 'drop1'){
                state = { items0: items };
            }
           // console.log(state);
            this.setState(state);
        } else {
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );

            this.setState({
                items0: result.drop1,
                items1: result.drop2
            });
        }
    };

    render() {
        return (

            <DragDropContext onDragEnd={this.onDragEnd}>

                <div className="content">
                    <div className="container-fluid">

                        <Droppable droppableId="drop1">
                            {(provided, snapshot) => (
                                <div className="row" ref={provided.innerRef}  {...provided.droppableProps}>
                                    <div className="col-md-6">
                                        <Draggable key={this.state.items0[0].id} draggableId={this.state.items0[0].id}
                                                   index={0}>

                                            {(provided, snapshot) => (

                                                <Widget widgetType={this.state.items0[0].content}
                                                        innerRef={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}/>


                                            )}

                                        </Draggable>
                                    </div>
                                    <div className="col-md-6">
                                        <Draggable key={this.state.items0[1].id} draggableId={this.state.items0[1].id}
                                                   index={1}>

                                            {(provided, snapshot) => (

                                                <Widget widgetType={this.state.items0[1].content}
                                                        innerRef={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}/>


                                            )}

                                        </Draggable>
                                    </div>
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                        <Droppable droppableId="drop2">
                            {(provided, snapshot) => (
                                <div className="row" ref={provided.innerRef}  {...provided.droppableProps}>
                                    <div className="col-md-6">
                                        <Draggable key={this.state.items1[0].id} draggableId={this.state.items1[0].id}
                                                   index={0}>

                                            {(provided, snapshot) => (

                                                <Widget widgetType={this.state.items1[0].content}
                                                        innerRef={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}/>


                                            )}

                                        </Draggable>
                                    </div>
                                    <div className="col-md-6">
                                        <Draggable key={this.state.items1[1].id} draggableId={this.state.items1[1].id}
                                                   index={1}>

                                            {(provided, snapshot) => (

                                                <Widget widgetType={this.state.items1[1].content}
                                                        innerRef={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}/>

                                            )}

                                        </Draggable>
                                    </div>
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>

                </div>

            </DragDropContext>
        )
    }
}

export default Dashboard;