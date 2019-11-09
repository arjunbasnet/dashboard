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
                name: 'Pizza',
                price: '4.00/10.00',
                components: [
                    "Tomato and pesto pizza (A ,L)",
                    "Pulled pork and onion pizza (A ,L)",
                    "Chicken pan pizza with feta (A ,VL ,VS)"        
                ]
            },
            {
                name: "Launch",
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

          <div className="card ">
            <div className="header">
            <h4 className="title">Launch Menu</h4>
              <p className="category">{this.state.resturantName}</p>
            </div>
            <div className="content">
                <div id="LunchFeed">
                {this.state.menus.map(menu => (
                    <div className={cx('LunchFeed__menu')}>
                        <h5 className={cx('menu-title')}>{menu.name}</h5>
                        <div className={cx('menu-description')}>
                            <ul>
                                {
                                    menu.components.map(item =>(
                                        <li className={cx('menu-component')}>{item}</li>  
                                    ))
                                }
                            </ul>
                            <div className="menu-price">
                                <strong>{menu.price}</strong>
                            </div>
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