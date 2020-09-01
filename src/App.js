import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {AccountCards, UserCard} from './components/components'
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'

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
      console.log(accounts)
      if (!accounts.loaded) {
        initializeAccounts();
      }
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <AppBar></AppBar>
          <Grid container justify="space-evenly">
            <Grid container item>
              <UserCard user={user}></UserCard>
            </Grid>
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
