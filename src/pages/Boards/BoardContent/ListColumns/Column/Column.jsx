import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Tooltip from '@mui/material/Tooltip'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCardIcon from '@mui/icons-material/AddCard';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { mapOrder } from '~/utils/sort';

import ListCards from './ListCards/ListCards';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';


function Column({column}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: column._id,
        data: {...column}
     });

    const dndKitColumnstyles = {
        transform: CSS.Translate.toString(transform),
        transition,
        height: '100%',
        opacity: isDragging ? 0.5 : undefined
      };

    const [anchorEl, setAnchorEl] = React.useState(null);
            const open = Boolean(anchorEl);
            const handleClick = (event) => {
                setAnchorEl(event.currentTarget);
            };
    const handleClose = () => {
        setAnchorEl(null);
    };
   

    const orderCards = mapOrder(column?.cards, column?.cardOrderIds, '_id');
    

  return (
          <div ref={setNodeRef}
              style={dndKitColumnstyles}
              {...attributes}>
              {/* Box column */}
              <Box
                  {...listeners}
                  sx={{
                      minWidth: '270px',      
                      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0'),
                      ml: 2,
                      borderRadius: '6px',
                      maxHeight: (theme) => `calc(${theme.trelloCustom.boardContentHeight} - ${theme.spacing(5)})`,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 'fit-content',
                      overflow: 'hidden'
                  }}
              >
                  {/* Box Column Header */}
                  <Box sx={{
                      height: (theme) => (theme.trelloCustom.columnHeaderHeight),
                      p: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                  }}>
                      <Typography
                          variant='h6'
                          sx={{ fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}
                      >{column?.title}</Typography>
                      <Box>
                          <Tooltip title="More options">
                              <ExpandMoreIcon
                                  sx={{ color: 'text.primary', cursor: 'pointer' }}
                                  id="basic-column-dropdown"
                                  aria-controls={open ? 'basic-menu-dropdown' : undefined}
                                  aria-haspopup="true"
                                  aria-expanded={open ? 'true' : undefined}
                                  onClick={handleClick}
                              />
                          </Tooltip>
                          <Menu
                              id="basic-menu-dropdown"
                              anchorEl={anchorEl}
                              open={open}
                              onClose={handleClose}
                              slotProps={{
                                  list: {
                                      'aria-labelledby': 'basic-column-dropdown',
                                  },
                              }}
                          >
                              <MenuItem>
                                  <ListItemIcon>
                                      <AddCardIcon fontSize="small" />
                                  </ListItemIcon>
                                  <ListItemText>Add new card</ListItemText>
                              </MenuItem>
                              <MenuItem>
                                  <ListItemIcon>
                                      <ContentCut fontSize="small" />
                                  </ListItemIcon>
                                  <ListItemText>Cut</ListItemText>
                              </MenuItem>
                              <MenuItem>
                                  <ListItemIcon>
                                      <ContentCopy fontSize="small" />
                                  </ListItemIcon>
                                  <ListItemText>Copy</ListItemText>
                              </MenuItem>
                              <MenuItem>
                                  <ListItemIcon>
                                      <ContentPaste fontSize="small" />
                                  </ListItemIcon>
                                  <ListItemText>Paste</ListItemText>
                              </MenuItem>
                              <Divider />
                              <MenuItem>
                                  <ListItemIcon>
                                      <DeleteForeverIcon fontSize="small" />
                                  </ListItemIcon>
                                  <ListItemText>Remove this column</ListItemText>
                              </MenuItem>
                              <MenuItem>
                                  <ListItemIcon>
                                      <Cloud fontSize="small" />
                                  </ListItemIcon>
                                  <ListItemText>Archive this column</ListItemText>
                              </MenuItem>
                          </Menu>
                      </Box>
                  </Box>
                  <ListCards cards={orderCards} />
                  {/* Box Column Footer */}
                  <Box sx={{
                      height: (theme) => (theme.trelloCustom.columnFooterHeight),
                      p: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                  }}>
                      <Button startIcon={<AddCardIcon />}>Add new card</Button>
                      <Tooltip title="Drag to move">
                          <DragHandleIcon sx={{ cursor: 'pointer' }} />
                      </Tooltip>
                  </Box>
              </Box>
          </div>
        
      
        
  )
}

export default Column