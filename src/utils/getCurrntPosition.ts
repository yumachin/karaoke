import { Dispatch, SetStateAction } from "react";

// 現在地を取得する関数
export const getCurrentPosition = (setLatitude: Dispatch<SetStateAction<number | null>>, setLongitude: Dispatch<SetStateAction<number | null>>, setPointError: Dispatch<SetStateAction<string | null>>) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(parseFloat(position.coords.latitude.toFixed(14)));
        setLongitude(parseFloat(position.coords.longitude.toFixed(14)));
        setPointError(null);
      },
      (err) => {
        setPointError("現在地を取得できませんでした。エラーコード: " + err.code);
        setLatitude(null);
        setLongitude(null);
      }
    );
  } 
  else {
    setPointError("このブラウザは位置情報取得をサポートしていません。");
  }
};