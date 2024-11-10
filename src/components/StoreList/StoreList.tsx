import { Box, Card, CardContent, CardMedia, Stack, Typography, useMediaQuery } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import jankara from '../../assets/Jankara.jpg';
import superJankara from '../../assets/SuperJankara.jpg';
import selfJankara from '../../assets/SelfJankara.png';
import jajaankara from '../../assets/Jajaankara.jpg';
import brick from '../../assets/brick.jpg';

import { FaExchangeAlt } from "react-icons/fa";

import calculateDistance from '../../utils/calculateDistance';

import { DtProps, StoreListProps } from '../../types/types';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

import { useEffect, useState } from 'react';


const StoreList: React.FC<StoreListProps> = ({ hours, 
																							 minutes, 
																							 dayOfWork, 
																							 latitude, 
																							 longitude, 
																							 isHoliday, 
																							 isTomorrowHoliday, 
																							 plans, 
																							 place, 
																							 rangeValue
																						  }) => 
{
  const [specfyCollection, setSpecifyCollection] = useState('');
  const [specifyDocument, setSpecifyDocument] = useState('');
  const [specifyPlans, setSpecifyPlans] = useState<{ [key: string]: any }[]>([]);
  const [getDBError, setGetDBError] = useState(false);
	const [sortToggle, setSortToggle] = useState(false);
	const [loading, setLoading] = useState(false);

	const images: { [key: number]: string } = {
		1: jankara,
		2: superJankara,
		3: selfJankara,
		4: jajaankara
	}

	const userLocation = {latitude, longitude};

	// 画面幅が1050px以上の場合にisPcをtrueに
  const isPc = useMediaQuery('(min-width: 1050px)');

  // コレクションの確定
  useEffect(() => {
    if (hours === 0) setSpecifyCollection("23:00~1:30");
    else if (hours === 4) setSpecifyCollection("3:30~5:00");
    else if (hours === 5) setSpecifyCollection("5:00~7:00");
    else if (hours === 6) setSpecifyCollection("5:00~7:00");
    else if (hours === 7) setSpecifyCollection("7:00~8:00");
    else if (hours === 8) setSpecifyCollection("8:00~10:00");
    else if (hours === 9) setSpecifyCollection("8:00~10:00");
    else if (hours === 10) setSpecifyCollection("10:00~11:00");
		else if (hours === 14) setSpecifyCollection("14:00~15:00");
		else if (hours === 19) setSpecifyCollection("19:00~20:00");
    else if (hours === 23) setSpecifyCollection("23:00~1:30");
    else if (minutes !== null) {
			if (hours === 1 && minutes <= 29) setSpecifyCollection("23:00~1:30");
			else if (hours === 1 && minutes >= 30) setSpecifyCollection("1:30~2:00");
      else if (hours === 2 && minutes <= 29) setSpecifyCollection("2:00~2:30");
      else if (hours === 2 && minutes >= 30) setSpecifyCollection("2:30~3:00");
      else if (hours === 3 && minutes <= 29) setSpecifyCollection("3:00~3:30");
      else if (hours === 3 && minutes >= 30) setSpecifyCollection("3:30~5:00");
			else if (hours === 11 && minutes <= 29) setSpecifyCollection("11:00~11:30");
			else if (hours === 11 && minutes >= 30) setSpecifyCollection("11:30~12:00");
      else if (hours === 12 && minutes <= 29) setSpecifyCollection("12:00~12:30");
      else if (hours === 12 && minutes >= 30) setSpecifyCollection("12:30~13:00");
      else if (hours === 13 && minutes <= 29) setSpecifyCollection("13:00~13:30");
      else if (hours === 13 && minutes >= 30) setSpecifyCollection("13:30~14:00");
      else if (hours === 15 && minutes <= 29) setSpecifyCollection("15:00~15:30");
      else if (hours === 15 && minutes >= 30) setSpecifyCollection("15:30~16:00");
      else if (hours === 16 && minutes <= 29) setSpecifyCollection("16:00~16:30");
      else if (hours === 16 && minutes >= 30) setSpecifyCollection("16:30~17:30");
      else if (hours === 17 && minutes <= 29) setSpecifyCollection("16:30~17:30");
      else if (hours === 17 && minutes >= 30) setSpecifyCollection("17:30~18:00");
			else if (hours === 18 && minutes <= 29) setSpecifyCollection("18:00~18:30");
			else if (hours === 18 && minutes >= 30 && minutes <= 44) setSpecifyCollection("18:30~18:45");
			else if (hours === 18 && minutes >= 45) setSpecifyCollection("18:45~19:00");
      else if (hours === 20 && minutes <= 44) setSpecifyCollection("20:00~20:45");
      else if (hours === 20 && minutes >= 45) setSpecifyCollection("20:45~21:00");
      else if (hours === 21 && minutes <= 44) setSpecifyCollection("21:00~21:45");
      else if (hours === 21 && minutes >= 45) setSpecifyCollection("21:45~22:00");
      else if (hours === 22 && minutes <= 44) setSpecifyCollection("22:00~22:45");
      else if (hours === 22 && minutes >= 45) setSpecifyCollection("22:45~23:00");
    }
  }, [hours, minutes]);

  // ドキュメントの確定
  useEffect(() => {
    if (isHoliday) setSpecifyDocument("HoliDay");
    else if (isTomorrowHoliday) setSpecifyDocument('BeforeHoliDay');
    else {
      if (dayOfWork === 0) setSpecifyDocument("SunDay");
      else if (dayOfWork === 5) setSpecifyDocument('FriDay');
      else if (dayOfWork === 6) setSpecifyDocument("SaturDay");
      else setSpecifyDocument('WeekDay');
    }
  }, [dayOfWork, isHoliday, isTomorrowHoliday]);

	// 店舗リストの作成
  useEffect(() => {
    const getData = async () => {
			// 店舗取得が終了するまではローディング表示
			setLoading(true);

			// 全店舗取得
			if (place === "選択しない" && specfyCollection && specifyDocument) {
				// どのコレクションのどのドキュメントにするのかを指定
				const docu = doc(db, specfyCollection, specifyDocument);
				setGetDBError(false);
				try {
					// ドキュメントを取得
					const document = await getDoc(docu);
					if (document.exists()) {
						// data: {3HourPack: Array(1), Free: Array(30), EndlessFree: Array(6), 30minutes: Array(79)}
						const data = document.data();
						const newPlans: { [key: string]: any }[] = [];
						// 近い順にソートするために用いる
						const distanceArry: number[] = [];
						plans.forEach((plan) => {
							// planは変数のため、[plan]でプロパティにアクセス
							if ( data[plan] ) {
								data[plan].map((dt: DtProps) => {
									// 現在地と店舗との距離を算出
									let distance = calculateDistance(userLocation.latitude, userLocation.longitude, dt.position[0], dt.position[1]);
									if (distance !== undefined && distance <= rangeValue) {
										newPlans.push(dt);
										distanceArry.push(distance);
										// 料金順
										if (!sortToggle) {
											// (a.price - b.price)が負のときaが前に来る
											newPlans.sort((a, b) => a.price - b.price);
										}
										// 近い順
										else {
											for (let i = 0; i < newPlans.length - 1; i++) {
												for (let j = 0; j < newPlans.length - 1 - i; j++) {
													if (distanceArry[j] > distanceArry[j + 1]) {
														// 一旦格納
														const temp_store = newPlans[j];
														const temp_distance = distanceArry[j];

														// 順番チェンジ➀
														newPlans[j] = newPlans[j + 1];
														distanceArry[j] = distanceArry[j + 1];
														// 順番チェンジ➁
														newPlans[j + 1] = temp_store;
														distanceArry[j + 1] = temp_distance;
													}
												}
											}
										}
									}
								})
							}
						});	
						setSpecifyPlans(newPlans);
					}
					else {
						console.log("コレクション、あるいはドキュメントが存在しません。");
					}
				}
				catch (err) {
					console.error("ドキュメント取得時にエラーが起きました。: ", err);
					setGetDBError(true);
				}
				finally {
					setLoading(false);
				}
			}
			else {
				if (specfyCollection && specifyDocument) {
					const docu = doc(db, specfyCollection, specifyDocument);
					setGetDBError(false);
					try {
						const document = await getDoc(docu);
						if (document.exists()) {
							const data = document.data();
							const newPlans: { [key: string]: any }[] = [];
							const distanceArry: number[] = [];
							plans.forEach((plan) => {
								if ( data[plan] ) {
									data[plan].map((dt: DtProps) => {
										let distance = calculateDistance(userLocation.latitude, userLocation.longitude, dt.position[0], dt.position[1]);
										if (distance !== undefined && distance <= rangeValue && dt.place === place) {
											distanceArry.push(distance);
											newPlans.push(dt);
											if (!sortToggle) newPlans.sort((a, b) => a.price - b.price);
											else {
												for (let i = 0; i < newPlans.length - 1; i++) {
													for (let j = 0; j < newPlans.length - 1 - i; j++) {
														if (distanceArry[j] > distanceArry[j + 1]) {
															const temp_store = newPlans[j];
															const temp_distance = distanceArry[j];
															newPlans[j] = newPlans[j + 1];
															distanceArry[j] = distanceArry[j + 1];
															newPlans[j + 1] = temp_store;
															distanceArry[j + 1] = temp_distance;
														}
													}
												}
											}
										}
									})
								}
							});
							setSpecifyPlans(newPlans);
						}
						else {
							console.log("コレクション、あるいはドキュメントが存在しません。");
						}
					}
					catch (err) {
						console.error("ドキュメント取得時にエラーが起きました。: ", err);
						setGetDBError(true);
					}
					finally {
						setLoading(false);
					}
				}
			}
    };
    getData();
  }, [specfyCollection, specifyDocument, plans, place, rangeValue, sortToggle, userLocation.latitude, userLocation.longitude])


  return (
		<>
			{/* ローディング */}
			{loading ? (
				<Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} spacing={10}>
					<Box sx={{ pb: '20vh' }}></Box>    
					<Typography sx={{ mb: 5, fontFamily: "Reggae One", fontSize: 25 }}>loading...</Typography>
					<CircularProgress size={120} color='secondary'/>
				</Stack>
				) : (
		//{/* ローディング */}

				<>
					{/* 上部スペース(Header用) */}
						<Box sx={{ pb: '8vh' }}></Box>    
					{/* 上部スペース(Header用) */}

					{/*件数表示*/}
						<Box 
							position='fixed'
							width='100%'
							zIndex={100}
							display='flex' 
							justifyContent='center' 
							alignItems='center' 
							gap={2}
							sx={{
								background: '#FFE261', 
								pt: '1.3vh'
							}} 
						>
							{getDBError || specifyPlans.length === 0 ? (
								<>
									<Typography sx={{ fontWeight: 'bold', fontFamily: "Reggae One", fontSize: 18, color:'red' }}>0件</Typography>
									<Typography sx={{ fontFamily: "Reggae One", fontSize: 13 }}>です。</Typography>
									<FaExchangeAlt style={{ fontSize: 18, position: 'absolute', top: 12, right: 30 }} onClick={() => setSortToggle(prev => !prev)}/>
								</>
							) : (
								<>
									<Typography sx={{ fontFamily: "Reggae One", fontSize: 13 }}>利用可能な店舗が</Typography>
									<Typography sx={{ fontWeight: 'bold', fontFamily: "Reggae One", fontSize: 20, color:'red' }}>{specifyPlans.length}件</Typography>
									<Typography sx={{ fontFamily: "Reggae One", fontSize: 13 }}>見つかりました！</Typography>
									<FaExchangeAlt style={{ fontSize: 18, position: 'absolute', top: 15, right: 15 }} onClick={() => setSortToggle(prev => !prev)}/>
								</>
							)}
						</Box>
					{/*件数表示*/}

					{/* 上部スペース(件数用) */}
						<Box sx={{ pb: '5vh' }}></Box>    
					{/* 上部スペース(件数用) */}

					{/*カード情報*/}
						{getDBError || specifyPlans.length === 0 ?
						// DBデータを取得できなかった時 or ヒットした店舗が０件のとき
							(
								<>
									<Typography variant='h4' sx={{ fontWeight: 'bold', mt: '5px', mb: '10px', ml: '2px' }}>Not Found.</Typography>
									<Typography variant='body1' sx={{ color: 'text.secondary', ml: '2px' }}>利用できる店舗はありません。</Typography>
									<Typography variant='body1' sx={{ color: 'text.secondary', ml: '2px' }}>Plan又はTimeを設定・変更してください。</Typography>
								</>
							) : 
							// DBデータを取得できた時 and １件以上店舗ヒットしたとき
							(
								<>
									{!isPc ? 
									// スマホ画面におけるスタイル
										(
											<>
												{specifyPlans.map((specifyPlan, index) => {
													return (
														<Card
															key={index}
															sx={{ 
																display: 'flex',
																alignItems: 'center',
																gap: '5vw',
																position: 'relative',
																overflow: 'hidden',
																'&::before': {
																	content: '""',
																	position: 'absolute',
																	top: 0,
																	left: 0,
																	right: 0,
																	bottom: 0,
																	backgroundImage: `url(${brick})`,
																	backgroundSize: 'cover',
																	backgroundPosition: 'center',
																	opacity: 0.25,
																	zIndex: 0
																}
															}}
														>
															<Stack flexDirection='row' sx={{ alignItems: 'center', zIndex: '1' }}>
																<Typography 
																	variant='h6' 
																	sx={{ ml: '3vw', fontWeight: 'bold' }}
																>
																	{index+1}
																</Typography>
																<CardMedia
																	component="img"
																	image={images[specifyPlan.kind]}
																	alt="ロゴ"
																	sx={{ 
																		width: 80,          
																		height: 80,
																		borderRadius: '50%',
																		objectFit: 'contain',
																		ml: '3vw'
																	}}
																/>
															</Stack>
															<Box sx={{ display: 'flex', flexDirection: 'column', zIndex: '1' }}>
																<CardContent >
																	{specifyPlan.name.length <= 12 ?
																		<Typography variant="body1" sx={{ fontWeight: 'bold' }}>
																			{specifyPlan.name}
																		</Typography> :
																	specifyPlan.name.length <= 15 ?
																		<Typography sx={{ fontWeight: 'bold', fontSize: 15 }}>
																			{specifyPlan.name}
																		</Typography> :
																		<Typography sx={{ fontWeight: 'bold', fontSize: 13.3 }}>
																			{specifyPlan.name}
																	</Typography>
																	}
																	<Box sx={{ ml: '4vw' }}>
																		<Typography variant='body2' sx={{ color: 'text.secondary' }}>
																			{specifyPlan.available}
																		</Typography>
																		<Box display='flex' flexDirection='row' gap='5px'>
																			<Typography variant='body2' sx={{ color: 'text.secondary' }}>
																				現在地から約
																			</Typography>
																			<Typography variant='body2' sx={{ fontWeight: 'bold', color: 'text.secondary' }}>
																				{calculateDistance(userLocation.latitude, userLocation.longitude, specifyPlan.position[0], specifyPlan.position[1])} 
																			</Typography>
																			<Typography variant='body2' sx={{ color: 'text.secondary' }}>
																				km
																			</Typography>
																		</Box>
																	</Box>
																	<Typography
																		variant="h6"
																		sx={{ fontWeight: 'bold', ml: '35vw', mt: '1vh', fontFamily: "Reggae One" }}
																	>
																		￥{specifyPlan.price}
																	</Typography>
																</CardContent>
															</Box>
														</Card>
													)
												})}
											</>
										) : 
									// スマホ画面におけるスタイル

									// PC画面におけるスタイル
										(
											<div>
												<Stack 
													display="flex"
													direction="row" 
													justifyContent='center'
													spacing={1}
													useFlexGap 
													flexWrap="wrap"
													sx={{ zIndex: 2 }}
												>
													{specifyPlans.map((specifyPlan, index) => {
														return (
															<Card
																key={index}
																sx={{ 
																	display: 'flex', 
																	alignItems: 'center', 
																	gap: '5vw', 
																	width: '49vw',
																	position: 'relative', 
																	overflow: 'hidden',
																	'&::before': {
																		content: '""',
																		position: 'absolute',
																		top: 0,
																		left: 0,
																		right: 0,
																		bottom: 0,
																		backgroundImage: `url(${brick})`,
																		backgroundSize: 'cover',
																		backgroundPosition: 'center',
																		opacity: 0.2, 
																		zIndex: 0
																	}
																}}
															>
																<Stack flexDirection='row' sx={{ alignItems: 'center', zIndex: '1' }}>
																	<Typography 
																		variant='h6' 
																		sx={{ ml: '2vw', fontWeight: 'bold', fontSize: '4vh' }}
																	>
																		{index+1}
																	</Typography>
																	<CardMedia
																		component="img"
																		image={images[specifyPlan.kind]}
																		alt="ロゴ"
																		sx={{ 
																			width: 90,          
																			height: 90,
																			borderRadius: '50%',
																			objectFit: 'contain',
																			ml: '3vw'
																		}}
																	/>
																</Stack>
																<Box sx={{ display: 'flex', flexDirection: 'column', zIndex: '1' }}>
																	<CardContent >
																		<Typography variant="h6" sx={{ fontWeight: 'bold' }}>
																			{specifyPlan.name}
																		</Typography>
																		<Box sx={{ ml: '3vw' }}>
																			<Typography variant='body1'sx={{ color: 'text.secondary' }}>
																				{specifyPlan.available}
																			</Typography>
																			<Box display='flex' flexDirection='row' gap='15px'>
																				<Typography variant='body1' sx={{ color: 'text.secondary' }}>
																					現在地から約
																				</Typography>
																				<Typography variant='body1' sx={{ color: 'text.secondary', fontWeight: 'bold' }}>
																					{calculateDistance(userLocation.latitude, userLocation.longitude, specifyPlan.position[0], specifyPlan.position[1])}
																				</Typography>
																				<Typography variant='body1' sx={{ color: 'text.secondary' }}>
																					km
																				</Typography>
																			</Box>
																		</Box>
																		<Typography
																			variant="h5"
																			sx={{ fontWeight: 'bold', ml: '15vw', mt: '1vh' }}
																		>
																			￥{specifyPlan.price}
																		</Typography>
																	</CardContent>
																</Box>
															</Card>
														)
													})}

													{/* 店舗数が奇数の時、スペースを埋める */}
													{specifyPlans.length % 2 === 1 && 
														(
															<Card
																sx={{ 
																	display: 'flex', 
																	alignItems: 'center', 
																	gap: '5vw', 
																	width: '49vw',
																	position: 'relative', 
																	overflow: 'hidden',
																	'&::before': {
																		content: '""',
																		position: 'absolute',
																		top: 0,
																		left: 0,
																		right: 0,
																		bottom: 0,
																		backgroundImage: `url(${brick})`,
																		backgroundSize: 'cover',
																		backgroundPosition: 'center',
																		opacity: 0.2, 
																		zIndex: 0
																	}
																}}
															>
																<Stack flexDirection='row' sx={{ alignItems: 'center', zIndex: '1' }}>
																	<Typography 
																		variant='h6' 
																		sx={{ ml: '2vw', fontWeight: 'bold', fontSize: '4vh' }}
																	>
																	</Typography>
																	<CardMedia
																		sx={{ 
																			width: 90,          
																			height: 90,
																			borderRadius: '50%',
																			objectFit: 'contain',
																			ml: '3vw'
																		}}
																	/>
																</Stack>
																<Box sx={{ display: 'flex', flexDirection: 'column', zIndex: '1' }}>
																	<CardContent>
																		<Typography
																			variant="h6" 
																			sx={{ fontWeight: 'bold' }}
																		>
																		</Typography>
																		<Box sx={{ ml: '3vw' }}>
																			<Typography
																				variant='body1'
																				sx={{ color: 'text.secondary' }}
																			>
																			</Typography>
																			<Typography
																				variant='body1'
																				sx={{ color: 'text.secondary' }}
																			>
																			</Typography>
																		</Box>
																		<Typography
																			variant="h5"
																			sx={{ fontWeight: 'bold', ml: '15vw', mt: '1vh' }}
																		>
																		</Typography>
																	</CardContent>
																</Box>
															</Card>
														) 
													}
												</Stack>
											</div>
										)
									// PC画面におけるスタイル

									}
								</>
							)
						}
					{/*カード情報*/}

					{/* 下部スペース(footer用) */}
						<Box sx={{ pt: '9.5vh' }}></Box>  
					{/* 下部スペース(footer用) */}
				</>
				)
			}
		</>
  );
};
export default StoreList;