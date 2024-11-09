// number|undefinedは返り値の型
const calculateDistance = ( curLatitude: number|null, curLongitude: number|null, tarLatitude: number, tarLongitude: number ): number|undefined => {
	if (curLatitude !== null && curLongitude !== null) {
		
		// 地球の半径 (km)
		const radius = 6378.137;

		//緯度と経度の差を、度からラジアンへ変換
		const radLatitude = (tarLatitude - curLatitude) * (Math.PI / 180);
		const radLongitude = (tarLongitude - curLongitude) * (Math.PI / 180);

		//ハーサイン( Haversin )の公式
		const tempHaversin = 
		Math.sin(radLatitude / 2) * Math.sin(radLatitude / 2) +
		Math.cos(curLatitude * (Math.PI / 180)) * Math.cos(tarLatitude * (Math.PI / 180)) * 
		Math.sin(radLongitude / 2) * Math.sin(radLongitude / 2);
		const haversin = 2 * Math.atan2(Math.sqrt(tempHaversin), Math.sqrt(1 - tempHaversin));

		// 距離計算
		const distance = radius * haversin;
		return Math.round(distance * 100) / 100;
	}
};

export default calculateDistance;