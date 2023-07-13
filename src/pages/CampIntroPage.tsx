import { useState } from 'react';
import { useCampImage } from '../hooks/useCampImage';
import { useSelectedDataContext } from '../store/SelectedItemsContext';
import styles from './CampInfoPage.module.css';

export default function CampIntroPage() {
  const { selectedData } = useSelectedDataContext();
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!selectedData) {
    return <div>캠핑장 정보가 없습니다.</div>;
  }

  const url = `https://apis.data.go.kr/B551011/GoCamping/`;

  const { images } = useCampImage(url, selectedData.contentId);
  console.log(images);

  const openModal = (image: string) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedImage(null);
  };

  return (
    <div className={`${styles.infoListContainer} rounded mb-5`}>
      <h5 className="mt-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-signpost bg-warning rounded"
          viewBox="0 0 16 16"
        >
          <path d="M7 1.414V4H2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h5v6h2v-6h3.532a1 1 0 0 0 .768-.36l1.933-2.32a.5.5 0 0 0 0-.64L13.3 4.36a1 1 0 0 0-.768-.36H9V1.414a1 1 0 0 0-2 0zM12.532 5l1.666 2-1.666 2H2V5h10.532z" />
        </svg>{' '}
        캠핑장 소개
      </h5>
      <div
        className={`${styles.facilityListContainer} mb-5 bg-white rounded border border-secondary mt-3`}
      >
        {selectedData.featureNm.split('  ').length === 2
          ? selectedData.featureNm.split('  ')[1]
          : selectedData.intro}
      </div>
      <hr />
      <h5 className="mt-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-signpost bg-warning rounded"
          viewBox="0 0 16 16"
        >
          <path d="M7 1.414V4H2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h5v6h2v-6h3.532a1 1 0 0 0 .768-.36l1.933-2.32a.5.5 0 0 0 0-.64L13.3 4.36a1 1 0 0 0-.768-.36H9V1.414a1 1 0 0 0-2 0zM12.532 5l1.666 2-1.666 2H2V5h10.532z" />
        </svg>{' '}
        캠핑장 시설정보
      </h5>

      <div
        className={`${styles.facilityListContainer} ms-auto me-auto mb-5 bg-white rounded border border-secondary mt-3`}
      >
        {selectedData.sbrsCl}
      </div>

      <hr />

      {selectedData.direction && (
        <>
          <h5 className="mt-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-signpost bg-warning rounded"
              viewBox="0 0 16 16"
            >
              <path d="M7 1.414V4H2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h5v6h2v-6h3.532a1 1 0 0 0 .768-.36l1.933-2.32a.5.5 0 0 0 0-.64L13.3 4.36a1 1 0 0 0-.768-.36H9V1.414a1 1 0 0 0-2 0zM12.532 5l1.666 2-1.666 2H2V5h10.532z" />
            </svg>{' '}
            캠핑장 오시는길
          </h5>
          <div
            className={`${styles.facilityListContainer} ms-auto me-auto mb-5 bg-white rounded border border-secondary mt-3`}
          >
            {selectedData.direction}
          </div>
          <hr />
        </>
      )}

      <h5 className="mt-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-signpost bg-warning rounded"
          viewBox="0 0 16 16"
        >
          <path d="M7 1.414V4H2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h5v6h2v-6h3.532a1 1 0 0 0 .768-.36l1.933-2.32a.5.5 0 0 0 0-.64L13.3 4.36a1 1 0 0 0-.768-.36H9V1.414a1 1 0 0 0-2 0zM12.532 5l1.666 2-1.666 2H2V5h10.532z" />
        </svg>{' '}
        {selectedData.facltNm}
      </h5>
      <div className="d-flex justify-content-center flex-wrap mt-3">
        {images &&
          images.map((image) => {
            return (
              <div
                className={`${styles.imageContainer}`}
                key={image.serialnum}
                onClick={() => openModal(image.imageUrl)}
              >
                <img
                  src={image.imageUrl}
                  className={`${styles.campImages} img-fluid rounded`}
                  alt={selectedData.facltNm}
                />
              </div>
            );
          })}
      </div>
      {showModal && selectedImage && (
        <div className={`${styles.modal} d-block `}>
          <div
            className={`${styles.modalContent} d-flex justify-content-center align-items-center flex-column rounded`}
          >
            <div className={`${styles.modalClose} mb-3`} onClick={closeModal}>
              &times; 닫기
            </div>
            <img
              src={selectedImage}
              className={`${styles.modalImage}`}
              alt={selectedData.facltNm}
            />
          </div>
        </div>
      )}
    </div>
  );
}
