import Box from '@mui/material/Box'
import * as React from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import Card from './Cards/Card';
function ListCards({cards}) {
     if (!cards?.length) return null
    return (

        <SortableContext items={cards?.map(c => c._id)} strategy={verticalListSortingStrategy}>
            <Box
                sx={{
                    p: '0 5px',
                    m: '0 5px',
                    flex: 1,
                    flexDirection: 'column',
                    overflowX: 'hidden',
                    overflowY: 'auto',
                    p: 2,
                    maxHeight: (theme) =>
                        `calc(${theme.trelloCustom.boardContentHeight} - ${theme.spacing(5)} - ${theme.trelloCustom.columnHeaderHeight} - ${theme.trelloCustom.columnFooterHeight})`,

                    '& > *:not(:last-child)': {
                        mb: 1, // giống gap: 2
                    },

                    // Scrollbar

                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#ced0da',
                        borderRadius: '8px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: '#bfc2cf',
                    },
                }}
            >
                {cards?.map(card => <Card key={card._id} card={card} />)}
            </Box>
        </SortableContext>
    )
} 

export default ListCards