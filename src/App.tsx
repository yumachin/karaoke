import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Start from './pages/Start/Start'
import Home from './pages/Home/Home'
import Resister from './utils/Resister'
import { useEffect, useState } from 'react'
import { getCurrentPosition } from './utils/getCurrntPosition'
import { getDate } from './utils/getDate'
import { judgeHoliday } from './utils/judgeHoliday'

const App = () => {
  const [hours, setHours] = useState<number | null>(null);
  const [minutes, setMinutes] = useState<number | null>(null);
  const [dayOfWork, setDayOfWork] = useState<number | null>(null);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [pointError, setPointError] = useState<string | null>(null);
  const [isHoliday, setIsHoliday] = useState<boolean | null>(null);
  const [isTomorrowHoliday, setIsTomorrowHoliday] = useState<boolean | null>(null); //明日が祝日かどうか
  const [holidayError, setHolidayError] = useState<string | null>(null);
  const [plans, setPlans] = useState<string[]>(['Free']);
  const [rangeValue, setRangeValue] = useState<number>(1);


  //リロード対策
  useEffect(() => {
    getCurrentPosition(setLatitude, setLongitude, setPointError);
    getDate(setHours, setMinutes, setDayOfWork);
    judgeHoliday(setIsHoliday, setIsTomorrowHoliday, setHolidayError);
	}, [])

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Start 
                                      setHours={setHours} 
                                      setMinutes={setMinutes} 
                                      setDayOfWork={setDayOfWork} 
                                      setLatitude={setLatitude} 
                                      setLongitude={setLongitude} 
                                      setPointError={setPointError}
                                      setIsHoliday={setIsHoliday}
                                      setIsTomorrowHoliday={setIsTomorrowHoliday}
                                      setHolidayError={setHolidayError}
                                    />
                                  }
          />
          <Route path='/home' element={<Home 
                                          hours={hours} 
                                          setHours={setHours} 
                                          minutes={minutes} 
                                          setMinutes={setMinutes} 
                                          dayOfWork={dayOfWork}
                                          setDayOfWork={setDayOfWork}
                                          latitude={latitude} 
                                          longitude={longitude}
                                          isHoliday={isHoliday}
                                          setIsHoliday={setIsHoliday}
                                          isTomorrowHoliday={isTomorrowHoliday}
                                          setIsTomorrowHoliday={setIsTomorrowHoliday}
                                          setHolidayError={setHolidayError}
                                          plans={plans}
                                          setPlans={setPlans}
                                          rangeValue={rangeValue}
                                          setRangeValue={setRangeValue}
                                         />
                                      }
            />
          <Route path='/resister' element={<Resister />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App