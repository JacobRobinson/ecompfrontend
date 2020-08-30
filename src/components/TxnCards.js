import React, {useState, useEffect} from 'react';
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'

function TxnCards(props) {
    const [txns, setTxns] = useState({
        loaded: false,
        list: []
    });

    useEffect(()=>{
        async function initializeState(){
            if (!txns.loaded) {
        
                const txnsRequest = await fetch('transactions?accountFrom=' + props.account.accountNumber);
                const accountTransactions = JSON.parse(await txnsRequest.text()).data

                setTxns({
                    loaded: true,
                    list: accountTransactions
                  });
            }
        }
        
        initializeState();
    });

    return (txns.list.map(txn => {
        return <Card>
                    <Paper>
                        <h3>Account: {txn.accountFrom}</h3>
                        <p>Recipient: {txn.accountTo}</p>
                        <p>Amount in CAD: {txn.amount}</p>
                    </Paper>
                </Card>
        })
    )
}

export default TxnCards