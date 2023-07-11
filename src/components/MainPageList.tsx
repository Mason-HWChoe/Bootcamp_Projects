import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import styles from './MainPageList.module.css';

export default function MainPageList() {
  const CAMPING_API_KEY = process.env.REACT_APP_CAMPING_API_KEY;
  const url = `https://apis.data.go.kr/B551011/GoCamping/basedList?serviceKey=${CAMPING_API_KEY}&numOfRows=12&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json`;

  const { data, isLoading } = useFetch(url);

  if (isLoading) {
    return (
      <div className="spinner-border text-success m-5" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  return (
    <div className={`${styles.recommendContainer} rounded-4`}>
      <div className="fs-1 fw-bold text-center mt-5">오늘의 추천 캠핑장</div>
      <div className="text-center mt-3">
        <button
          type="button"
          className="btn btn-lg btn-outline-success fw-bold"
        >
          <Link to="/search" className={styles.customLink}>
            전체 캠핑장 보러가기
          </Link>
        </button>
      </div>

      <div className="container mt-5">
        <div className="row">
          {data.map((item) => (
            <div className="col-md-3" key={item.contentId}>
              <div className="card mb-5">
                <div className={styles.imgWrapper}>
                  <img
                    src={item.firstImageUrl}
                    className="card-img-top"
                    alt={item.facltNm}
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{item.facltNm}</h5>
                  <p className={`${styles.description} card-text`}>
                    {item.intro ? item.intro : item.featureNm}
                  </p>
                  <a
                    href={item.homepage}
                    className="btn btn-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    홈페이지 바로가기
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
