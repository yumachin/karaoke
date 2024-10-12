import { Box, Menu, MenuItem, Typography } from '@mui/material';

import { HeaderProps } from '../../types/types';
import { useEffect, useState } from 'react';

const Header: React.FC<HeaderProps> = ({ rangeOpen, setRangeOpen, rangeValue, setRangeValue, selectedRange, setSelectedRange }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setRangeOpen(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setRangeOpen(false);
  };
  const handleMenuItemClick = (strValue: string, numValue: number) => {
    setSelectedRange(strValue);
    setRangeValue(numValue);
    handleClose();
  };
  useEffect(() => {
    localStorage.setItem('range', JSON.stringify(rangeValue));
    localStorage.setItem('numRange', selectedRange);
  }, [rangeValue]);

  return (
    <Box 
      position='fixed'
      top='0'
      width='100%'
      display="flex" 
      alignItems='center' 
      justifyContent='center' 
      zIndex={100}
      sx={{
        backgroundColor: 'rgb(127, 80, 255)',
        color: 'white',
      }}
    >
      <Typography variant="body1" sx={{fontFamily: "Reggae One", padding: '2.3vh'}}>
        自身の周辺
      </Typography>
      <Typography 
        component="span" 
        variant="h5" 
        sx={{ 
            fontWeight: 'bold', 
            fontFamily: 'Reggae One',
            transition: '0.3s',
            cursor: 'pointer',
            paddingLeft: '0.7vh',
            '&:hover': {
            color: 'rgb(50, 227, 240)'
          }
        }}
        onClick={handleClick}
      >
        {selectedRange}
      </Typography>
      <Typography variant="body1" sx={{fontFamily: "Reggae One", padding: '3vh'}}>
        の検索結果
      </Typography>
      <Menu
        open={rangeOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          maxHeight: '275px',
          width: '300px',
        }}
      >
        <MenuItem onClick={() => handleMenuItemClick('100m', 0.1)} sx={{ fontFamily: "Reggae One" }}>100m</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('500m', 0.5)} sx={{ fontFamily: "Reggae One" }}>500m</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('1km', 1)} sx={{ fontFamily: "Reggae One" }}>1km</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('3km', 3)} sx={{ fontFamily: "Reggae One" }}>3km</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('5km', 5)} sx={{ fontFamily: "Reggae One" }}>5km</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('10km', 10)} sx={{ fontFamily: "Reggae One" }}>10km</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('30km', 30)} sx={{ fontFamily: "Reggae One" }}>30km</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('50km', 50)} sx={{ fontFamily: "Reggae One" }}>50km</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('100km', 100)} sx={{ fontFamily: "Reggae One" }}>100km</MenuItem>
      </Menu>
    </Box>
  )
}

export default Header