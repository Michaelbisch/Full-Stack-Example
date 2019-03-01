import React, {Component} from 'react'
import './Private.css';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateUser,clearUser} from './../../ducks/reducer'

class Private extends Component {
    // constructor(props){
    //     super(props);

    //     this.state={
    //         username:'afdsfsd',
    //         img:'afderagafd',
    //         balance:0
    //     }
    // }

    componentDidMount(){
        this.getUser();
    }

    getUser=async ()=>{
        //what he does is check for every user in db but we can ask redux instead

        const{id} = this.props;
        if(!id) {
            try {
                let res = await axios.get('/api/current');
                // console.log(res);
                //if we are getting something back, we want to set that to this.state
                // const {username,balance} = res.data;
                // const img = res.data.user_img; 
                // //because of our backend
                // this.setState({
                //     username,
                //     img,
                //     balance
                // }) 
                //we deleted the reduxState
    
                this.props.updateUser(res.data)
            } catch(err){
                this.props.history.push('/') //meant to redirect somebody who is not on session
            }
        }
    };

    logout = async () => {
        await axios.post('/auth/logout'); //don't need to store it in a variable because nothing is coming back
        this.props.clearUser(); //invoke the function
        this.props.history.push('/'); //redirect to home page
    };
    
    render() {
        const {username,img,balance} = this.props; //replaced this.state with this.props
        return(
            <div>
                <button onClick={this.logout}>Logout</button>
                <h1>{username}</h1>
                <img src={img} alt="user"/>
                <p>{balance}</p>
            </div>
        )
    }

}

const mapStateToProps = reduxState => {
    return reduxState
    //we want all of it because we should be displaying/using all of it
}

const mapDispatchToProps = {
    updateUser,
    clearUser
}

export default connect(mapStateToProps,mapDispatchToProps)(Private);