import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns';
import * as React from 'react';
import { mapOrder } from '~/utils/sort';
import {
    PointerSensor,
    DndContext,
    MouseSensor,
    TouchSensor,
    useSensor,
    useSensors
 } from '@dnd-kit/core';
import {
    arrayMove,
    
} from '@dnd-kit/sortable';


function BoardContent({ board }) {
    
    const pointerSensor = useSensor(PointerSensor, {
        // Require the mouse to move by 10 pixels before activating
        activationConstraint: {
            distance: 10,
        },
    })
    const mouseSensor = useSensor(MouseSensor, {
        // Require the mouse to move by 10 pixels before activating
        activationConstraint: {
            distance: 10,
        },
    })
    const touchSensor = useSensor(TouchSensor, {
        // Require the mouse to move by 10 pixels before activating
        activationConstraint: {
            delay: 250,
            tolerance: 5,
        },
    })
    const sensors = useSensors(mouseSensor, touchSensor)

    const [orderedColumnsState,setOrderedColumnsState] = React.useState([])
    React.useEffect(() => {
        const orderedColumns = mapOrder(board?.columns, board?.columnOrderIds, '_id')
        setOrderedColumnsState(orderedColumns)
    }, [board])

    const handleDragEnd = (event) => {
        console.log('handleDragEnd : ', event)
        const { active, over } = event
        if(!over.id) return  // nếu không  kéo vào đâu hết return luon
        if (active.id !== over.id) {
            const oldIndex = orderedColumnsState.findIndex(c => c._id === active.id);
            const newIndex = orderedColumnsState.findIndex(c => c._id === over.id);
                //dùng arraymove để sắp xếp lại như ban đâu
                
            setOrderedColumnsState(arrayMove(orderedColumnsState, oldIndex, newIndex)) ;
        }
    }
    return (
        <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
            <Box sx={{
                bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
                width: '100%',
                height: (theme) => `calc(100vh - ${theme.trelloCustom.appBarHeight} - ${theme.trelloCustom.boardBarHeight})`,
                display: 'flex',
                overflowX: 'auto',
                overflowY: 'hidden',
                p: '10px 0',
            }}>
                <ListColumns columns={orderedColumnsState} />
            </Box>
        </DndContext>

    );
}

export default BoardContent