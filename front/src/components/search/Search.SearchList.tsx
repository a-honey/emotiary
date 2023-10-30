import React, { useEffect, useState, useCallback } from 'react';
import styles from './Search.SearchList.module.scss';
import { ca } from 'date-fns/locale';

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

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('검색어 제출', searchTerm);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  return (
    <div className="modal">
      <div className={styles.container}>
        <h2>{targetName} 검색하기</h2>
        <form>
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
