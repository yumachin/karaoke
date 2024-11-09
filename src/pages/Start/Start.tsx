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
  // 始めるボタンを押した時に発火
  const handleClick = () => {
    getDate(setHours, setMinutes, setDayOfWork);
    getCurrentPosition(setLatitude, setLongitude, setPointError);
    judgeHoliday(setIsHoliday, setIsTomorrowHoliday, setHolidayError);
  };

  // 位置情報の使用の許可を求めるモーダル(最初は表示)
  let initialModal = true

  // このモーダルを表示にしているとき
  if (localStorage.getItem("attention") === "true") {
    initialModal = true
  } 
  // このモーダルを非表示にしているとき
  else {
    initialModal = false
  }

  const [modal, setModal] = useState(initialModal);
  const [checked, setChecked] = useState(false);

  // レンダリング及び、チェックが「入れられるor外されるとき」ローカルストレージの値を更新
  useEffect(() => {
    localStorage.setItem('attention', String(modal));
  }, [checked]);

  // レンダリングされたとき発火
  useEffect(() => {
    const attention = localStorage.getItem("attention")
    attention === "true" ? setModal(true) : setModal(false)
  }, [])

  // 「次回から表示しない」のチェックボックスにチェックしたとき発火
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    setModal(false)
  };

  // 表示時のタイトルアニメーション
  const [text, setText] = useState('')
  const fullText = 'karakara'

  // useEffect内にsetIntervalを入れることでコンポーネントがマウントされた時にタイマーを開始し、アンマウントされる時にタイマーを停止する
  useEffect(() => {
    // setInterval: 指定した間隔（100ミリ秒）で関数を繰り返し実行
    const interval = setInterval(() => {
      // current_text: 現在のtextが代入されていくため、初回は""
      setText((current_text) => {
        if (current_text.length < fullText.length) {
          // index番号が、（0～current_text.length+1）までの文字を抽出
          return fullText.slice(0, current_text.length + 1)
        }
        // ここはif文がfalseのとき実行
        return current_text
      })
    }, 100)

    // clearInterval: 引数（interval）を停止
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* 警告モーダル */}
        <Dialog open={modal} onClose={() => setModal(false)} >
          <DialogTitle display="flex" alignItems='center' gap={1} sx={{ fontFamily: "Reggae One", fontSize: 22, color: "#f44336", fontWeight: 'bold' }} >
            <WarningAmberIcon />
            Attention
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ fontFamily: "Reggae One", fontSize: 13, mb: 1, textIndent: "1em" }} >
              設定からブラウザの位置情報の使用を許可しなければ、このアプリは利用できません。
            </DialogContentText>
            <DialogContentText sx={{ fontFamily: "Reggae One", fontSize: 13, mb: 4, textIndent: "1em" }} >
              また、現在地の取得は、通信環境によって誤差が出る場合があります。ご了承ください。
            </DialogContentText>

            {/* FormControlLabel: チェックボックスやラジオボタンにラベルを表示する */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={handleCheckboxChange}
                  size="small"
                />
              }
              label={
                <Typography sx={{ fontFamily: "Reggae One", fontSize: 12 }}>
                  次回から表示しない
                </Typography>
              }
            />
            {/* FormControlLabel: チェックボックスやラジオボタンにラベルを表示する */}

          </DialogContent>
        </Dialog>
      {/* 警告モーダル */}

      <div style={{ position: 'fixed', width: "100%" }}>
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
            spacing={{ xs: 50, md: 60 }}
            sx={{
              '@media (max-height: 680px)': { mt: '10vh' },
              '@media (min-height: 680px)': { mt: '5vh' }
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

              {/* 音符 */}
                <Box
                  sx={{
                    position: 'absolute',
                    fontSize: '30px',
                    top: '-30px', 
                    right: '290px',
                    // 2s ease-in-out: 2秒かけて動作し、アニメーションの開始時と終了時はゆっくり
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
              {/* 音符 */}
            
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
              endIcon={<SendIcon sx={{ animation: 'sendIcon 4s ease-in-out infinite' }} />}
              onClick={handleClick}
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