import React from 'react'
import { Switch, Route } from 'react-router-dom';
import { Cart } from '../pages/cart/Cart';
import { Home } from '../pages/home/Home';
import { Login } from '../pages/login/Login';
import LayoutRoute from './LayoutRoute';

export const Routes = () => {
    return (
      
        <Switch>
            <Route path="/login" component={Login} />
            <LayoutRoute isPrivate path="/" exact component={Home} />
            <LayoutRoute isPrivate path="/cart" component={Cart} />
        </Switch>
    
    );
}



