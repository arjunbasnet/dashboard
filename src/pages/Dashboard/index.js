import React from 'react';
import SalesChart from './SalesChart';
import Tasks from './Tasks';
import LunchFeed from 'widgets/LunchFeed';
import Weather from 'widgets/Weather';
import {Draggable, Droppable, DragDropContext} from "react-beautiful-dnd";


const getItems = count => {
    let items = Array.from({length: count}, (v, k) => k).map(k => ({
        id: `item-${k}`,
        content: ''
    }));
    items[0].content = 'SalesChart';
    items[1].content = 'Tasks';
    items[2].content = 'LunchFeed';
    items[3].content = 'Weather';
    return items;
};


const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};
const components = {
    saleschart: SalesChart,
    tasks: Tasks,
    lunchfeed: LunchFeed,
    weather: Weather
};

function Widget(props){
    const WidgetRenderer = components[props.widgetType.toLowerCase()];
    console.log(props.widgetType.toLowerCase());
    return <WidgetRenderer {...props} innerRef={props.innerRef} />;
}

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: getItems(4),
        };
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    onDragEnd(result) {
        const {destination, source, draggableId} = result;

        console.log(result);
        console.log(this.state.items);
        if (!destination) {
            return;
        }
        const items = reorder(
            this.state.items,
            result.source.index,
            result.destination.index
        );

        this.setState({
            items,
        });
    }

    render() {
        return (

            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="drop1">
                    {(provided, snapshot) => (
                        <div className="content" ref={provided.innerRef}  {...provided.droppableProps}>
                            <div className="container-fluid">


                                <div className="row">

                                        <Draggable key={this.state.items[0].id} draggableId={this.state.items[0].id}
                                                   index={0}>

                                            {(provided, snapshot) => (
                                                <div className="col-md-6">
                                                    <Widget widgetType={this.state.items[0].content} innerRef={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}/>
                                                </div>

                                            )}

                                        </Draggable>


                                    <Draggable key={this.state.items[1].id} draggableId={this.state.items[1].id}
                                               index={1}>

                                        {(provided, snapshot) => (
                                            <div className="col-md-6">
                                                <Widget widgetType={this.state.items[1].content} innerRef={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}/>

                                            </div>

                                        )}

                                    </Draggable>


                                </div>

                                <div className="row">

                                    <Draggable key={this.state.items[2].id} draggableId={this.state.items[2].id}
                                               index={2}>

                                        {(provided, snapshot) => (
                                            <div className="col-md-6">
                                                <Widget widgetType={this.state.items[2].content} innerRef={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}/>
                                            </div>

                                        )}

                                    </Draggable>
                                    <Draggable key={this.state.items[3].id} draggableId={this.state.items[3].id}
                                               index={3}>

                                        {(provided, snapshot) => (
                                            <div className="col-md-6">
                                                <Widget widgetType={this.state.items[3].content} innerRef={provided.innerRef}
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