import React, {Component} from 'react';
import {connect} from 'react-redux';
import {UserHelper} from "../../HelperAPI/userHelper";

class UserInfo extends Component {

    state = {
        isShowingUserMenu: false,
        user: ""
    };

    componentDidMount() {
        let user = this.props.user;
        UserHelper.getUserById(this.props.user.id).then((res) => {
                user.name = res.user.firstName + " " + res.user.lastName;
                this.setState({user: user});
            }
        );
    }

    render() {
        let {user} = this.state;
        return (
            <div className="user-wrapper">
                <div className="user">
                    <img src={user.image} alt={user.name} className="photo"/>
                    <div className="userinfo">
                        <div className="username">
                            {user.name}
                        </div>
                        <div className="title">Admin</div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.Auth.user
});

export default connect(mapStateToProps)(UserInfo);