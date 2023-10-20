export const initNum = (n: number) => {
  return Math.floor(Math.random() * n);
};
export const copyEmail = (email: string) => {
  navigator.clipboard.writeText(email);
};
export const parseSeletedOption = (
  selected: Record<string, string>,
  aria?: boolean,
) => {
  const COUNTRY = selected.country === 'K' ? '국내' : '외국';
  const TYPE = selected.type === 'N' ? '상업영화' : '다양성영화';
  const YEAR = `${selected.year}년`;

  if (aria) return `제작국가: ${COUNTRY}, 개봉: ${YEAR}, 영화유형: ${TYPE}`;
  return `#${COUNTRY} #${YEAR} #${TYPE}`;
};
