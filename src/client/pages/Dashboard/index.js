import React from 'react';
import SalesChart from './SalesChart';
import Tasks from 'widgets/Task/Tasks';
import LunchFeed from 'widgets/LunchFeed';
import Weather from 'widgets/Weather';
import NewsFeed from 'widgets/NewsFeed';
import StockChart from 'widgets/StockChart';
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {DashboardHelper} from "../../HelperAPI/dashboardHelper";
import {WidgetHelper} from "../../HelperAPI/widgetConfigHelper";

const userId = "5dd5314f2424e65638f4a54c";
const components = {
    saleschart: SalesChart,
    tasks: Tasks,
    lunchfeed: LunchFeed,
    weather: Weather,
    newsfeed: NewsFeed,
    stockchart: StockChart
};
/*DashboardHelper.getDashboardConfigByUserId(userId).then((res)=>{
    res.dash[0].arrangement.forEach((value,key)=> {
        WidgetHelper.getWidgetById(value.widgetId).then((res)=>setComponents(res.widget.name));
    });

});
const setComponents = (component) =>{
  components[component.toLowerCase()]=eval[component];
    console.log(components);
};*/

const getItems = (countRow, offset = 0) => {

    let items = Array.from({length: countRow}, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        content: ''

    }));
    if (offset === 0) {
        items[0].content = 'SalesChart';
        items[1].content = 'Tasks';
    } else if (offset === 2) {
        items[0].content = 'LunchFeed';
        items[1].content = 'LunchFeed';
    } else if(offset===4){
        items[0].content = 'NewsFeed';
        items[1].content = 'StockChart';
    }


    return items;
};

const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);
    const [removed2] = destClone.splice(droppableDestination.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);
    sourceClone.splice(droppableSource.index, 0, removed2);
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
    state = {items: []};
    async widgetState(){
        await this.generateList()
            .then((items)=>{
                this.setState({ items: items }, () => console.log(this.state))
            })
    }
    async generateList(){
        let response = DashboardHelper.getDashboardConfigByUserId(userId);
        let data = await response;
        data=data.dash;
        let items = [];
        let row;
        let value;
        let arrangement = data[0].arrangement;
        arrangement.sort(function(a,b){return a["column"] - b["column"]});
        arrangement.sort(function(a,b){ return a["row"] - b["row"]});
        for(let i=0;i< arrangement.length;i++){
            value = arrangement[i];
            if(value['column']===0){
                if(value['row']!==0){
                    items[value['row']-1]=row;
                }
                row = [];
            }
            let widgetName = await WidgetHelper.getWidgetById(value.widgetId).then((res)=> {return res.widget.name});
            row[value["column"]] = {
                id: value["_id"],
                content: widgetName
            };
        }
        items[value['row']]=row;
        return items;

    }

    id2List = {
        drop1: '0',
        drop2: '1',
        drop3: '2'
    };
    /*generateid2List(){

    }*/

    getList = id => this.state.items[this.id2List[id]];
    componentDidMount() {
        //UNCOMMENT WHEN USING DATABASE
       //this.widgetState();
    }

    constructor(props) {
        super(props);
       for(let i=0;i<=2;i++){
            this.state.items[i]=getItems(2, i*2);
        }

        this.onDragEnd = this.onDragEnd.bind(this);

    }
    onDragEnd = result => {
        const {source, destination} = result;
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

            if (source.droppableId === 'drop2') {
                this.state.items[1]= items;
            } else if (source.droppableId === 'drop1') {
                this.state.items[0]= items;
            } else if (source.droppableId === 'drop3') {
                this.state.items[2]= items;
            }
        } else {
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );
            if(result.drop1!==null && typeof result.drop1!=="undefined"){
                this.state.items[0]=result.drop1;
            }
            if(result.drop2!==null && typeof result.drop2!=="undefined") {
                this.state.items[1]=result.drop2;
            }
            if(result.drop3!==null && typeof result.drop3!=="undefined") {
                this.state.items[2]=result.drop3;
            }
        }
    };

    render() {
        //const {items0, items1,items2} = this.state;
        const {items} = this.state;
        //console.log(this.state);
        return (

            <DragDropContext onDragEnd={this.onDragEnd}>
                <div className="content" id="widgetContainer">
                    <div className="container-fluid">

                        <Droppable droppableId="drop1">
                            {(provided, snapshot) => (
                                <div className="row" ref={provided.innerRef}  {...provided.droppableProps}>

                                    {items[0].map((item, index) => (
                                        <div className="col-md-6">
                                            <Draggable key={item.id}
                                                       draggableId={item.id}
                                                       index={index}>

                                                {(provided, snapshot) => (

                                                    <Widget widgetType={item.content}
                                                            innerRef={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}/>


                                                )}

                                            </Draggable>


                                        </div>
                                    ))}

                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                        < Droppable droppableId="drop2">
                            {(provided, snapshot) => (
                                <div className="row" ref={provided.innerRef}  {...provided.droppableProps}>
                                    {items[1].map((item, index) => (
                                        <div className="col-md-6">
                                            <Draggable key={item.id} draggableId={item.id}
                                                       index={index}>

                                                {(provided, snapshot) => (

                                                    <Widget widgetType={item.content}
                                                            innerRef={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}/>


                                                )}

                                            </Draggable>
                                        </div>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                        <Droppable droppableId="drop3">
                            {(provided, snapshot) => (
                                <div className="row" ref={provided.innerRef}  {...provided.droppableProps}>
                                    {items[2].map((item, index) => (
                                        <div className="col-md-6">
                                            <Draggable key={item.id}
                                                       draggableId={item.id}
                                                       index={index}>

                                                {(provided, snapshot) => (

                                                    <Widget widgetType={item.content}
                                                            innerRef={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}/>


                                                )}

                                            </Draggable>


                                        </div>
                                    ))}

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