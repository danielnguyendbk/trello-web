import React from 'react';
import { useColorScheme } from '@mui/material/styles';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

function ModeSelect() {
  const { mode, setMode } = useColorScheme();

  const handleChange = (event) => {
    const selectedMode = event.target.value;
    setMode(selectedMode);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="label-select-light-dark-mode">Mode</InputLabel>
      <Select
        labelId="label-select-light-dark-mode"
        id="select-light-dark-mode"
        value={mode}
        label="Mode"
        onChange={handleChange}
      >
        <MenuItem value="light">
          <LightModeIcon sx={{ mr: 1 }} /> Light
        </MenuItem>
        <MenuItem value="dark">
          <DarkModeOutlinedIcon sx={{ mr: 1 }} /> Dark
        </MenuItem>
        <MenuItem value="system">
          <SettingsBrightnessIcon sx={{ mr: 1 }} /> System
        </MenuItem>
      </Select>
    </FormControl>
  );
}
export default ModeSelect;