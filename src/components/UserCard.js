import React from 'react';
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

function UserCard(props) {
    return (
        <Card>
            <Paper>
                <h3>{props.name}</h3>
                <h4>{props.customerID}</h4>
                <Button >SEARCH</Button> 
                <TextField label="New User"></TextField>
            </Paper>
        </Card>
    )
}

export default UserCard