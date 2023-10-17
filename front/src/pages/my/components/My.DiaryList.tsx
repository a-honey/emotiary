import React, { useState } from 'react';

import styles from './index.module.scss';
import { MyDairyItemType } from '../../../types/diaryType';
import { useGetMyAllDiarysData } from '../../../api/get/useGetDiaryData';

const DiaryList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isFetching } = useGetMyAllDiarysData({
    page: currentPage,
    limit: 15,
  });

  return (
    <section className={styles.diaryList}>
      <h2>일기 모아보기</h2>
      <div className={styles.listBlock}>
        {isFetching ? (
          <div>로딩중</div>
        ) : (
          data.map((item: MyDairyItemType, index: number) => (
            <DiaryItem data={item} key={item.id} index={index} />
          ))
        )}
      </div>
      <div>페이지네이션 자리</div>
    </section>
  );
};

export default DiaryList;

const DiaryItem = ({
  data,
  index,
}: {
  data: MyDairyItemType;
  index: number;
}) => {
  return (
    <div className={styles.diaryItem}>
      <div className={styles.index}>{index + 1} |</div>
      <div className={styles.title}>{data.title}</div>
      <div className={styles.date}>{data.createdDate.split('T')[0]}</div>
    </div>
  );
};
