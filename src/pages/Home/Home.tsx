import { useState } from 'react';

import Header from '../../components/Header/Header';
import StoreList from '../../components/StoreList/StoreList';
import Navbar from '../../components/Navbar/Navbar';

import { HomeProps } from '../../types/types';

const Home: React.FC<HomeProps> = ({ hours, 
                                     setHours,
                                     minutes, 
                                     setMinutes,
                                     dayOfWork,
                                     setDayOfWork,
                                     latitude, 
                                     longitude, 
                                     isHoliday,
                                     setIsHoliday,
                                     isTomorrowHoliday, 
                                     setIsTomorrowHoliday,
                                     holidayError,
                                     setHolidayError }) => 
{
  const initialRange: number = localStorage.getItem('range') ? Number(localStorage.getItem('range')) : 1;
  const initialPlace: string = localStorage.getItem('place') ? String(localStorage.getItem('place')) : "選択しない";

  const [range, setRange] = useState<number>(initialRange);
  const [place, setPlace] = useState<string>(initialPlace);

  const [plans, setPlans] = useState<string[]>(['Free']);
  
  const [planOpen, setPlanOpen] = useState<boolean>(false);
  const [timeOpen, setTimeOpen] = useState<boolean>(false);
  const [placeOpen, setPlaceOpen] = useState<boolean>(false);
  const [rangeOpen, setRangeOpen] = useState<boolean>(false);

  return (
    <>
      <Header rangeOpen={rangeOpen} setRangeOpen={setRangeOpen} range={range} setRange={setRange} />
      <StoreList 
        hours={hours} 
        minutes={minutes} 
        dayOfWork={dayOfWork} 
        latitude={latitude} 
        longitude={longitude}
        isHoliday={isHoliday}
        isTomorrowHoliday={isTomorrowHoliday}
        plans={plans}
        place={place}
        rangeValue={range}
      />
      <Navbar 
        hours={hours} 
        setHours={setHours}
        minutes={minutes} 
        setMinutes={setMinutes}
        dayOfWork={dayOfWork}
        setDayOfWork={setDayOfWork} 
        isHoliday={isHoliday}
        setIsHoliday={setIsHoliday}
        isTomorrowHoliday={isTomorrowHoliday}
        setIsTomorrowHoliday={setIsTomorrowHoliday}
        holidayError={holidayError}
        setHolidayError={setHolidayError}
        planOpen={planOpen} 
        setPlanOpen={setPlanOpen} 
        timeOpen={timeOpen} 
        setTimeOpen={setTimeOpen} 
        placeOpen={placeOpen} 
        setPlaceOpen={setPlaceOpen}
        setPlans={setPlans}
        place={place}
        setPlace={setPlace}
      />
    </>
  );
};

export default Home;