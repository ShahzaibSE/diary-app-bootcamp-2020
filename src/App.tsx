import React from 'react';
import logo from './logo.svg';
import './App.css';
//
import GridComponent from "./components/GridComponent/Grid"
// Redux Provider.
import {Provider} from "react-redux"
// Store.
import store from "./app_store/store"

function App() {
  return (
   <Provider store={store}> 
    <div>
      <GridComponent/>
    </div>
    </Provider>
  );
}

export default App;
