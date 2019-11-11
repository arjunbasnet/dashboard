import React, { Component } from 'react';
import styles from './LunchFeed.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

class LunchFeed extends Component{
    
    state ={
        resturantName: 'Fazer A Block',
        resturantId: '001',
        menus: [
            {
                id:1,
                name: 'Pizza',
                price: '4.00/10.00',
                components: [
                    "Tomato and pesto pizza (A ,L)",
                    "Pulled pork and onion pizza (A ,L)",
                    "Chicken pan pizza with feta (A ,VL ,VS)"        
                ]
            },
            {
                id:2,
                name: "Lunch",
                price: '2.60/8.00',
                components: [
                    "Whole grain organic pasta (* ,A ,L ,M ,Veg)",
                    "Whole grain organic spaghetti (* ,A ,L ,M ,Veg)",
                    "Chicken and cheese sauce (* ,A ,G ,L)",
                    "Tomato and mushroom sauce (* ,A ,L ,M ,Veg ,VS)",
                    "Tomato sauce (* ,A ,L)"
                ]
            }
        ]
    };

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
                            <select id="lunchFeedResturantSelect" className={cx('form-control')}>
                                <option value="fazer-block-a">Fazer Block A</option>
                                <option value="fazer-dipoli">Fazer Dipoli</option>
                                <option value="fazer-dipoli">Acemia</option>
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
                <i className="fa fa-history"></i> Updated 3 minutes ago
                  </div>
            </div>
          </div>
        );
    }    
}

export default LunchFeed