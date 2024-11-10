import { Dispatch, SetStateAction, } from "react";

export const getMyPosition = ( setLatitude: Dispatch<SetStateAction<number | null>>, setLongitude: Dispatch<SetStateAction<number | null>>, positionError: string | null, setPositionError: Dispatch<SetStateAction<string | null>> ) => {

  // navigator.geolocation: ブラウザのAPI
  if (navigator.geolocation) {
    // getCurrentPosition(成功時の挙動, 失敗時の挙動, オプション)という形で記述
    navigator.geolocation.getCurrentPosition(

      // 位置情報が取得できた時
      (position) => {
        // positionオブジェクトのcoordsプロパティに緯度と経度が格納
        // 数値に対して小数点以下の桁数を指定して、数値を文字列に変換
        setLatitude(parseFloat(position.coords.latitude.toFixed(14)));
        setLongitude(parseFloat(position.coords.longitude.toFixed(14)));
        setPositionError(null);
      },

      // 取得できなかった時
      (err) => {
        setPositionError("現在地を取得できませんでした。エラーコード: " + err.code);
        setLatitude(null);
        setLongitude(null);
      },

      // 精度の調整
      { enableHighAccuracy: true }
    );
  }

  // APIがサポートされていないブラウザの場合
  else {
    setPositionError(" このブラウザは位置情報取得をサポートしていません。");
  }

  if (positionError) console.log(positionError);
};