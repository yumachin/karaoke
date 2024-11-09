import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Start from './pages/Start/Start'
import Home from './pages/Home/Home'
import Resister from './utils/Resister'
import { useEffect, useState } from 'react'
import { getCurrentPosition } from './utils/getMyPosition'
import { getDate } from './utils/getDate'
import { judgeHoliday } from './utils/judgeHoliday'

const App = () => {
  const initialRange = localStorage.getItem('range') ? Number(localStorage.getItem('range')) : 1;
  const initialRangeName = localStorage.getItem('numRange') ? String(localStorage.getItem('numRange')) : "1km";
  // const lsPlan =  localStorage.getItem('plan')
  // const initialPlan: string[] = lsPlan ? JSON.parse(lsPlan) : ["Free"];

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
  const [rangeValue, setRangeValue] = useState<number>(initialRange);
  const [selectedRange, setSelectedRange] = useState(initialRangeName);

  console.log(pointError);
  console.log(holidayError);

  //リロードしてもLSからフィルター項目取得
  useEffect(() => {
    if (localStorage.getItem("range")) {
      const a = Number(localStorage.getItem("range"))
      setRangeValue(a)
    }
    else {
      setRangeValue(1)
    }
    if (localStorage.getItem("numRange")) {
      const b = String(localStorage.getItem("numRange"))
      setSelectedRange(b)
    }
    else {
      setSelectedRange('1km')
    }
    // if (localStorage.getItem("plan")) {
    //   const c = String(localStorage.getItem("plan"))
    //   const d = JSON.parse(c)
    //   setPlans(d)
    // }
    // else {
    //   setPlans(['Free'])
    // }
  }, [])

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
                                          selectedRange={selectedRange}
                                          setSelectedRange={setSelectedRange}
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