/**
 *
 * @param date: Date 객체, Wed Oct 18 2023 00:00:00 GMT+0900
 * @returns "2023-10-04T15:00:00.000Z"
 * @description Date 객체를 string으로 바꾸는 함수
 */

export const formatDatetoString = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;

  return formattedDate;
};

/**
 *
 * @param date: "2023-10-04T15:00:00.000Z"
 * @returns "2023"
 * @description stringDate에서 year만 반환하는 함수
 */

export const formatStringDatetoYear = (date: string) => {
  return date.split('T')[0].split('-')[0];
};

/**
 *
 * @param date: "2023-10-04T15:00:00.000Z"
 * @returns "10"
 * @description stringDate에서 month만 반환하는 함수
 */

export const formatStringDatetoMonth = (date: string) => {
  return date.split('T')[0].split('-')[1];
};
