import { Box, Menu, MenuItem, Typography } from '@mui/material';

import { HeaderProps } from '../../types/types';
import { useEffect, useState } from 'react';

const Header: React.FC<HeaderProps> = ({ rangeOpen, setRangeOpen, range, setRange }) => {
  const initialStrRange: string = localStorage.getItem('strRange') ? String(localStorage.getItem('strRange')) : "1km";
  
  const [strRange, setStrRange] = useState<string>(initialStrRange);
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget);
    setRangeOpen(true);
  };
  const handleClose = () => {
    setAnchor(null);
    setRangeOpen(false);
  };
  const selectRangeClick = (strValue: string, numValue: number) => {
    setStrRange(strValue);
    setRange(numValue);
    handleClose();
  };

  // リロードしてもローカルストレージから範囲取得
  useEffect(() => {
    if (localStorage.getItem("range")) {
      const range = Number(localStorage.getItem("range"));
      setRange(range);
    }
    else setRange(1);
    if (localStorage.getItem("strRange")) {
      const strRange = String(localStorage.getItem("strRange"));
      setStrRange(strRange);
    }
    else setStrRange('1km');
  }, []);

  useEffect(() => {
    // JSON.stringify: 数値や配列・オブジェクトなどを文字列に変換
    localStorage.setItem('range', JSON.stringify(range));
    localStorage.setItem('strRange', strRange);
  }, [range]);

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
        color: 'white'
      }}
    >
      <Typography variant="body1" sx={{ fontFamily: "Reggae One", p: '2.3vh' }}>
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
            pl: '0.7',
            '&:hover': { color: 'rgb(50, 227, 240)' }
        }}
        onClick={handleClick}
      >
        {strRange}
      </Typography>
      <Typography variant="body1" sx={{ fontFamily: "Reggae One", p: '3vh' }}>
        の検索結果
      </Typography>
      <Menu
        open={rangeOpen}
        anchorEl={anchor}
        onClose={handleClose}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          maxH: '275px',
          w: '300px'
        }}
      >
        <MenuItem onClick={() => selectRangeClick('100m', 0.1)}  sx={{ fontFamily: "Reggae One" }}>100m</MenuItem>
        <MenuItem onClick={() => selectRangeClick('500m', 0.5)}  sx={{ fontFamily: "Reggae One" }}>500m</MenuItem>
        <MenuItem onClick={() => selectRangeClick('1km', 1)}     sx={{ fontFamily: "Reggae One" }}>1km</MenuItem>
        <MenuItem onClick={() => selectRangeClick('3km', 3)}     sx={{ fontFamily: "Reggae One" }}>3km</MenuItem>
        <MenuItem onClick={() => selectRangeClick('5km', 5)}     sx={{ fontFamily: "Reggae One" }}>5km</MenuItem>
        <MenuItem onClick={() => selectRangeClick('10km', 10)}   sx={{ fontFamily: "Reggae One" }}>10km</MenuItem>
        <MenuItem onClick={() => selectRangeClick('30km', 30)}   sx={{ fontFamily: "Reggae One" }}>30km</MenuItem>
        <MenuItem onClick={() => selectRangeClick('50km', 50)}   sx={{ fontFamily: "Reggae One" }}>50km</MenuItem>
        <MenuItem onClick={() => selectRangeClick('100km', 100)} sx={{ fontFamily: "Reggae One" }}>100km</MenuItem>
      </Menu>
    </Box>
  );
};

export default Header;