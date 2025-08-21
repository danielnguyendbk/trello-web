import * as React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Tooltip from '@mui/material/Tooltip';

// Icon imports - cần thêm!
import DashboardIcon from '@mui/icons-material/Dashboard';
import VpnLockIcon from '@mui/icons-material/VpnLock';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import BoltIcon from '@mui/icons-material/Bolt';
import FilterListIcon from '@mui/icons-material/FilterList';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import capitalizeFirst from '~/utils/capitalizeFirst';

const MENU_STYLE = {
    color: 'white',
    bgcolor: 'transparent',
    paddingX: '5px',
    border: 'none',
    borderRadius: '4px',
    '& .MuiSvgIcon-root': {
        color: 'white'
    },
    '&:hover': {
        bgcolor: 'primary.50'
    }
}

function BoardBar ({board}) {
    return (
        <Box sx={{
            
            width: '100%',
            height: (theme) => theme.trelloCustom.boardBarHeight,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            overflowX: 'auto',
            overflowY: 'hidden',
            borderBottom: '1px solid white',
            paddingX : 2,
            alignItems: 'center',
            justifyContent: 'space-between',
            bgcolor : (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
            '&::-webkit-scrollbar-track': {
                m: 2
            },
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Tooltip title= {board?.description}>
                    <Chip sx={MENU_STYLE}
                        icon={<DashboardIcon />}
                        label={board?.title}
                        clickable
                    ></Chip>
                </Tooltip>
                <Chip sx={MENU_STYLE }
                    icon={<VpnLockIcon />}
                    label={capitalizeFirst(board?.type)}
                    clickable/>
                <Chip sx={ MENU_STYLE }
                    icon={<AddToDriveIcon />}
                    label="Add to Google Drive"
                    clickable/>
                <Chip sx={MENU_STYLE}
                    icon={<BoltIcon />}
                    label="Automation"
                    clickable/>
                <Chip sx={MENU_STYLE}
                    icon={<FilterListIcon />}
                    label="Filters"/>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button 
                variant="outlined" 
                startIcon={<PersonAddIcon/>}
                sx={{color: 'white',
                    borderColor : 'white',
                    '&:hover': {
                        borderColor: 'white'
                    }
                }}
                >Invite</Button>
                
                <AvatarGroup max={4} sx ={{
                    gap : '10px',
                    '& .MuiAvatar-root': {
                        
                        width:34,
                        height:34,
                        fontSize:16,
                        border : 'none',
                        color: 'white',
                        cursor: 'pointer',
                        '&:first-of-type': {
                            bgcolor: '#a4b0be'
                        }
                    }
                }}>         
                    <Tooltip title="Ronaldo">
                        <Avatar alt="Remy Sharp" src="https://e0.365dm.com/23/03/2048x1152/skysports-liechtenstein-cristiano-ronaldo_6098380.jpg?20230323210807" />
                    </Tooltip>
                    <Tooltip title="Neymar">
                        <Avatar alt="Remy Sharp" src="https://tse1.mm.bing.net/th/id/OIP.0BlUqaBc06eKPcM_mlCN-AHaFx?pid=Api&P=0&h=220" />
                    </Tooltip>
                    <Tooltip title="Mbappe">
                        <Avatar alt="Remy Sharp" src="https://library.sportingnews.com/styles/twitter_card_120x120/s3/2024-05/nba-plain--a48f3ff8-3b59-4b88-8c3c-bef37d2a1044.png?itok=lJC7zBqE" />
                    </Tooltip>
                    <Tooltip title="daniel">
                        <Avatar alt="Remy Sharp" src="https://tse2.mm.bing.net/th/id/OIP.hxqK8O4vp1nWQAlPEmek5wHaHa?pid=Api&P=0&h=220" />
                    </Tooltip>
                    <Tooltip title="daniel">
                        <Avatar alt="Remy Sharp" src="https://tse1.mm.bing.net/th/id/OIP.aDNv9C8TWDgrxFYyjqWDIAHaEK?pid=Api&P=0&h=220" />
                    </Tooltip>
                </AvatarGroup>

            </Box>

        </Box>
    );

}
export default BoardBar