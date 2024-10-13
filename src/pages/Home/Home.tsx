import { useEffect, useState } from 'react'

import Header from '../../components/Header/Header'
import StoreList from '../../components/StoreList/StoreList'
import Navbar from '../../components/Navbar/Navbar'

import { HomeProps } from '../../types/types'

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
                                     setHolidayError,
                                     plans,
                                     setPlans,
                                     rangeValue,
                                     setRangeValue,
                                     selectedRange,
                                     setSelectedRange }) => 
{
  const [planOpen, setPlanOpen] = useState<boolean>(false)
  const [timeOpen, setTimeOpen] = useState<boolean>(false)
  const [spotOpen, setSpotOpen] = useState<boolean>(false)
  const [rangeOpen, setRangeOpen] = useState<boolean>(false)
  const lsPlace = localStorage.getItem('place')
  const initialPlace: string = lsPlace ? lsPlace : "選択しない";

  const [place, setPlace] = useState(initialPlace);
  
  useEffect(() => {
    if (localStorage.getItem("place")) {
      const e = String(localStorage.getItem("place"))
      setPlace(e)
    }
    else {
      setPlace("選択しない")
    }
  }, [])

  return (
    <div className='background'>
      <Header rangeOpen={rangeOpen} setRangeOpen={setRangeOpen} rangeValue={rangeValue} setRangeValue={setRangeValue} selectedRange={selectedRange} setSelectedRange={setSelectedRange} />
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
        rangeValue={rangeValue}
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
        setHolidayError={setHolidayError}
        planOpen={planOpen} 
        setPlanOpen={setPlanOpen} 
        timeOpen={timeOpen} 
        setTimeOpen={setTimeOpen} 
        spotOpen={spotOpen} 
        setSpotOpen={setSpotOpen}
        setPlans={setPlans}
        place={place}
        setPlace={setPlace}
      />
    </div>
  )
}

export default Home