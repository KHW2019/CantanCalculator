import React from 'react';
import './App.css'; 
import PlayerForm from './PlayerForm';


const App: React.FC = () => {
    return (
        <div className="screenHolder">
            <div className="img_container">
                <img src="cantanlogo.png" className="App-logo" alt="logo"/>
            </div>

            <PlayerForm></PlayerForm>
        </div>
    );
};

export default App;
