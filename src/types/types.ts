import { Dispatch, SetStateAction } from "react";

export interface HeaderProps {
    rangeOpen: boolean;
    setRangeOpen: Dispatch<SetStateAction<boolean>>;
    range: number;
    setRange: Dispatch<SetStateAction<number>>;
}

export interface NavbarProps {
    hours: number | null;
    setHours: Dispatch<SetStateAction<number | null>>;
    minutes: number | null;
    setMinutes: Dispatch<SetStateAction<number | null>>;
    dayOfWork:  number | null;
    setDayOfWork: Dispatch<SetStateAction<number | null>>;
    isHoliday: boolean | null;
    setIsHoliday: Dispatch<SetStateAction<boolean | null>>;
    isTomorrowHoliday: boolean | null;
    setIsTomorrowHoliday: Dispatch<SetStateAction<boolean | null>>;
    holidayError: string | null;
    setHolidayError: Dispatch<SetStateAction<string | null>>;
    planOpen: boolean;
    setPlanOpen: Dispatch<SetStateAction<boolean>>;
    timeOpen: boolean;
    setTimeOpen: Dispatch<SetStateAction<boolean>>;
    placeOpen: boolean;
    setPlaceOpen: Dispatch<SetStateAction<boolean>>;
    setPlans: Dispatch<SetStateAction<string[]>>
    place: string;
    setPlace:  Dispatch<SetStateAction<string>>;
}

export interface StartProps {
    setHours: Dispatch<SetStateAction<number | null>>;
    setMinutes: Dispatch<SetStateAction<number | null>>;
    setDayOfWork: Dispatch<SetStateAction<number | null>>;
    setLatitude: Dispatch<SetStateAction<number | null>>;
    setLongitude: Dispatch<SetStateAction<number | null>>;
    positionError: string | null;
    setPositionError: Dispatch<SetStateAction<string | null>>;
    setIsHoliday: Dispatch<SetStateAction<boolean | null>>;
    setIsTomorrowHoliday: Dispatch<SetStateAction<boolean | null>>;
    holidayError: string | null;
    setHolidayError: Dispatch<SetStateAction<string | null>>;
}

export interface HomeProps {
    hours: number | null;
    setHours: Dispatch<SetStateAction<number | null>>;
    minutes:  number | null;
    setMinutes: Dispatch<SetStateAction<number | null>>;
    dayOfWork:  number | null;
    setDayOfWork: Dispatch<SetStateAction<number | null>>;
    latitude:  number | null;
    longitude:  number | null;
    isHoliday: boolean | null;
    setIsHoliday: Dispatch<SetStateAction<boolean | null>>;
    isTomorrowHoliday: boolean | null;
    setIsTomorrowHoliday: Dispatch<SetStateAction<boolean | null>>;
    holidayError: string | null;
    setHolidayError: Dispatch<SetStateAction<string | null>>;
}

export interface StoreListProps {
    hours: number | null;
    minutes:  number | null;
    dayOfWork:  number | null;
    latitude:  number | null;
    longitude:  number | null;
    isHoliday: boolean | null;
    isTomorrowHoliday: boolean | null;
    plans: string[];
    place: string;
    rangeValue: number;
}

export interface DtProps {
    name: string;
    price: number;
    place: string;
    kind: string;
    available: string;
    deadLine: string;
    position: number[]
  }