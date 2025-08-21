import Box from '@mui/material/Box'
import * as React from 'react';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import  Button  from '@mui/material/Button';
import Column from './Column/Column';
import { SortableContext,horizontalListSortingStrategy } from '@dnd-kit/sortable';

function ListColumns({columns}) {
  return (
    // SortableContext yêu cầu item là mảng dạng {'id-1,id-2'} chứ ko phải {id: id-1,id: id-2}
    // nếu ko đúng thì vẫn kéo thả được nhưng không có animation
    
      <SortableContext items={columns?.map(c => c._id)} strategy={horizontalListSortingStrategy}>
          <Box sx={{
              bgcolor: 'inherit',
              width: '100%',
              height: '100%',
              display: 'flex',
              overflowX: 'auto',
              overflowY: 'hidden',
              '&::-webkit-scrollbar-track': {
                  m: 2
              },
          }}>
              {columns?.map(column => <Column key={column._id} column={column} />)}


              <Box
                  sx={{
                      minWidth: '200px',
                      maxHeight: '200px',
                      mx: 2,
                      borderRadius: '6px',
                      height: 'fit-content',
                      bgcolor: '#ffffff3d'
                  }} >
                  <Button
                      startIcon={<NoteAddIcon />}
                      sx={{
                          color: 'white',
                          width: '100%',
                          justifyContent: 'flex-start',
                          pl: 2.5,
                          py: 1
                      }}>
                      Add new column
                  </Button>
              </Box>
          </Box>
    </SortableContext>
        
    )
}

export default ListColumns