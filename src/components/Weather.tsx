import { useWeatherAPI } from '../hooks/useWeather';
import { useSelectedDataContext } from '../store/SelectedItemsContext';
import styles from './Weather.module.css';

export default function Weather() {
  const { selectedData } = useSelectedDataContext();

  const latitude = selectedData?.mapY;
  const longitude = selectedData?.mapX;

  const url = 'https://api.openweathermap.org/data/3.0/onecall?';

  const { weatherData } = useWeatherAPI(url, latitude, longitude);

  if (!weatherData) {
    return <div>날씨정보를 불러오는 데 실패하였습니다.</div>;
  }

  const currentWeatherImg = weatherData.current.weather[0].icon;
  const currentWeatherDescription = weatherData.current.weather[0].description;
  const currentTemperature = weatherData.current.temp.toFixed(1);
  const currentWeather = weatherData.current.weather[0].description;

  const weatherSevenDays = weatherData.daily;

  const currentUnixTimestamp = weatherData.current.dt * 1000; // dt값을 밀리세컨드로 변환

  function convertTimestampToDayAndMonth(milliseconds: number) {
    const date = new Date(milliseconds);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return { day, month };
  }

  return (
    <div className={`${styles.weatherContainer} container rounded-pill`}>
      <div className="container d-flex justify-content-center mt-4 w-75">
        <div className={`${styles.weatherCard} card me-4 bg-warning`}>
          <h5 className="card-title text-center fw-bold mt-4">
            {convertTimestampToDayAndMonth(currentUnixTimestamp).month}월{' '}
            {convertTimestampToDayAndMonth(currentUnixTimestamp).day}일
          </h5>
          <div className={styles.imgWrapper}>
            <img
              src={`https://openweathermap.org/img/wn/${currentWeatherImg}@2x.png`}
              className="card-img-top"
              alt={currentWeatherDescription}
            />
          </div>
          <div className="card-body">
            <div className="card-title text-center fw-bold fs-5">
              현재기온
              <div className="fs-5 text-danger">{currentTemperature} °C</div>
            </div>
            <hr />
            <p className="card-title text-center fw-bold fs-6 mt-3">
              현재 날씨
            </p>
            <p className="card-text text-center fw-bold text-primary">
              {currentWeather}
            </p>
          </div>
        </div>
        {weatherSevenDays.map((_, index) => {
          if (index === 0) {
            return null;
          }
          const weatherImg = weatherData.daily[index].weather[0].icon;
          const nextDaystUnixTimestamp = weatherData.daily[index].dt * 1000;
          const nextDaysTemperature =
            weatherData.daily[index].temp.day.toFixed(1);
          const nextDaysWeather =
            weatherData.daily[index].weather[0].description;

          return (
            <div className={`${styles.weatherCard} card`} key={index}>
              <h5 className="card-title text-center fw-bold mt-4">
                {convertTimestampToDayAndMonth(nextDaystUnixTimestamp).month}월{' '}
                {convertTimestampToDayAndMonth(nextDaystUnixTimestamp).day}일
              </h5>
              <div className={styles.imgWrapper}>
                <img
                  src={`https://openweathermap.org/img/wn/${weatherImg}@2x.png`}
                  className="card-img-top"
                  alt="..."
                />
              </div>
              <div className="card-body">
                <div className="card-title text-center fw-bold fs-5">
                  예상기온
                  <div className="fs-5 text-danger">
                    {nextDaysTemperature} °C
                  </div>
                </div>
                <hr />
                <p className="card-title text-center fw-bold fs-6 mt-3">
                  예상 날씨
                </p>
                <p className="card-text text-center fw-bold text-primary">
                  {nextDaysWeather}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
