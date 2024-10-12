import { Stack, Button, Typography, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import { IoMusicalNotes } from "react-icons/io5";
import { IoIosMusicalNote } from "react-icons/io";
import { GiMusicalNotes } from "react-icons/gi";

import { Link } from 'react-router-dom';

import backgroundImage from '../../assets/background.jpg'; 

import './Start.css';
import { StartProps } from '../../types/types';
import { getDate } from '../../utils/getDate';
import { getCurrentPosition } from '../../utils/getCurrntPosition';
import { judgeHoliday } from '../../utils/judgeHoliday';

const Start: React.FC <StartProps> = ({ setHours, 
                                        setMinutes, 
                                        setDayOfWork, 
                                        setLatitude, 
                                        setLongitude, 
                                        setPointError, 
                                        setIsHoliday, 
                                        setIsTomorrowHoliday, 
                                        setHolidayError 
                                      }) => 
{
  const handleClick = () => {
    getDate(setHours, setMinutes, setDayOfWork);
    getCurrentPosition(setLatitude, setLongitude, setPointError);
    judgeHoliday(setIsHoliday, setIsTomorrowHoliday, setHolidayError);
  };

  return (
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          overflow: 'hidden',
          background: `linear-gradient(to bottom, rgba(123, 104, 238, 0.8), rgba(255, 99, 71, 0.8)), url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <Box 
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            w: '100%',
            h: '100%',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(5px)',
            zIndex: -1
          }}
        />
        <Stack
          spacing={{ xs: 40, md: 60}}
          sx={{
            '@media (max-height: 680px)': {
              mt: '6vh'
            }
          }}
        >
          <Typography
            variant='h2'
            sx={{
              fontFamily: "Reggae One",
              color: 'white', 
              position: 'relative'
            }}
          >
            karakara
            <Box
              sx={{
                position: 'absolute',
                fontSize: '30px',
                top: '-30px', 
                right: '290px',
                animation: 'leftTop 2s ease-in-out infinite'
              }}
            >
              <IoMusicalNotes />
            </Box>
            <Box
              sx={{
                position: 'absolute',
                fontSize: '30px',
                top: '-25px', 
                right: '160px',
                animation: 'centerTopLeft 4.5s ease-in-out infinite'
              }}
            >
              <GiMusicalNotes />
            </Box>
            <Box 
              sx={{
                position: 'absolute',
                fontSize: '30px',
                top: '-40px', 
                right: '80px',
                animation: 'centerTopRight 3s ease-in-out infinite'
              }}
            >
              <IoIosMusicalNote />
            </Box>
            <Box 
              sx={{
                position: 'absolute',
                fontSize: '30px',
                top: '-20px', 
                right: '-35px',
                animation: 'rightTop 1.5s ease-in-out infinite'
              }}
            >
              <IoMusicalNotes />
            </Box>
            <Box 
              sx={{
                position: 'absolute',
                fontSize: '30px',
                top: '100px', 
                right: '200px',
                animation: 'leftBottom 4s ease-in-out infinite'
              }}
            >
              <IoMusicalNotes />
            </Box>
            <Box
              sx={{
                position: 'absolute',
                fontSize: '30px',
                top: '90px', 
                right: '40px',
                animation: 'rightBottom 2.5s ease-in-out infinite'
              }}
            >
              <IoIosMusicalNote />
            </Box>
          </Typography>
          <Button 
            component={Link}
            to='/home'
            variant='contained'
            size='large'
            sx={{
              p: '15px', 
              fontFamily: "Reggae One",
              borderRadius: '50px',
              bgcolor: 'white',
              color: '#FF6347'
            }}
            endIcon={<SendIcon sx={{animation: 'sendIcon 4s ease-in-out infinite'}}/>}
            onClick={() => handleClick()}
          >
            始める
          </Button>
        </Stack>
      </Box>
  )
}

export default Start