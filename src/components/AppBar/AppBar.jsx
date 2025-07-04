import React from 'react'
import Box from '@mui/material/Box'
import ModeSelect from '~/components/ModeSelect/ModeSelect'
import AppsIcon from '@mui/icons-material/Apps'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import SvgIcon from '@mui/material/SvgIcon'
import  Typography  from '@mui/material/Typography'
import Workspaces from '~/components/AppBar/Menus/Workspaces'
import Recent from '~/components/AppBar/Menus/Recent'
import Starred from '~/components/AppBar/Menus/Starred'
import Templates from '~/components/AppBar/Menus/Templates'
import  Button  from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Badge from '@mui/material/Badge'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Profiles from '~/components/AppBar/Menus/Profiles'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import {useState} from 'react'
function AppBar() {
    const [searchValue,setSearchValue] = useState('');
    return (
         <Box px={2} sx={{
            width: '100%',
            height: (theme) => theme.trelloCustom.appBarHeight,
            display: 'flex',
            alignItems: 'center',
            justifyContent:'space-between',
            gap: 2,
            overflowX: 'auto',
            overflowY: 'hidden',
            bgcolor: (theme) => (theme.palette.mode == 'dark' ? '#2c3e50' : '#1565c0'),
            '&::-webkit-scrollbar-track': {
                m: 2
            },
            }}>
            <Box sx={{display: 'flex',alignItems: 'center', gap: 2}}>
                <AppsIcon sx= {{color : 'white'}}/>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <SvgIcon component={TrelloIcon} inheritViewBox sx={{ color: 'white' }} />
                    <Typography variant="span" sx={{fontSize:'1.2rem',fontWeight:'bold',color:'white'}}>Trello</Typography>
                </Box>
                <Box sx={{display: {xs: 'none',md: 'flex'}, gap: 1}}>
                    <Workspaces />
                    <Recent />
                    <Starred />
                    <Templates />
                    <Button variant="outlined" startIcon={<LibraryAddIcon />} sx={{ color: 'white',border: 'none', '&:hover' : {border : 'none'}}}>Create</Button>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TextField 
                    id="outlined-search" 
                    label="Search..." 
                    type="text" 
                    size="small" 
                    value ={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    sx={{ minWidth: '120px', maxWidth : '180px',
                        '& label': {
                            color: 'white'
                        },
                        '& input': {
                            color: 'white'
                        },
                        '& label.Mui-focused': {
                            color: 'white'
                        },
                        '& .MuiOutlinedInput-root' : {
                            '& fieldset':{borderColor: 'white'},
                            '&:hover fieldset': { borderColor: 'white' },
                            '&.Mui-focused fieldset': {borderColor : 'white'}
                        }
                    }}
                    
                    slots={{
                        inputAdornment: InputAdornment, // optional, can be omitted
                    }}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color:'white' }} />
                                </InputAdornment>
                            ),
                            endAdornment: (                    
                                    <CloseIcon 
                                    fontSize = "small" 
                                    sx={{ color: searchValue ? 'white' : 'transparent',cursor : 'pointer' }} 
                                    onClick={() => setSearchValue('')}
                                    />
                            ),
    
                        }
                    }}
            
                 />
                <ModeSelect size="small" />
                <Tooltip title="Notification">
                    <Badge color="warning" variant="dot" sx={{cursor : 'pointer'}} >
                        <NotificationsNoneIcon sx={{color: 'white'}} />
                    </Badge>
                </Tooltip>
                <Tooltip title="Help">
                    <Badge color="secondary" variant="dot" sx={{ cursor: 'pointer' }} >
                        <HelpOutlineIcon sx={{ color: 'white'}} />
                    </Badge>
                </Tooltip>
                <Profiles/>
                
            </Box>
                 
        </Box>
    );
}

export default AppBar