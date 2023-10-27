import React, { useState } from 'react';
import styles from './Search.SearchList.module.scss';

const SearchList = ({
  toggleIsOpenSearchList,
  targetName,
}: {
  toggleIsOpenSearchList: () => void;
  targetName: string;
}) => {
  const [fieldName, setFieldName] = useState<
    'email' | 'username' | 'title' | 'content'
  >(targetName === '유저' ? 'username' : 'title');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <div className="modal">
      <div className={styles.container}>
        <h2>{targetName} 검색하기</h2>
        <form onSubmit={handleSubmit}>
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="doneBtn">
            검색
          </button>
        </form>
        <div>
          <SearchItem />
          <SearchItem />
          <SearchItem />
          <SearchItem />
        </div>
        <button onClick={toggleIsOpenSearchList} className="cancelBtn">
          닫기
        </button>
      </div>
    </div>
  );
};

export default SearchList;

const SearchItem = () => {
  return <div>검색해서 나온거</div>;
};
