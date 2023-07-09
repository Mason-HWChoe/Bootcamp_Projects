import { useEffect, useRef } from 'react';
import SearchBox from './SearchBox';

export default function Carousel() {
  const carouselRef = useRef(null);

  useEffect(() => {
    const carouselElement = carouselRef.current;

    if (!carouselElement) return;

    const carousel = new window.bootstrap.Carousel(carouselElement, {
      interval: 5000,
    });

    const slideInterval = setInterval(() => {
      carousel.next();
    }, 5000);

    return () => {
      clearInterval(slideInterval);
      carousel.dispose();
    };
  }, []);

  return (
    <div
      id="carouselExampleCaptions"
      className="carousel slide"
      data-bs-ride="carousel"
      ref={carouselRef}
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="/camping01.webp"
            className="w-100 d-block"
            alt="캠핑이미지1"
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>함께여서 더 좋은 추억</h5>
            <p>가족, 친구들과 캠핑하며 소중한 추억을 만들어 보세요</p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src="/camping02.webp"
            className="w-100 d-block"
            alt="캠핑이미지2"
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>자연을 선물하다</h5>
            <p>
              캠핑은 아이들에게 자연을 통째로 선물할 수 있는 좋은 기회입니다
            </p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src="/camping03.webp"
            className="w-100 d-block"
            alt="캠핑이미지3"
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>낭만캠핑</h5>
            <p>캠핑을 통해 잠시나마 일상을 벗어나 낭만을 즐겨보세요</p>
          </div>
        </div>
        <SearchBox position="absolute" />
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
