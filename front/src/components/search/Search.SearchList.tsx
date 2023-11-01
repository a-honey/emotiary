import React, { useEffect, useState, useCallback } from 'react';
import styles from './Search.SearchList.module.scss';
import { ca } from 'date-fns/locale';
import { useGetSearchUserData } from '../../api/get/useGetSearchData';

const SearchList = ({
  toggleIsOpenSearchList,
  targetName,
}: {
  toggleIsOpenSearchList: () => void;
  targetName: string;
}) => {
  const [field, setField] = useState<
    'email' | 'username' | 'title' | 'content'
  >(targetName === '유저' ? 'username' : 'title');
  const [searchTerm, setSearchTerm] = useState('');
  const [inputValue, setInputValue] = useState('');
  const { data } = useGetSearchUserData({ searchTerm, field });

  useEffect(() => {
    // 타이머를 설정함
    const timer = setTimeout(() => {
      setSearchTerm(inputValue);
    }, 500);
    // dependency array 요소 바뀌면 타이머를 삭제하고 새로운 타이머를 삭제
    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm, inputValue]);

  return (
    <div className="modal">
      <div className={styles.container}>
        <h2>{targetName} 검색하기</h2>
        <form>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </form>
        <div>
          {data?.data ? (
            data?.data?.map((item) => <SearchItem />)
          ) : (
            <div>검색결과가 없습니다.</div>
          )}
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
