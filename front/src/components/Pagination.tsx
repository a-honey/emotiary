import React from 'react';
import styles from './Pagination.module.scss';

const Pagination = ({
  totalPage = 1,
  currentPage = 1,
  handlePage,
}: {
  totalPage: number;
  currentPage: number;
  handlePage: (arg: number) => void;
}) => {
  const handleLeftClick: React.MouseEventHandler<HTMLLIElement> = () => {
    if (currentPage === 1) {
      return;
    }
    handlePage(currentPage - 1);
  };

  const handleRightClick: React.MouseEventHandler<HTMLLIElement> = () => {
    if (currentPage === totalPage) {
      return;
    }
    handlePage(currentPage + 1);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPage; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={currentPage === i ? styles.active : ''}
          onClick={() => {
            handlePage(i);
          }}
        >
          {i}
        </li>,
      );
    }

    return pageNumbers;
  };

  return (
    <ul className={styles.pagenation}>
      <li
        className={currentPage === 1 ? styles.disabled : ''}
        onClick={handleLeftClick}
      >
        &lt;
      </li>

      {/* 페이지 번호 */}
      {renderPageNumbers()}

      <li
        className={currentPage === totalPage ? styles.disabled : ''}
        onClick={handleRightClick}
      >
        &gt;
      </li>
    </ul>
  );
};

export default Pagination;
