import React, { useEffect, useState, useCallback } from 'react';
import styles from './Search.SearchList.module.scss';
import { useGetSearchUserData } from '../../api/get/useGetSearchData';
import { SearchUserType } from '../../api/get/useGetSearchData.types';
import ImageComponent from '../ImageComponent';
import { useNavigate } from 'react-router-dom';

const SearchList = ({
  toggleIsOpenSearchList,
  targetName,
}: {
  toggleIsOpenSearchList: () => void;
  targetName: string;
}) => {
  const [field, setField] = useState<'email' | 'username'>('username');
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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Update the 'select' state based on the checkbox value.
    const newSelect = e.target.checked ? 'email' : 'username';
    setField(newSelect);
  };

  return (
    <div className="modal">
      <div className={styles.container}>
        <h2>{targetName} 검색하기</h2>
        <div className={styles.checkBox}>
          <input type="checkbox" onChange={handleCheckboxChange} />
          <div>이메일로 검색하기</div>
        </div>
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

export default SearchList;

const SearchItem = ({ item }: { item: SearchUserType }) => {
  const navigator = useNavigate();

  const { id, username, profileImage, description } = item;
  return (
    <div
      className={styles.itemContainer}
      onClick={() => {
        navigator(`/user/${id}`);
      }}
    >
      <ImageComponent
        src={profileImage.at(-1)?.url ?? null}
        alt={`${username}의 프로필이미지`}
      />
      <div>{username}</div>
      <div>{description}</div>
    </div>
  );
};
