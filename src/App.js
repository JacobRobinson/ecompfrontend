import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {AccountCards} from './components/components'
import {AppBar, Grid, Toolbar} from '@material-ui/core'

function App() {
  const [user, setUser] = useState({
    name: 'Peter Griffin',
    customerID: '456'
  });
  const [accounts, setAccounts] = useState({
    loaded: false,
    list: []
  });

  useEffect(()=>{
      async function initializeAccounts() {
          try {
              const accountsRequest = await Promise.all([
                  fetch('accounts?primary=' + user.customerID),
                  fetch('accounts?secondary=' + user.customerID)
              ]);
              const accountsResponse = await Promise.all(accountsRequest.map(request => request.text()));
              const userAccounts = accountsResponse
                  .map(JSON.parse)
                  .map(accountResponse => accountResponse.data)
                  .reduce((accumulator, responseAccounts) => accumulator.concat(responseAccounts),[])
              
              const transactionRequests = await Promise.all(userAccounts.map(account => fetch('transactions?accountFrom=' + account.accountNumber)));
              const transactionResponses = await Promise.all(transactionRequests.map(request => request.text()))
              const accountTransactions = transactionResponses
                  .map(JSON.parse)
                  .map(aTxn => aTxn.data)
              
              const accountsList = userAccounts.map((account, index) => {
                return {
                  ...account,
                  txns: accountTransactions[index]
                }
              })
        
              setAccounts({
                  loaded: true,
                  list: accountsList
              });
          } catch (e) {return}
      }

      if (!accounts.loaded) {
        initializeAccounts();
      }
  })

  return (
    <div className="App">
      <header className="App-header">
        <AppBar>
          <Toolbar>Welcome, {user.name}!</Toolbar>
        </AppBar>
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <Grid container justify="space-evenly">
            <Grid container item>
              <AccountCards accounts={accounts}></AccountCards>
            </Grid>
          </Grid>
        </div>
      </header>
    </div>
  );
}

export default App;
