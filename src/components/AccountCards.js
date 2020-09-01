import React from 'react';
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import TxnCards from './TxnCards'

function AccountCards(props) {
    if (props.accounts.list.length === 0) {
        return <></>
    }
    else
    {
        return (props.accounts.list.map(account => {
            return <>
                        <Card>
                            <Paper>
                                <h3>Account Number: {account.accountNumber}</h3>
                                <h3>{account.secondary}</h3>
                                <h2>Balance: {account.balance}</h2>
                            </Paper>
                        </Card>
                        <TxnCards txns={account.txns}></TxnCards>
                    </>
        }))
    }
}

export default AccountCards