import React from 'react'
import {Cookbook} from './components/Cookbook';
import { Components } from './components/Cookbook';

export const App = () => {
  return <div className="App">
    <Cookbook centralComponent={Components.Welcome}/>
  </div>;
};
