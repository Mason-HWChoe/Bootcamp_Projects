import Footer from '../components/Footer';
import { useSelectedDataContext } from '../store/SelectedItemsContext';
import styles from './DetailPage.module.css';

export default function DetailPage() {
  const { selectedData } = useSelectedDataContext();

  if (!selectedData) {
    return <div>캠핑장 정보가 없습니다.</div>;
  }

  return (
    <>
      <div
        className={`${styles.banner} d-flex justify-content-center align-items-center`}
      >
        <div className="container align-middle h-75">
          <div className={styles.title}>{selectedData.facltNm}</div>
          <div className={styles.subtitle}>
            {selectedData.featureNm.split('  ').length === 2
              ? selectedData.featureNm.split('  ')[0]
              : ''}
          </div>
          <hr className={styles.seperator} />
          {selectedData.themaEnvrnCl && (
            <span className={`${styles.tag} rounded-pill`}>태그</span>
          )}
          {selectedData.themaEnvrnCl &&
            selectedData.themaEnvrnCl
              .split(',')
              .map((item: string, index: number) => {
                return (
                  <span className={`${styles.tagName} ms-3`} key={index}>
                    #{item}
                  </span>
                );
              })}
        </div>
      </div>
      <hr className={styles.grayBar} />
      <div className="container mt-4 mb-5 d-flex">
        <div className={`${styles.imgContainer}`}>
          <img
            src={selectedData.firstImageUrl}
            className={`${styles.thumbnailImg} rounded`}
            alt={selectedData.facltNm}
          />
        </div>
        <div
          className={`${styles.detailInfo} ms-5 d-flex flex-column justify-content-evenly
`}
        >
          <table className="table mb-0">
            <tbody>
              <tr>
                <th scope="row">주소</th>
                <td>{selectedData.addr1}</td>
              </tr>
              <tr>
                <th scope="row">문의처</th>
                <td>{selectedData.tel}</td>
              </tr>
              <tr>
                <th scope="row">캠핑장 환경</th>
                <td>
                  {selectedData.lctCl} / {selectedData.facltDivNm}
                </td>
              </tr>
              <tr>
                <th scope="row">캠핑장 유형</th>
                <td>{selectedData.induty}</td>
              </tr>
              <tr>
                <th scope="row">운영기간</th>
                <td>{selectedData.operPdCl}</td>
              </tr>
              <tr>
                <th scope="row">운영일</th>
                <td>{selectedData.operDeCl}</td>
              </tr>
              <tr>
                <th scope="row">홈페이지</th>
                <td>
                  <a
                    href={selectedData.homepage}
                    className={styles.homepageLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    홈페이지 바로가기
                  </a>
                </td>
              </tr>
              <tr>
                <th scope="row">예약방법</th>
                <td>{selectedData.resveCl}</td>
              </tr>
              <tr>
                <th scope="row">주변이용가능시설</th>
                <td>{selectedData.posblFcltyCl}</td>
              </tr>
            </tbody>
          </table>
          <a
            href={selectedData.resveUrl}
            className="btn btn-outline-primary d-block fw-semibold"
            target="_blank"
            rel="noopener noreferrer"
          >
            예약하러 가기
          </a>
        </div>
      </div>

      <Footer />
    </>
  );
}
