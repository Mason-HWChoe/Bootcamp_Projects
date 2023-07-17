import { useState } from 'react';
import data from '../../public/DataForSearch.json';
import styles from './SearchBox.module.css';

interface Region {
  province: string;
  cities: string[];
}

interface Data {
  regions: Region[];
  theme: string[];
}

export default function SearchBox({
  position,
}: {
  position: 'absolute' | 'relative';
}) {
  const [selectedProvinceIndex, setSelectedProvinceIndex] = useState<
    number | null
  >(null);

  const provinces = data.regions.map((region) => region.province);

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = +e.target.value;
    setSelectedProvinceIndex(index);
  };

  return (
    <div
      className={`${
        position === 'absolute' ? styles.absolute : styles.relative
      } rounded`}
    >
      <div className="input-group">
        <span
          className={`${styles.keywordSearch} input-group-text rounded`}
          id="basic-addon1"
        >
          키워드검색
        </span>
        <input
          type="text"
          className={`${styles.search} form-control rounded`}
          placeholder="검색어를 입력해주세요"
          aria-label="search"
          aria-describedby="basic-addon1"
        />
      </div>
      <div className="input-group">
        <span className={`${styles.regionSearch} input-group-text rounded`}>
          지역별검색
        </span>

        <div className="col-sm-4">
          <select
            className={`${styles.selectProvince} form-select`}
            aria-label="select-box"
            defaultValue="default"
            onChange={handleProvinceChange}
          >
            <option disabled value="default">
              전체/도
            </option>
            {provinces.map((province, index) => {
              return (
                <option value={index} key={index}>
                  {province}
                </option>
              );
            })}
          </select>
        </div>

        <div className="col-sm-4">
          <select
            className={`${styles.selectCity} form-select`}
            aria-label="select-box"
            defaultValue="default"
          >
            <option disabled value="default">
              전체/시/군
            </option>
            {selectedProvinceIndex !== null &&
              data.regions[selectedProvinceIndex].cities.map((city, index) => {
                return (
                  <option value={index} key={index}>
                    {city}
                  </option>
                );
              })}
          </select>
        </div>
      </div>

      <div className="input-group">
        <span
          className={`${styles.themeSearch} input-group-text rounded`}
          id="basic-addon3"
        >
          테마별검색
        </span>

        <div className="col-sm-4">
          <select
            className={`${styles.selectTheme} form-select`}
            aria-label="select-box"
            defaultValue="default"
          >
            <option disabled value="default">
              전체테마
            </option>
            {data.themes.map((theme, index) => {
              return (
                <option value={index} key={index}>
                  {theme}
                </option>
              );
            })}
          </select>
        </div>
        <div className="ms-3">
          <button
            type="button"
            className={`${styles.searchBtn} btn btn-primary`}
          >
            검색
          </button>
        </div>
      </div>
    </div>
  );
}
