import { Stack, Button, Typography, Box, Dialog, DialogTitle, DialogContent, DialogContentText, FormControlLabel, Checkbox } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

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
import { useEffect, useState } from 'react';

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

  let initialModal = true
  if (localStorage.getItem("attention") === "false") {
    initialModal = false
  }
  else {
    initialModal = true
  }

  const [modal, setModal] = useState(initialModal);
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    setModal(false)
  };

  useEffect(() => {
    localStorage.setItem('attention', String(modal));
  }, [checked]);

  useEffect(() => {
    const attention = localStorage.getItem("attention")
    if (attention) {
      attention === "true" ? 
        setModal(true) :
        setModal(false)
    }
    else {
      setModal(true)
    }
  }, [])

  const [text, setText] = useState('')
  const fullText = 'karakara'

  useEffect(() => {
    // setInterval: 指定した間隔（この場合は200ミリ秒）で関数を繰り返し実行
    const interval = setInterval(() => {
      setText((current) => {
        if (current.length < fullText.length) {
          // index番号が、0からcurrent.length + 1までの文字を抽出
          return fullText.slice(0, current.length + 1)
        }
        return current
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Dialog
        open={modal} onClose={() => setModal(false)}
      >
        <DialogTitle display="flex" alignItems='center' gap={1} sx={{fontFamily: "Reggae One", fontSize: 22, color: "#f44336", fontWeight: 'bold'}}>
          <WarningAmberIcon />
          Attention
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{fontFamily: "Reggae One", fontSize: 13, mb: 1, textIndent: "1em"}}>
            設定からブラウザの位置情報の使用を許可しなければ、このアプリは利用できません。
          </DialogContentText>
          <DialogContentText sx={{fontFamily: "Reggae One", fontSize: 13, mb: 4, textIndent: "1em"}}>
            現在地の取得において、通信環境によっては誤差が出る場合があります。ご了承ください。
          </DialogContentText>
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={handleCheckboxChange}
                size="small"
              />
            }
            label={
              <Typography sx={{fontFamily: "Reggae One", fontSize: 12}}>
                次回から表示しない
              </Typography>
            }
          />
        </DialogContent>
      </Dialog>
      <div style={{position: 'fixed', width: "100%"}}>
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
            backgroundRepeat: 'no-repeat',
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
            spacing={{ xs: 50, md: 60}}
            sx={{
              '@media (max-height: 680px)': {
                mt: '10vh'
              },
              '@media (min-height: 680px)': {
                mt: '5vh'
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
              {text}
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
      </div>
    </>
  )
}

export default Start