import React from 'react';
import Button from '@mui/material/Button';

function Home() {
    return (
        <React.Fragment>
            <p>HOME</p>
            <PlayButton></PlayButton>
        </React.Fragment>
    )
}

function PlayButton() {
    return (
        <Button href="/game">PLAY</Button>
    )
}

export default Home;