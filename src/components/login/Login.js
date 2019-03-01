import React, {Component} from 'react';
import './Login.css';
import axios from 'axios';
import {connect} from 'react-redux';
import { updateUser } from "./../../ducks/reducer";

class Login extends Component {
    constructor(){
        super();

        this.state = {
            username:'',
            password:''
        }

        this.register=this.register.bind(this);

    }

    componentDidMount(){
        this.checkUser();
    }
    
    checkUser = async () => {//check to see if this user is still on session
        const {id} = this.props;
        if(!id){ 
            try {
                let res = await axios.get('/api/current');
                // console.log(res); //if we are getting something back, we want to set that to this.state
                // const {username,balance} = res.data;
                // const img = res.data.user_img; //because of our backend
                // this.setState({
                //     username,
                //     img,
                //     balance
                // }) 
                //we deleted the reduxState?????
    
                this.props.updateUser(res.data)
                this.props.history.push('/private') //redirects the user to the private page
            } catch(err){
                //It would just send us an error 401 and because we are already on the page we stay there when it mounts.
            }
            
        } else {
            this.props.history.push('/private')
            //is there an id on redux, if there is then push them on private page. if there is not then 
        }
        
    } //if we have a user.id from redux state, then it would redirect us and if not it would check with the server to see if user lives on req.session and if so return the user and redirect the page. 
    
    handleChange(prop,val){
        this.setState({
            [prop]:val
        })
    }

    //we need to put the one on the left in brackets so that we can tell it we are using a variable


    async register(){
        let user = {
            username: this.state.username,
            password: this.state.password
        }
        try {
            let res = await axios.post('/auth/register', user) // this should equal either the 409 status code || the status 200 & req.session.user 
            // console.log(res); 
            this.props.updateUser(res.data) //the session id is what we 
            
            this.props.history.push('/private') //this is a redirect method - it's accessible because of Router (higher order component that gives any wrapped component these three properties: match, history, and location)
        } catch(err){ //if it returns back an error status then you will alert the following message.
            alert('Choose a unique username') 
        }
           
    }

    login = async () => {
        let user = {
            username:this.state.username,
            password:this.state.password
        }
        try {
            let res = await axios.post('/auth/login',user);
            this.props.updateUser(res.data)
            //if you don't know what res is console.log it. 
            this.props.history.push('/private') //redirect them to the private page if they are still in the try
            console.log(res) 
        } catch(err) { //return the alert if they aren't able to log in
            alert('Incorrect username or password')
        }
    }

    

    render() {
        const {username,password} = this.state;
        return(
            <div>
                <input type='text' value={username} onChange={e=>this.handleChange('username',e.target.value)}/>
                <input type='password' value={password} onChange={e=>this.handleChange('password',e.target.value)}/>
                <button onClick={this.register}>Register</button>
                <button onClick={this.login}>Login</button>
            </div>
        )
    }

}

const mapStateToProps = (reduxState) => {
    return {
        id:reduxState.id //we use this for the this.checkUser
    }

//this object is what I want you to pull off of redux, reduxstate is just a parameter and can be named whatever     
}

const mapDispatchToProps = {
//where the actions are passed instead of on the bottom
    updateUser
}



export default connect(mapStateToProps,mapDispatchToProps)(Login);

//three ways to bind: bind it at the top, wrap in arrow in the function itself or down in the arrow function when it is invoked