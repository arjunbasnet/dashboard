import React, {Component} from 'react';
import styles from './NewsFeed.scss';
import classNames from 'classnames/bind';
import * as rssParser from 'react-native-rss-parser';


const cx = classNames.bind(styles);
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";


class NewsFeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rssFeedItems: []
        };


    }

    componentDidMount() {
        fetch(CORS_PROXY + 'http://www.nasa.gov/rss/dyn/breaking_news.rss')

            .then((response) => response.text())
            .then((responseData) => rssParser.parse(responseData))
            .then(rss => this.setState({rssFeedItems: rss.items}))
            .catch(error => console.log(error));

    }

    render() {
        const {rssFeedItems} = this.state;
        return (
            <div className="card " {...this.props} ref={this.props.innerRef}>
                <div className="header">
                    <h4 className="title">News Feed</h4>
                </div>
                <div className="content">
                    <div id="NewsFeed">
                        <div className={cx('menu-description')}>

                        <ul>
                            {
                                rssFeedItems.map((item,index) => (

                                    <li className={cx('menu-component')} key={index}>
                                        <a href={item.links[0].url}>{item.title}</a>
                                    </li>
                                ))
                            }
                        </ul>
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <hr/>
                    <div className="stats">
                        <i className="fa fa-history"></i>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewsFeed