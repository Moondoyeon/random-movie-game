import { SelectedSlotOption } from 'types/game';
// slot
export const initNum = (n: number) => {
  return Math.floor(Math.random() * n);
};

export const addNum = (num: number, len: number) => {
  if (num === len - 1) return 0;
  else return num + 1;
};
export const rotateNum = (num: number, len: number) => {
  if (num === -1) return len - 1;
  if (num === len) return 0;
  else return num;
};
export const copyEmail = (email: string) => {
  navigator.clipboard.writeText(email);
};
export const formatDate = (year: string) => {
  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
  const RANDOM_DAYS = ['06', '13', '20', '27'];
  const day = RANDOM_DAYS[Math.floor(Math.random() * 4)];
  return `${year}${month}${day}`;
};
export const parseSeletedMovieOption = (
  selected: SelectedSlotOption,
  aria?: boolean,
) => {
  const COUNTRY = selected.country === 'K' ? '국내' : '외국';
  const TYPE = selected.type === 'N' ? '상업영화' : '다양성영화';
  const YEAR = `${selected.year}년`;

  if (aria) return `제작국가: ${COUNTRY}, 개봉: ${YEAR}, 영화유형: ${TYPE}`;
  return `#${COUNTRY} #${YEAR} #${TYPE}`;
};
