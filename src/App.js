import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Grid from '@material-ui/core/Grid'
import {AccountCards, UserCard} from './components/components'

function App() {
  const [user, setUser] = useState({
    name: 'Peter Griffin',
    customerID: '123'
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <Grid container justify="space-evenly">
            <Grid container item>
              <UserCard user={user}></UserCard>
            </Grid>
            <Grid container item>
              <AccountCards user={user}></AccountCards>
            </Grid>
          </Grid>
        </div>
      </header>
    </div>
  );
}

export default App;
