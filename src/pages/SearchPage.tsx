import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import MyCalendar from '../components/Calendar';
import Footer from '../components/Footer';
import SearchBox from '../components/SearchBox';
import { Item, useFetch } from '../hooks/useFetch';
import { useSelectedDataContext } from '../store/SelectedItemsContext';
import styles from './SearchPage.module.css';

export default function SearchPage() {
  const itemsPerPage = 10;
  const pagesToShow = 10;
  const initialPage = 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const scrollRef = useRef<HTMLDivElement>(null);

  const CAMPING_API_KEY = process.env.REACT_APP_CAMPING_API_KEY;

  const url = `https://apis.data.go.kr/B551011/GoCamping/basedList?serviceKey=${CAMPING_API_KEY}&numOfRows=${itemsPerPage}&pageNo=${currentPage}&MobileOS=ETC&MobileApp=AppTest&_type=json`;

  const { data, isLoading, totalCount } = useFetch(
    url,
    currentPage,
    itemsPerPage,
  );

  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (totalCount) {
      setTotalPages(Math.ceil(totalCount / itemsPerPage));
    }
  }, [totalCount]);

  const [datas, setDatas] = useState<Item[]>(data);
  const [filteredData, setFilteredData] = useState<Item[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const { setSelectedData } = useSelectedDataContext();

  useEffect(() => {
    setDatas(data);
  }, [data]);

  useEffect(() => {
    if (!isSearching) {
      setFilteredData(datas);
    }
  }, [datas, isSearching]);

  const handleItemClick = (data: Item) => {
    setSelectedData(data);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getPageRange = () => {
    const middlePage = Math.ceil(pagesToShow / 2);
    let startPage = currentPage - middlePage + 1;
    let endPage = currentPage + middlePage - 1;

    if (startPage < 1) {
      startPage = 1;
      endPage = pagesToShow;
    }

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = totalPages - pagesToShow + 1;
      if (startPage < 1) startPage = 1;
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i,
    );
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 페이지네이션을 위한 데이터 슬라이스를 구하는 함수
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  };

  const handleSearch = (
    selectedProvince: string,
    selectedCity: string,
    selectedTheme: string,
    keyword: string,
  ) => {
    const searchUrl = `https://apis.data.go.kr/B551011/GoCamping/basedList?serviceKey=${CAMPING_API_KEY}&numOfRows=${totalCount}&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json`;
    fetch(searchUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          const allData = data.response.body.items.item;
          const filteredData = allData.filter((item: Item) => {
            return (
              (keyword === '' || item.facltNm.indexOf(keyword) !== -1) &&
              (selectedProvince === '' || selectedProvince === item.doNm) &&
              (selectedCity === '' || selectedCity === item.sigunguNm) &&
              (selectedTheme === '' || item.lctCl.indexOf(selectedTheme) !== -1)
            );
          });

          const newTotalPages = Math.ceil(filteredData.length / itemsPerPage);
          setTotalPages(newTotalPages);
          setIsSearching(true);
          setCurrentPage(1);
          setFilteredData(filteredData);
        } else {
          console.error('Error fetching data: Invalid response data');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handleViewAllCampingSites = () => {
    setFilteredData([]);
    setIsSearching(false);
    setDatas(data);
    setTotalPages(Math.ceil(totalCount / itemsPerPage));
  };

  return (
    <>
      <div className={`${styles.containerBackground} ratio ratio-21x9`}>
        <div className="d-flex justify-content-center align-items-center">
          <MyCalendar />
          <SearchBox position="relative" onSearch={handleSearch} />
        </div>
      </div>
      <div className={`container fs-4 mt-5`} ref={scrollRef}>
        <div className="d-flex justify-content-between">
          <div className="lh-lg">
            총{' '}
            <span className={`${styles.searchedItemsCount} fw-bold`}>
              {isSearching ? filteredData.length : totalCount}개
            </span>
            의 캠핑장이 검색되었습니다.
          </div>
          <div>
            {isSearching && (
              <button
                type="button"
                className="btn btn-lg btn-outline-success fw-bold"
                onClick={handleViewAllCampingSites}
              >
                전체 캠핑장 보기
              </button>
            )}
            <button
              type="button"
              className="btn btn-lg btn-outline-danger fw-bold ms-4"
            >
              <Link to="/ai" className={styles.customLink}>
                AI에게 물어보러가기
              </Link>
            </button>
          </div>
        </div>
        <hr className={styles.horizonLine} />
        {isLoading ? (
          <div className="spinner-border text-success m-5" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <>
            {isSearching
              ? getCurrentPageData().map((item) => {
                  return (
                    <div
                      className={styles.searchedListContainer}
                      key={item.contentId}
                    >
                      <div className="d-flex p-5">
                        <Link
                          to={`/detail/${item.contentId}`}
                          className={styles.customLink}
                          onClick={() => handleItemClick(item)}
                        >
                          <div className={styles.imgWrapper}>
                            <img
                              src={item.firstImageUrl}
                              alt={item.facltNm}
                              className={`${styles.thumbnailImg} rounded-3`}
                            />
                          </div>
                        </Link>
                        <div className="flex-grow-1 ms-5">
                          <Link
                            to={`/detail/${item.contentId}`}
                            className={styles.customLink}
                            onClick={() => handleItemClick(item)}
                          >
                            <div
                              className={`${styles.campingTitle} fw-bold fs-3 mt-3`}
                            >
                              [{item.doNm} {item.sigunguNm}] {item.facltNm}
                            </div>
                          </Link>
                          <div className="fs-5 fw-semibold mt-3 mb-2">
                            {item.featureNm.split('  ').length === 2
                              ? item.featureNm.split('  ')[0]
                              : ''}
                          </div>
                          <div className={`${styles.description} fs-6`}>
                            {item.featureNm.split('  ').length === 2
                              ? item.featureNm.split('  ')[1]
                              : item.featureNm.split('  ')[0]}
                          </div>
                          <div className="mt-3 fs-5 fw-semibold">
                            {item.addr1 && (
                              <div className={`${styles.address}`}>
                                <span className="ms-5">{item.addr1}</span>
                              </div>
                            )}
                            {item.tel && (
                              <div className={`${styles.telephone} ms-5`}>
                                <span className="ms-5">{item.tel}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div
                        className={`${styles.facilityListContainer} ms-auto me-auto mb-5 bg-white rounded border border-secondary mt-3 d-flex justify-content-center`}
                      >
                        {item.sbrsCl}
                      </div>
                      <hr />
                    </div>
                  );
                })
              : datas.map((item) => {
                  return (
                    <div
                      className={styles.searchedListContainer}
                      key={item.contentId}
                    >
                      <div className="d-flex p-5">
                        <Link
                          to={`/detail/${item.contentId}`}
                          className={styles.customLink}
                          onClick={() => handleItemClick(item)}
                        >
                          <div className={styles.imgWrapper}>
                            <img
                              src={item.firstImageUrl}
                              alt={item.facltNm}
                              className={`${styles.thumbnailImg} rounded-3`}
                            />
                          </div>
                        </Link>
                        <div className="flex-grow-1 ms-5">
                          <Link
                            to={`/detail/${item.contentId}`}
                            className={styles.customLink}
                            onClick={() => handleItemClick(item)}
                          >
                            <div
                              className={`${styles.campingTitle} fw-bold fs-3 mt-3`}
                            >
                              [{item.doNm} {item.sigunguNm}] {item.facltNm}
                            </div>
                          </Link>
                          <div className="fs-5 fw-semibold mt-3 mb-2">
                            {item.featureNm.split('  ').length === 2
                              ? item.featureNm.split('  ')[0]
                              : ''}
                          </div>
                          <div className={`${styles.description} fs-6`}>
                            {item.featureNm.split('  ').length === 2
                              ? item.featureNm.split('  ')[1]
                              : item.featureNm.split('  ')[0]}
                          </div>
                          <div className="mt-3 fs-5 fw-semibold">
                            {item.addr1 && (
                              <div className={`${styles.address}`}>
                                <span className="ms-5">{item.addr1}</span>
                              </div>
                            )}
                            {item.tel && (
                              <div className={`${styles.telephone} ms-5`}>
                                <span className="ms-5">{item.tel}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div
                        className={`${styles.facilityListContainer} ms-auto me-auto mb-5 bg-white rounded border border-secondary mt-3 d-flex justify-content-center`}
                      >
                        {item.sbrsCl}
                      </div>
                      <hr />
                    </div>
                  );
                })}
          </>
        )}
        <div className="d-flex justify-content-center mt-4">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={goToFirstPage}>
                &laquo;
              </button>
            </li>
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={goToPreviousPage}>
                &lt;
              </button>
            </li>
            {getPageRange().map((pageNumber) => (
              <li
                key={pageNumber}
                className={`page-item ${
                  currentPage === pageNumber ? 'active' : ''
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === totalPages ? 'disabled' : ''
              }`}
            >
              <button className="page-link" onClick={goToNextPage}>
                &gt;
              </button>
            </li>
            <li
              className={`page-item ${
                currentPage === totalPages ? 'disabled' : ''
              }`}
            >
              <button className="page-link" onClick={goToLastPage}>
                &raquo;
              </button>
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
}
