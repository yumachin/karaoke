import { Dispatch, SetStateAction } from "react";

// 祝日、あるいは祝前日かを判断する関数
export const judgeHoliday = async (setIsHoliday: Dispatch<SetStateAction<boolean | null>>, setIsTomorrowHoliday: Dispatch<SetStateAction<boolean | null>>, setHolidayError: Dispatch<SetStateAction<string | null>>) => {
  const today = new Date();
  // 今日
  const year = today.getFullYear();
  const todayString = today.toISOString().split('T')[0]; //2024-9-30的なのを取得
  // 明日
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const tomorrowYear = tomorrow.getFullYear();
  const tomorrowString = tomorrow.toISOString().split('T')[0]; //2024-10-1的なのを取得
  
  // デバッグ用
  //console.log(`Year: ${year}, Tomorrow Year: ${tomorrowYear}`); 
  //console.log(typeof year, typeof tomorrowYear); 

  try {
    // 今日
    const todayResponse = await fetch(`https://date.nager.at/api/v2/PublicHolidays/${year}/JP`);
    if (!todayResponse.ok) {
      throw new Error('祝日情報を取得できませんでした。');
    }
    const todayHolidays = await todayResponse.json();
    const TodayBoolean = todayHolidays.some((holiday: any) => holiday.date === todayString); //祝日APIの情報と今日がマッチするかどうか
    setIsHoliday(TodayBoolean); //祝日ならtrue

    // 明日
    const tomorrowResponse = await fetch(`https://date.nager.at/api/v2/PublicHolidays/${tomorrowYear}/JP`);
    if (!tomorrowResponse.ok) {
      throw new Error('祝日情報を取得できませんでした。');
    }
    const tomorrowHolidays = await tomorrowResponse.json();
    const TomorrowBoolean = tomorrowHolidays.some((holiday: any) => holiday.date === tomorrowString); //祝日APIの情報と明日がマッチするかどうか
    setIsTomorrowHoliday(TomorrowBoolean); //祝日ならtrue
  } 
  // エラー処理
  catch (err :unknown) {
    if (err instanceof Error) {
      setHolidayError(err.message);
    } 
    else {
      setHolidayError('予期せぬエラーが発生しました。');
    }
  };
}