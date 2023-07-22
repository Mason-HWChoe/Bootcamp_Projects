import { useState } from 'react';
import DataForSearch from '../Data/DataForSearch.json';
import styles from './SearchBox.module.css';

interface SearchBoxProps {
  position: 'absolute' | 'relative';
  onSearch: (
    selectedProvince: string,
    selectedCity: string,
    selectedTheme: string,
    keyword: string,
  ) => void;
}

export default function SearchBox({ position, onSearch }: SearchBoxProps) {
  const [keyword, setKeyword] = useState<string>('');
  const [selectedProvince, setSelectedProvince] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedTheme, setSelectedTheme] = useState<string>('');

  const provinces = DataForSearch.regions.map((region) => region.province);

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const province = e.target.value;
    setSelectedProvince(province);
    setSelectedCity('');
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const city = e.target.value;
    setSelectedCity(city);
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const themeValue = e.target.value;
    setSelectedTheme(themeValue);
  };

  const handleSearch = () => {
    onSearch(selectedProvince, selectedCity, selectedTheme, keyword);
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
          onChange={handleKeywordChange}
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
            <option value="default">전체/도</option>
            {provinces.map((province, index) => {
              return (
                <option value={province} key={index}>
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
            onChange={handleCityChange}
          >
            <option value="default">전체/시/군</option>
            {selectedProvince !== '' &&
              DataForSearch.regions
                .filter((region) => region.province === selectedProvince)
                .flatMap((region) => region.cities)
                .map((city, index) => {
                  return (
                    <option value={city} key={index}>
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
            onChange={handleThemeChange}
          >
            <option>전체테마</option>
            {DataForSearch.themes.map((theme, index) => {
              return (
                <option value={theme} key={index}>
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
            onClick={handleSearch}
          >
            검색
          </button>
        </div>
      </div>
    </div>
  );
}
