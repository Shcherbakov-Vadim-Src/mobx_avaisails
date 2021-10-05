import React from "react";
import ReactDOM from "react-dom";
import './css/main.css'
import Main from "./components/Main";
import storeInstance from './store/Store'


export const StoreContext = React.createContext();


ReactDOM.render(
        <StoreContext.Provider value={storeInstance}>
            <Main />
        </StoreContext.Provider >
    , document.getElementById('app'));
