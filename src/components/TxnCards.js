import React from 'react';
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'

function TxnCards(props) {
    if (props.txns) {
        return (props.txns.map(txn => {
            return <Card>
                        <Paper>
                            <h3>Account: {txn.accountFrom}</h3>
                            <p>Recipient: {txn.accountTo}</p>
                            <p>Amount in CAD: {txn.amount}</p>
                        </Paper>
                    </Card>
            })
        )
    } else {
        return <></>
    }
}

export default TxnCards