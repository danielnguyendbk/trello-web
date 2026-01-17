import Container from '@mui/material/Container';
import AppBar from '~/components/AppBar/AppBar';
import BoardBar from '~/pages/Boards/BoardBar/BoardBar';
import BoardContent from '~/pages/Boards/BoardContent/BoardContent';
// import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { fetchBoardDetails } from '~/apis';
import { mockData } from '~/apis/mock-data';

function Board() {
    // const { boardId } = useParams();
    const boardId = '68a15f327201565e2e06339d'
    const [board, setBoard] = useState(null);

    useEffect(() => {
        // Use mockData instead of API call
        setBoard(mockData.board);
        
        // Uncomment below to use API instead:
        // fetchBoardDetails(boardId)
        //     .then(res => {
        //         setBoard(res.board);
        //     })
        //     .catch(error => {
        //         console.error('Error fetching board details:', error);
        //     });
    }, [boardId]);
    console.log('board', board);

    return (
        <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
            <AppBar />
            <BoardBar board={board} />
            <BoardContent board={board} />
        </Container>
    );
}

export default Board;
