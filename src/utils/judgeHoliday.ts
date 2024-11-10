import { Dispatch, SetStateAction } from "react";

// 祝日、あるいは祝前日かを判断する関数
export const judgeHoliday = async ( setIsHoliday: Dispatch<SetStateAction<boolean | null>>, setIsTomorrowHoliday: Dispatch<SetStateAction<boolean | null>>, holidayError: string | null, setHolidayError: Dispatch<SetStateAction<string | null>> ) => {
  const today = new Date();

  // 今日が何年か
  const year = today.getFullYear();
  // toISOString: ISO 8601 形式の文字列に変換( "2024-09-30T05:30:00.000Z" 的なの)
  const todayString = today.toISOString().split('T')[0];

  // 明日が何年か
  const tomorrow = new Date(today);
  // ここで日付を1日進ませる
  tomorrow.setDate(today.getDate() + 1);
  const tomorrowYear = tomorrow.getFullYear();
  // 2024-10-1的なのを取得
  const tomorrowString = tomorrow.toISOString().split('T')[0];

  try {
    // 今日が祝日かどうか
    const todayRes = await fetch(`https://date.nager.at/api/v2/PublicHolidays/${year}/JP`);
    if (!todayRes.ok) {
      // throw: catchに渡す
      throw new Error('祝日情報を取得できませんでした。');
    }
    // 祝日一覧
    const todayHolidays = await todayRes.json();
    // some: 配列内の最低1つが、指定した条件を満たすか判定
    // 満たしていたらtrue
    const TodayBoolean = todayHolidays.some((holiday: any) => holiday.date === todayString);
    setIsHoliday(TodayBoolean);

    // 明日が祝日かどうか
    const tomorrowRes = await fetch(`https://date.nager.at/api/v2/PublicHolidays/${tomorrowYear}/JP`);
    if (!tomorrowRes.ok) {
      throw new Error('祝日情報を取得できませんでした。');
    }
    const tomorrowHolidays = await tomorrowRes.json();
    const TomorrowBoolean = tomorrowHolidays.some((holiday: any) => holiday.date === tomorrowString);
    setIsTomorrowHoliday(TomorrowBoolean);
  }

  // tryで発生したエラーをerrに格納
  // catchで捕まえたエラーは、unknown型を使うことが推奨
  catch (err: unknown) {
    // err instanceof Error: errがErrorオブジェクトのインスタンスか
    if (err instanceof Error) {
      setHolidayError(err.message);
    } 
    else {
      setHolidayError('予期せぬエラーが発生しました。');
    }
  }

  if (holidayError) console.log(holidayError)
}