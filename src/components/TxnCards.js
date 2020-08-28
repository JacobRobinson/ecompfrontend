import React from 'react';
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'

function TxnCards(props) {
    return (props.txns.list.map(txn => {
        return <Card>
                    <Paper>
                        <h3>Account: {txn.accountFrom}</h3>
                        <h3>Recipient: {txn.accountTo}</h3>
                        <h2>Amount in CAD: {txn.amount}</h2>
                        <h4>Account balance: {txn.balance}</h4>
                    </Paper>
                </Card>
        })
    )
}

export default TxnCards