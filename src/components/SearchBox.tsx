import styles from './SearchBox.module.css';

export default function SearchBox({
  position,
}: {
  position: 'absolute' | 'relative';
}) {
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
          >
            <option disabled value="default">
              전체/도
            </option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
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
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
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
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
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
