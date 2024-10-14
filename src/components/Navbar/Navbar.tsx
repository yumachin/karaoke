import { Box, Button, Checkbox, FormControl, FormControlLabel, InputLabel, ListSubheader, MenuItem, Modal, Select, SelectChangeEvent, Slider, Stack, Typography } from '@mui/material';

import ScheduleIcon from '@mui/icons-material/Schedule';

import { PiMicrophoneStage } from "react-icons/pi";
import { BiMapPin } from "react-icons/bi";

import { NavbarProps } from '../../types/types';
import { useEffect, useState } from 'react';
import { getDate } from '../../utils/getDate';
import { judgeHoliday } from '../../utils/judgeHoliday';


const Navbar: React.FC<NavbarProps> = ({ hours, 
                                         setHours, 
                                         minutes, 
                                         setMinutes, 
                                         dayOfWork, 
                                         setDayOfWork, 
                                         isHoliday, 
                                         setIsHoliday, 
                                         isTomorrowHoliday, 
                                         setIsTomorrowHoliday, 
                                         setHolidayError, 
                                         planOpen, 
                                         setPlanOpen, 
                                         timeOpen, 
                                         setTimeOpen, 
                                         spotOpen, 
                                         setSpotOpen,
                                         setPlans, 
                                         place, 
                                         setPlace
                                        }) => 
{
  //プラン変更に用いる変数
    const [freeChecked, setFreeChecked] = useState(true);
    const [minutesChecked, setMinutesChecked] = useState(false);
    const [packChecked, setPackChecked] = useState(false);
    const [shortFreeChecked, setShortFreeChecked] = useState(false);
    const [endlessFreeChecked, setEndlessFreeChecked] = useState(false);
  //プラン変更に用いる変数

  // //プランのリロード
  //   useEffect(() => {
  //     localStorage.setItem('plan', JSON.stringify(plans));
  //   }, [plans]);
  // //プランのリロード
  
  //プランの変更
    const checkedFree = (event: React.ChangeEvent<HTMLInputElement>) => {
      setFreeChecked(event.target.checked);
      const { name, checked } = event.target;
      if (checked) {
        setPlans((prev: any) => [...prev, name]);
      } else {
        setPlans((prev: any) => prev.filter((plan: any) => plan !== name));
      }
    };
    const checkedMinutes = (event: React.ChangeEvent<HTMLInputElement>) => {
      setMinutesChecked(event.target.checked);
      const { name, checked } = event.target;
      if (checked) {
        setPlans((prev: any) => [...prev, name]);
      } else {
        setPlans((prev: any) => prev.filter((plan: any) => plan !== name));
      }
    };
    const checkedPack = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPackChecked(event.target.checked);
      const { name, checked } = event.target;
      if (checked) {
        setPlans((prev: any) => [...prev, name]);
      } else {
        setPlans((prev: any) => prev.filter((plan: any) => plan !== name));
      }
    };
    const checkedShortFree = (event: React.ChangeEvent<HTMLInputElement>) => {
      setShortFreeChecked(event.target.checked);
      const { name, checked } = event.target;
      if (checked) {
        setPlans((prev: any) => [...prev, name]);
      } else {
        setPlans((prev: any) => prev.filter((plan: any) => plan !== name));
      }
    };
    const checkedEndlessFree = (event: React.ChangeEvent<HTMLInputElement>) => {
      setEndlessFreeChecked(event.target.checked);
      const { name, checked } = event.target;
      if (checked) {
        setPlans((prev: any) => [...prev, name]);
      } else {
        setPlans((prev: any) => prev.filter((plan: any) => plan !== name));
      }
    };
  //プランの変更

  //時間変更に用いる変数
    const [day, setDay] = useState('');
  //時間変更に用いる変数

  //時間の変更
    const handleReset = () => {
      getDate(setHours, setMinutes, setDayOfWork);
      judgeHoliday(setIsHoliday, setIsTomorrowHoliday, setHolidayError);
    }
    const handleDayChange = (event: SelectChangeEvent) => {
      setDay(event.target.value);
      if (event.target.value === "祝日") {
        setIsHoliday(true)
        setIsTomorrowHoliday(false)
      }
      else if (event.target.value === "祝前日") {
        setIsHoliday(false)
        setIsTomorrowHoliday(true)
      }
      else if (event.target.value === "月～木曜日") {
        setDayOfWork(1)
        setIsHoliday(false)
        setIsTomorrowHoliday(false)
      }
      else if (event.target.value === "金曜日") {
        setDayOfWork(5)
        setIsHoliday(false)
        setIsTomorrowHoliday(false)
      }
      else if (event.target.value === "土曜日") {
        setDayOfWork(6)
        setIsHoliday(false)
        setIsTomorrowHoliday(false)
      }
      else {
        setDayOfWork(0)
        setIsHoliday(false)
        setIsTomorrowHoliday(false)
      }
    };
    //初期値を入れ込む
    useEffect(() => {
      if (isHoliday) {
        setDay("祝日");
      }
      else if (isTomorrowHoliday) {
        setDay('祝前日');
      }
      else {
        if (dayOfWork === 0) {
          setDay("日曜日");
        }
        else if (dayOfWork === 5) {
          setDay('金曜日');
        }
        else if (dayOfWork === 6) {
          setDay("土曜日");
        }
        else {
          setDay('月～木曜日');
        }
      }
    }, [isHoliday, isTomorrowHoliday, dayOfWork])

    const spotClose = () => {
      setSpotOpen(false)
    }
    
    const handleHoursChange = (_: Event, hoursValue: number | number[]): void => {
      if (typeof hoursValue === 'number') {
        setHours(hoursValue);
      }
    };
    const handleMinutesChange = (_: Event, minutesValue: number | number[]): void => {
      if (typeof minutesValue === 'number') {
        setMinutes(minutesValue); 
      }
    };
  //時間の変更

  //場所のリロード
    useEffect(() => {
      localStorage.setItem('place', place);
    }, [place]);
  
  //場所のリロード

  //場所フィルター
    const handleSpotChange = (event: SelectChangeEvent) => {
      setPlace(event.target.value);
    }
  //場所フィルター


  return (
    <Box 
      position='fixed'
      bottom="0"
      width='100%'
      display='flex'
      justifyContent='space-around'
      alignItems='center'
      zIndex={100}
      sx={{
        bgcolor: "tomato",
        color: 'white',
        p: '1vh',
        pb: '3vh'
      }}
    >

      {/* Planボタン */}
        <Stack 
          display='flex' 
          alignItems='center'
          sx={{
            cursor: 'pointer',
            transition: '0.2s',
            '&:hover': {
              color: 'rgb(50, 227, 240)'
            }
          }}
          onClick={() => setPlanOpen(true)}
        >
          <PiMicrophoneStage style={{fontSize: '27px'}} />
          <Typography sx={{fontFamily: "Reggae One"}}>Plan</Typography>
        </Stack>

        {/* モーダル */}
          <Modal
            open={planOpen}
            onClose={() => setPlanOpen(false)}
          >
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 350,
                bgcolor: 'background.paper',
                boxShadow: 20,
                p: 3,
                borderRadius: 4
              }}
            >
              <Stack 
                spacing={3} 
                display='flex' 
                justifyContent='center' 
                alignItems='center'
              >
                <Typography variant="h5" sx={{fontFamily: "Reggae One"}}>
                  プランを選択
                </Typography>
                <Stack spacing={1} alignItems="flex-start">
                  <FormControlLabel
                    control={
                      <Checkbox 
                        name="Free" 
                        onChange={checkedFree} 
                        checked={freeChecked} 
                      />
                    }
                    label="フリータイム"
                    sx={{
                      '& .MuiFormControlLabel-label': {
                        fontFamily: 'Reggae One',
                      }
                    }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox 
                        name="30minutes" 
                        onChange={checkedMinutes} 
                        checked={minutesChecked} 
                      />
                    }
                    label="30分"
                    sx={{
                      '& .MuiFormControlLabel-label': {
                        fontFamily: 'Reggae One',
                      }
                    }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox 
                        name="3HourPack" 
                        onChange={checkedPack} 
                        checked={packChecked} 
                      />
                    }
                    label="3時間パック"
                    sx={{
                      '& .MuiFormControlLabel-label': {
                        fontFamily: 'Reggae One',
                      }
                    }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox 
                        name="ShortFree" 
                        onChange={checkedShortFree} 
                        checked={shortFreeChecked} 
                      />
                    }
                    label="ショートフリー"
                    sx={{
                      '& .MuiFormControlLabel-label': {
                        fontFamily: 'Reggae One',
                      }
                    }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox 
                        name="EndlessFree" 
                        onChange={checkedEndlessFree} 
                        checked={endlessFreeChecked} 
                      />
                    }
                    label="エンドレスフリー"
                    sx={{
                      '& .MuiFormControlLabel-label': {
                        fontFamily: 'Reggae One',
                      }
                    }}
                  />
                </Stack>
                <Button 
                  onClick={() => setPlanOpen(false)} 
                  sx={{fontFamily: "Reggae One"}}
                >
                  閉じる
                </Button>
              </Stack>
            </Box>
          </Modal>
        {/* モーダル */}
      {/* Planボタン */}

      {/* Timeボタン */}
        <Stack 
          display='flex' 
          alignItems='center' 
          onClick={() => setTimeOpen(true)}
          sx={{
            cursor: 'pointer',
            transition: '0.2s',
            '&:hover': {
              color: 'rgb(50, 227, 240)'
            }
          }}
        >
          <ScheduleIcon />
          <Typography sx={{fontFamily: "Reggae One"}}>Time</Typography>
        </Stack>

        {/* モーダル */}
          <Modal open={timeOpen} onClose={() => setTimeOpen(false)}>
            <Box 
              sx={{
                position: 'absolute',
                top: '52%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 350,
                bgcolor: 'background.paper',
                boxShadow: 20,
                p: 5,
                borderRadius: 4 
              }}
            >
              <Box display='flex' justifyContent='center'  mb='1vh'>
                <Typography variant="h5" sx={{fontFamily: "Reggae One"}}>
                  曜日・時間を選択
                </Typography>
              </Box>
              <Box display='flex' justifyContent='flex-end'  mb='4vh'>
                <Button 
                  variant='text' 
                  onClick={() => handleReset()} 
                  sx={{
                    fontSize: '12px', 
                    fontFamily: "Reggae One", 
                  }}
                >
                  現在日時を取得
                </Button>
              </Box>
              <Box sx={{ minWidth: 120, mb: '4vh' }}>
                <FormControl fullWidth>
                  <InputLabel sx={{ fontFamily: "Reggae One" }}>曜日</InputLabel>
                  <Select
                    value={day}
                    onChange={handleDayChange}
                    sx={{ fontFamily: "Reggae One", maxHeight: 45  }}
                  >
                    <MenuItem value={"祝日"} sx={{ fontFamily: "Reggae One" }}>祝日</MenuItem>
                    <MenuItem value={"祝前日"} sx={{ fontFamily: "Reggae One" }}>祝前日</MenuItem>
                    <MenuItem value={"月～木曜日"} sx={{ fontFamily: "Reggae One" }}>月～木曜日</MenuItem>
                    <MenuItem value={"金曜日"} sx={{ fontFamily: "Reggae One" }}>金曜日</MenuItem>
                    <MenuItem value={"土曜日"} sx={{ fontFamily: "Reggae One" }}>土曜日</MenuItem>
                    <MenuItem value={"日曜日"} sx={{ fontFamily: "Reggae One" }}>日曜日</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Typography sx={{fontFamily: "Reggae One"}}>時間: {hours}時</Typography>
              <Slider
                value={hours ? hours : 0}
                onChange={handleHoursChange}
                step={1}
                marks
                min={0}
                max={23}
              />
              <Typography sx={{fontFamily: "Reggae One"}}>分　: {minutes}分</Typography>
              <Slider
                value={minutes ? minutes : 0}
                onChange={handleMinutesChange}
                step={5}
                marks
                min={0}
                max={55}
              />
              <Box display='flex' justifyContent='center'  mt="8vh">
                <Button 
                  onClick={() => setTimeOpen(false)}
                  sx={{fontFamily: "Reggae One"}} 
                >
                  閉じる
                </Button>
              </Box>
            </Box>
          </Modal>
        {/* モーダル */}
      {/* Timeボタン */}

      {/* Spotボタン */}
        <Stack 
          display='flex' 
          alignItems='center' 
          onClick={() => setSpotOpen(true)}
          sx={{
            cursor: 'pointer',
            transition: '0.2s',
            '&:hover': {
              color: 'rgb(50, 227, 240)'
            }
          }}
        >
          <BiMapPin style={{fontSize: '24px'}}/>
          <Typography sx={{fontFamily: "Reggae One"}}>Spot</Typography>
        </Stack>

        {/* モーダル */}
          <Modal open={spotOpen} onClose={spotClose}>
            <Box 
              sx={{
                position: 'absolute',
                top: '52%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 320,
                bgcolor: 'background.paper',
                boxShadow: 20,
                p: 5,
                borderRadius: 4 
              }}
            >
              <Box display='flex' justifyContent='center'  mb='5vh'>
                <Typography variant="h5" sx={{fontFamily: "Reggae One"}}>
                  場所を選択
                </Typography>
              </Box>
              <Box sx={{ minWidth: 120, mb: '6vh' }}>
                <FormControl fullWidth>
                  <InputLabel sx={{ fontFamily: "Reggae One", fontSize: 14 }}>場所</InputLabel>
                  <Select
                    value={place}
                    onChange={handleSpotChange}
                    sx={{ fontFamily: "Reggae One", height: 50, mb: 28 }}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 323,
                        },
                      },
                    }}
                  >
                    <MenuItem value={"選択しない"} sx={{ fontFamily: "Reggae One" }} onClick={() => spotClose()}>選択しない</MenuItem>
                    <ListSubheader sx={{ fontFamily: "Reggae One", fontSize: 13, ml: 0.5 }}>大阪府</ListSubheader>
                    <MenuItem value={"梅田"} sx={{ fontFamily: "Reggae One" }} onClick={() => spotClose()}>梅田</MenuItem>
                    <MenuItem value={"難波・心斎橋"} sx={{ fontFamily: "Reggae One" }} onClick={() => spotClose()}>難波・心斎橋</MenuItem>
                    <MenuItem value={"その他大阪市"} sx={{ fontFamily: "Reggae One" }} onClick={() => spotClose()}>その他大阪市</MenuItem>

                    <ListSubheader sx={{ fontFamily: "Reggae One", fontSize: 13, ml: 0.5 }}>兵庫県</ListSubheader>
                    <MenuItem value={"神戸市"} sx={{ fontFamily: "Reggae One" }} onClick={() => spotClose()}>神戸市</MenuItem>

                    <ListSubheader sx={{ fontFamily: "Reggae One", fontSize: 13, ml: 0.5 }}>その他</ListSubheader>
                    <MenuItem value={"京都府"} sx={{ fontFamily: "Reggae One" }} onClick={() => spotClose()}>京都府</MenuItem>
                    <MenuItem value={"奈良県"} sx={{ fontFamily: "Reggae One" }} onClick={() => spotClose()}>奈良県</MenuItem>
                    <MenuItem value={"滋賀県"} sx={{ fontFamily: "Reggae One" }} onClick={() => spotClose()}>滋賀県</MenuItem>
                    <MenuItem value={"和歌山県"} sx={{ fontFamily: "Reggae One" }} onClick={() => spotClose()}>和歌山県</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box display='flex' justifyContent='center'>
                <Button 
                  onClick={() => setSpotOpen(false)}
                  sx={{fontFamily: "Reggae One"}} 
                >
                  閉じる
                </Button>
              </Box>
            </Box>
          </Modal>
        {/* モーダル */}
      {/* Spotボタン */}
    </Box>
  )
}

export default Navbar;