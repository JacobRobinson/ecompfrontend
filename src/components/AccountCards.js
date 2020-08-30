import React, {useState, useEffect} from 'react';
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import TxnCards from './TxnCards'

function AccountCards(props) {
    const [accounts, setAccounts] = useState({
        loaded: false,
        list: []
    });

    useEffect(()=>{
        async function initializeState() {
            if (!accounts.loaded) {
                const accountsRequest = await Promise.all([
                    fetch('accounts?primary=' + props.user.customerID),
                    fetch('accounts?secondary=' + props.user.customerID)
                ]);
                const accountsResponse = await Promise.all(accountsRequest.map(request => {
                    return request.text();
                }));
                
                const userAccounts = accountsResponse
                    .map(JSON.parse)
                    .map(accountResponse => accountResponse.data)
                    .reduce((accumulator, responseAccounts) => accumulator.concat(responseAccounts),[])
                
                setAccounts({
                  loaded: true,
                  list: userAccounts
                });
            }
        }

        initializeState();
    })

    return (accounts.list.map(account => {
        return <>
                    <Card>
                        <Paper>
                            <h3>Account Number: {account.accountNumber}</h3>
                            <h3>{account.secondary}</h3>
                            <h2>Balance: {account.balance}</h2>
                        </Paper>
                    </Card>
                    <TxnCards account={account}></TxnCards>
                </>
    }))
}

export default AccountCards