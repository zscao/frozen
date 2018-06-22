import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import ListProject from './components/ListProject';
import ViewProject from './components/ViewProject';
import CreateProject from './components/CreateProject';
import Error from './components/Error';

export default () => (
  <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/counter' component={Counter} />
    <Route path='/fetchdata/:startDateIndex?' component={FetchData} />
    <Route path='/project/list:pageIndex?' component={ListProject} />
    <Route path='/project/detail/:id?' component={ViewProject} />
    <Route path='/project/create' component={CreateProject} />
    <Error />
  </Layout>
);
