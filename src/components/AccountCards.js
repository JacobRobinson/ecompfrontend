import React from 'react';
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'

function AccountCards(props) {
    return (props.accounts.list.map(account => {
        return <Card>
                    <Paper>
                        <h3>{account.accountNumber}</h3>
                        <h3>{account.secondary}</h3>
                        <h2>{account.balance}</h2>
                    </Paper>
                </Card>
    }))
}

export default AccountCards