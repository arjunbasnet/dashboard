import React, { Component } from 'react';
import styles from './LunchFeed.scss';
import classNames from 'classnames/bind';
const proxy = require("../../HelperAPI/proxyHelper");

const cx = classNames.bind(styles);

class LunchFeed extends Component{
    
    state ={
        loading:true,
        resturant:'a-bloc',
        menus:[],
    }

    componentDidMount(){
        this.fetchMenus(this.state.resturant)
    }

    onChange = (event)=>{
        let resturant = event.target.value;
        this.setState({resturant:resturant});
        this.fetchMenus(resturant)
    }
    
    fetchMenus(resturant){
        this.setState({loading:true})

        fetch(proxy+'/api/lunch/'+ resturant)
        .then(res => res.json())
        .then(res =>{
            this.setState({menus:res.menus})
        })
        .finally(()=>{
            this.setState({loading: false})
        })
    }

    render() {
        return (

          <div className="card " {...this.props} ref={this.props.innerRef}>
            <div className="header">
                <h4 className="title">Lunch Menu</h4>
            </div>
            <div className="content">
                <div id="LunchFeed">
                    
                    <form name="lunchFeedForm" className="form-inline LunchFeed__form">
                        <div className={cx('form-group')}>
                            <label htmlFor="lunchFeedResturantSelect" className="control-label">Resturant</label>
                            <select id="lunchFeedResturantSelect" className={cx('form-control')}
                                onChange={this.onChange}
                                value={this.state.resturant}>
                                <option value="a-bloc">Fazer A Bloc</option>
                                <option value="arvo">Sodexo Arvo</option>
                                <option value="alvari">Alvari Amica</option>
                                <option value="tietokoniikantalo">Sodexo CS Building</option>
                            </select>
                        </div>                        
                    </form>

                {this.state.menus.map(menu => (
                    <div className={cx('LunchFeed__menu')} key={menu.id}>
                        <div className={cx('LunchFeed__header','clearfix')}>
                            <h5 className={cx('menu-title','pull-left')}>{menu.name}</h5>
                            <span className={cx('menu-price','pull-right')}><strong>€ {menu.price}</strong></span>
                        </div>
                        <div className={cx('menu-description')}>
                            <ul>
                                {
                                    menu.components.map((item,indx)=>(
                                        <li className={cx('menu-component')} key={indx}>
                                            {item}
                                        </li>  
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                ))}
                </div>
            </div>
            <div className="footer">
              <hr />
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

export default LunchFeed