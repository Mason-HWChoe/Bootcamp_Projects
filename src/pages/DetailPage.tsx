import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import { Item, useFetch } from '../hooks/useFetch';
import styles from './DetailPage.module.css';

export default function DetailPage() {
  const params = useParams<{ contentId?: string }>();
  const [item, setItem] = useState<Item | null>(null);

  const url = `https://apis.data.go.kr/B551011/GoCamping/basedList?serviceKey=MJETrqk1X%2Fnh689Jug8ZnQO948tVbuhYyz5L5c8kkFgpsljkfLY2VaK5effABCJZyANcyFfLPfSBdA8hnia5Og%3D%3D&MobileOS=ETC&MobileApp=AppTest&_type=json`;

  const { data } = useFetch(url);
  console.log(data);

  useEffect(() => {
    const selectedItem = data.find(
      (item) => item.contentId === Number(params.contentId),
    );
    setItem(selectedItem || null);
  }, [data, params.contentId]);

  return (
    <>
      <div className={styles.banner}></div>
      <h2>Detail Page {item?.contentId}</h2>
      <Footer />
    </>
  );
}

// const itemsPerPage = 10;
//   const pagesToShow = 10;
//   const initialPage = 1;
//   const url = `https://apis.data.go.kr/B551011/GoCamping/basedList?serviceKey=MJETrqk1X%2Fnh689Jug8ZnQO948tVbuhYyz5L5c8kkFgpsljkfLY2VaK5effABCJZyANcyFfLPfSBdA8hnia5Og%3D%3D&numOfRows=${itemsPerPage}&pageNo=${initialPage}&MobileOS=ETC&MobileApp=AppTest&_type=json`;

//   const { data, isLoading, totalCount } = useFetch(url);
//   const [datas, setDatas] = useState<Item[]>(data);
//   const [currentPage, setCurrentPage] = useState(initialPage);
//   const totalPages = Math.ceil(totalCount / itemsPerPage);

//   useEffect(() => {
//     // 페이지 변경 시 API 호출
//     const fetchData = async () => {
//       try {
//         const newUrl = `https://apis.data.go.kr/B551011/GoCamping/basedList?serviceKey=MJETrqk1X%2Fnh689Jug8ZnQO948tVbuhYyz5L5c8kkFgpsljkfLY2VaK5effABCJZyANcyFfLPfSBdA8hnia5Og%3D%3D&numOfRows=${itemsPerPage}&pageNo=${currentPage}&MobileOS=ETC&MobileApp=AppTest&_type=json`;
//         const { data } = await useFetch(newUrl);
//         // 데이터 처리 로직 작성 (state 업데이트 등)
//         setDatas(data);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchData();
//   }, [currentPage]);

//   const handlePageChange = (pageNumber: number) => {
//     setCurrentPage(pageNumber);
//   };

//   const getPageRange = () => {
//     const middlePage = Math.ceil(pagesToShow / 2);
//     let startPage = currentPage - middlePage + 1;
//     let endPage = currentPage + middlePage - 1;

//     if (startPage < 1) {
//       startPage = 1;
//       endPage = pagesToShow;
//     }

//     if (endPage > totalPages) {
//       endPage = totalPages;
//       startPage = totalPages - pagesToShow + 1;
//       if (startPage < 1) startPage = 1;
//     }

//     return Array.from(
//       { length: endPage - startPage + 1 },
//       (_, i) => startPage + i,
//     );
//   };

//   const goToFirstPage = () => {
//     setCurrentPage(1);
//   };

//   const goToPreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage((prevPage) => prevPage - 1);
//     }
//   };

//   const goToNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage((prevPage) => prevPage + 1);
//     }
//   };

//   const goToLastPage = () => {
//     setCurrentPage(totalPages);
//   };

//   if (isLoading) {
//     return (
//       <div className="spinner-border text-success m-5" role="status">
//         <span className="visually-hidden">Loading...</span>
//       </div>
//     );
//   }

//   <div className="d-flex justify-content-center mt-4">
//           <ul className="pagination">
//             <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//               <button className="page-link" onClick={goToFirstPage}>
//                 &laquo;
//               </button>
//             </li>
//             <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//               <button className="page-link" onClick={goToPreviousPage}>
//                 &lt;
//               </button>
//             </li>
//             {getPageRange().map((pageNumber) => (
//               <li
//                 key={pageNumber}
//                 className={`page-item ${
//                   currentPage === pageNumber ? 'active' : ''
//                 }`}
//               >
//                 <Link
//                   to={`?page=${pageNumber}`}
//                   onClick={() => handlePageChange(pageNumber)}
//                   className="page-link"
//                 >
//                   {pageNumber}
//                 </Link>
//               </li>
//             ))}
//             <li
//               className={`page-item ${
//                 currentPage === totalPages ? 'disabled' : ''
//               }`}
//             >
//               <button className="page-link" onClick={goToNextPage}>
//                 &gt;
//               </button>
//             </li>
//             <li
//               className={`page-item ${
//                 currentPage === totalPages ? 'disabled' : ''
//               }`}
//             >
//               <button className="page-link" onClick={goToLastPage}>
//                 &raquo;
//               </button>
//             </li>
//           </ul>
//         </div>

// {datas.map((item) => {
//   return (
//     <div className={styles.searchedListContainer} key={item.contentId}>
//       <div className="d-flex p-5">
//         <Link
//           to={`/detail/${item.contentId}`}
//           className={styles.customLink}
//         >
//           <div className={styles.imgWrapper}>
//             <img
//               src={item.firstImageUrl}
//               alt={item.facltNm}
//               className={`${styles.thumbnailImg} rounded-3`}
//             />
//           </div>
//         </Link>
//         <div className="flex-grow-1 ms-5">
//           <Link
//             to={`/detail/${item.contentId}`}
//             className={styles.customLink}
//           >
//             <div className={`${styles.campingTitle} fw-bold fs-3 mt-3`}>
//               [{item.doNm} {item.sigunguNm}] {item.facltNm}
//             </div>
//           </Link>
//           <div className="fs-5 fw-semibold mt-3 mb-2">
//             {item.featureNm.split('  ').length === 2
//               ? item.featureNm.split('  ')[0]
//               : ''}
//           </div>
//           <div className={`${styles.description} fs-6`}>
//             {item.featureNm.split('  ').length === 2
//               ? item.featureNm.split('  ')[1]
//               : item.featureNm.split('  ')[0]}
//           </div>
//           <div className="mt-3 fs-5 fw-semibold">
//             {item.addr1 && (
//               <div className={`${styles.address}`}>
//                 <span className="ms-5">{item.addr1}</span>
//               </div>
//             )}
//             {item.tel && (
//               <div className={`${styles.telephone} ms-5`}>
//                 <span className="ms-5">{item.tel}</span>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <div
//         className={`${styles.facilityListContainer} ms-auto me-auto mb-5 bg-white rounded border border-secondary mt-3 d-flex justify-content-center`}
//       >
//         {item.sbrsCl}
//       </div>
//       <hr />
//     </div>
//   );
// })}
