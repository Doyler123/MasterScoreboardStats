import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';


const Loading = () => {
    return (
        <Grid style={{position : "absolute", height : "100%"}} container direction="column" justify="center">
            <Grid item>
                <CircularProgress />
            </Grid>
        </Grid>
    )
}

export default Loading

