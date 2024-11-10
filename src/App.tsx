import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Start from './pages/Start/Start';
import Home from './pages/Home/Home';
// import Register from './utils/Register';

import { useEffect, useState } from 'react';
import { getDate } from './utils/getDate';
import { getMyPosition } from './utils/getMyPosition';
import { judgeHoliday } from './utils/judgeHoliday';

const App = () => {
  const [hours, setHours] = useState<number | null>(null);
  const [minutes, setMinutes] = useState<number | null>(null);
  const [dayOfWork, setDayOfWork] = useState<number | null>(null);

  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [positionError, setPositionError] = useState<string | null>(null);

  const [isHoliday, setIsHoliday] = useState<boolean | null>(null);
  const [isTomorrowHoliday, setIsTomorrowHoliday] = useState<boolean | null>(null);
  const [holidayError, setHolidayError] = useState<string | null>(null);
  
  // リロード時、改めて取得
  useEffect(() => {
    getDate(setHours, setMinutes, setDayOfWork);
    getMyPosition(setLatitude, setLongitude, positionError, setPositionError);
    judgeHoliday(setIsHoliday, setIsTomorrowHoliday, holidayError, setHolidayError);
	}, []);

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
                                      positionError={positionError}
                                      setPositionError={setPositionError}
                                      setIsHoliday={setIsHoliday}
                                      setIsTomorrowHoliday={setIsTomorrowHoliday}
                                      holidayError={holidayError}
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
                                          holidayError={holidayError}
                                          setHolidayError={setHolidayError}
                                         />
                                      }
            />
          {/* <Route path='/register' element={<Register />}/> */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;