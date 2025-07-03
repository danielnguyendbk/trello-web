import React from 'react';
import { useColorScheme } from '@mui/material/styles';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import Box from '@mui/material/Box'

function ModeSelect() {
  const { mode, setMode } = useColorScheme();

  const handleChange = (event) => {
    const selectedMode = event.target.value;
    setMode(selectedMode);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small"  >
      <InputLabel 
      id="label-select-light-dark-mode"
      sx={{
          color: 'white',
          '&.Mui-focused': { color: 'white' },
          '&:hover Mui-focused-root' : {color :'white'},
          '&.MuiInputLabel-shrink': { color: 'white' },
      }}
      >Mode</InputLabel>
      <Select
        labelId="label-select-light-dark-mode"
        id="select-light-dark-mode"
        value={mode}
        label="Mode"
        onChange={handleChange}
        sx={{
          color: 'white', 
          '& .MuiOutlinedInput-notchedOutline': { borderColor : 'white'},
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
          '.MuiSvgIcon-root': { color: 'white' },
          '&:hover .MuiInputLabel-root': {
            color: 'white',
          },
        }}
      >
        <MenuItem value="light">
          <Box sx={{ display:'flex' ,gap: 1, alignItems: 'center' }}>
            <LightModeIcon  /> Light
          </Box>   
        </MenuItem>
        <MenuItem value="dark">
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <DarkModeOutlinedIcon  /> Dark
          </Box>
        </MenuItem>
        <MenuItem value="system">
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <SettingsBrightnessIcon  /> System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  );
}
export default ModeSelect;