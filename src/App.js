import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Grid from '@material-ui/core/Grid'
import {AccountCards, UserCard, TxnCards} from './components/components'

function App() {
  const [user, setUser] = useState({
    name: 'Stewie Griffin',
    customerID: '777'
  });

  const [accounts, setAccounts] = useState({
    loaded: false,
    list: []
  });

  const [txns, setTxns] = useState({
    loaded: false,
    list: []
  });

  useEffect(()=>{
    async function initializeState() {
      if (!accounts.loaded) {
        const accountsRequest = await fetch('accounts?primary=' + user.customerID);
        const accountsResponse = JSON.parse(await accountsRequest.text());

        setAccounts({
          loaded: true,
          list: accountsResponse.data
        });
      }

      if (accounts.loaded && !txns.loaded) {
        let transactions = [];

        await Promise.all(accounts.list.map(async (account) => {
          const txnsRequest = await fetch('transactions?accountFrom=' + account.accountNumber);
          const txnsResponse = JSON.parse(await txnsRequest.text()).data
          transactions = transactions.concat(txnsResponse)
        }))

        setTxns({
          loaded: true,
          list: transactions
        });
      }
    }

    initializeState();
  });

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <div>
          <Grid container justify="space-evenly">
            <Grid container item>
              <UserCard name={user.name} customerID={user.customerID}></UserCard>
            </Grid>
            <Grid container item>
              <AccountCards accounts={accounts}></AccountCards>
            </Grid>
            <Grid container item>
              <TxnCards txns={txns}></TxnCards>
            </Grid>
          </Grid>
        </div>
      </header>
    </div>
  );
}

export default App;
