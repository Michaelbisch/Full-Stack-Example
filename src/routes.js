import {Switch, Route} from 'react-router-dom';
import Login from './components/login/Login';
import Private from './components/private/Private';
import React, {Component} from 'react';

export default (
    <Switch>
        <Route path="/private" component={Private}/>
        <Route exact path="/" component={Login}/>
    </Switch>
) 

//route will always have two things (path and component/render)
//react imported allows us to use JSX
//Switch allows us to be able to switch between routes, it will only go through the routes...put the longest url at the top to avoid having to use exact. Once it finds something it will not continue looking. 