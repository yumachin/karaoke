import { Dispatch, SetStateAction } from "react";

// 今日の時間と曜日を取得する関数
export const getDate = (setHours: Dispatch<SetStateAction<number | null>>, setMinutes: Dispatch<SetStateAction<number | null>> , setDayOfWork: Dispatch<SetStateAction<number | null>>) => {
  const today = new Date();
  setHours(today.getHours());
  setMinutes(today.getMinutes());
  setDayOfWork(today.getDay()); // 曜日 ([0(日曜日), 1(月曜日), 2(火曜日), 3(水曜日), 4(木曜日), 5(金曜日), 6(土曜日)])
};