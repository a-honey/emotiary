import React, { useState } from 'react';

import styles from './index.module.scss';
import { MyDairyItemType } from '../../../types/diaryType';
import { useGetMyAllDiarysData } from '../../../api/get/useGetDiaryData';

const DiaryList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isFetching } = useGetMyAllDiarysData(currentPage, 15);

  return (
    <section className={styles.diaryList}>
      <h2>일기 모아보기</h2>
      <div className={styles.listBlock}>
        {isFetching ? (
          <div>로딩중</div>
        ) : (
          data?.data?.map((item: MyDairyItemType) => (
            <DiaryItem data={item} key={item.diary_id} />
          ))
        )}
      </div>
      <div>페이지네이션 자리</div>
    </section>
  );
};

export default DiaryList;

const DiaryItem = ({ data }: { data: MyDairyItemType }) => {
  return (
    <div className={styles.diaryItem}>
      <div>{data.title}</div>
      <div>2023-8-25</div>
    </div>
  );
};
