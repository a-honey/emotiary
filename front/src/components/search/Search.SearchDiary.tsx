import React, { useEffect, useState, useCallback } from 'react';
import styles from './Search.SearchList.module.scss';
import { useGetSearchDiaryData } from '../../api/get/useGetSearchData';
import { SearchDiaryType } from '../../api/get/useGetSearchData.types';
import DiaryItemShow from '../diary/DiaryItemShow';

const SearchDiaryList = ({
  toggleIsOpenSearchList,
}: {
  toggleIsOpenSearchList: () => void;
}) => {
  const [search, setSearch] = useState('');
  const [inputValue, setInputValue] = useState('');
  const { data } = useGetSearchDiaryData({ search });

  useEffect(() => {
    // 타이머를 설정함
    const timer = setTimeout(() => {
      setSearch(inputValue);
    }, 500);
    // dependency array 요소 바뀌면 타이머를 삭제하고 새로운 타이머를 삭제
    return () => {
      clearTimeout(timer);
    };
  }, [search, inputValue]);

  return (
    <div className="modal">
      <div className={styles.container}>
        <h2>일기 검색하기</h2>
        <form>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </form>
        <div className={styles.itemList}>
          {inputValue && data?.data ? (
            data?.data?.map((item) => <SearchItem key={item.id} item={item} />)
          ) : (
            <div>검색결과가 없습니다.</div>
          )}
        </div>
        <button onClick={toggleIsOpenSearchList} className="cancelBtn">
          닫기
        </button>
      </div>
    </div>
  );
};

export default SearchDiaryList;

const SearchItem = ({ item }: { item: SearchDiaryType }) => {
  const [isOpenDiary, setIsOpenDiary] = useState(false);

  const toggleIsOpenDiary = () => {
    setIsOpenDiary((prev) => !prev);
  };
  const { id, title, emoji, createdDate } = item;
  return (
    <>
      {isOpenDiary && (
        <DiaryItemShow id={id} toggleIsOpenModal={toggleIsOpenDiary} />
      )}
      <div className={styles.itemContainer} onClick={toggleIsOpenDiary}>
        <div>{emoji}</div>
        <div>{title}</div>
        <div>{createdDate}</div>
      </div>
    </>
  );
};
