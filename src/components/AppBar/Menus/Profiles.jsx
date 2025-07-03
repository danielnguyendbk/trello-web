import * as React from 'react';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Avatar from '@mui/material/Avatar'
import Logout from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton';
export default function Profiles() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
      <Box sx={{ color: 'white' }}>
            <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ padding : 0 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar
                            sx={{ width: 34, height: 34 }}
                            alt="goat"
                            src="https://tse3.mm.bing.net/th?id=OIP.Nt2rigkhibkJQFb2UWWSggHaE8&pid=Api&P=0&h=220"
                        />
                    </IconButton>
            </Tooltip>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                    list: {
                        'aria-labelledby': 'basic-button-profiles',
                    },
                }}
            >
        <MenuItem>
          <Avatar sx={{width: '28px', height:'28px', mr:2}}/> Profile
        </MenuItem>
        <MenuItem >
                    <Avatar sx={{ width: '28px', height: '28px', mr: 2 }} /> My account
        </MenuItem>
        <Divider />
        <MenuItem 
            sx={{ width: '28px', height: '28px', mr: 2 }}
        >
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem >
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
            </Menu>
        </Box>
    );
}
