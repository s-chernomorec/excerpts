import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import RenderPage from './RenderPage';
import About from './pages/About';
import Category from './pages/Category';
import Latest from './pages/Latest';
import SearchPage from './pages/SearchPage';
import Favourites from './pages/Favourites';
import NoMatch from './pages/NoMatch';

const Router = props => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => (RenderPage(Latest, props))}/>
        <Route path="/about" render={() => (RenderPage(About, props))}/>
        <Route path="/category/:name" render={(routeProps) => (RenderPage(Category, props, routeProps))}/>
        <Route path="/favourites" render={(routeProps) => (RenderPage(Favourites, props, routeProps))}/>
        <Route path="/search" render={(routeProps) => (RenderPage(SearchPage, props, routeProps))}/>
        <Route component={NoMatch}/>
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
