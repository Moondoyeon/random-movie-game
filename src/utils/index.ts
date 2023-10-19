export const initNum = (n: number) => {
  return Math.floor(Math.random() * n);
};
export const copyEmail = (email: string) => {
  navigator.clipboard.writeText(email);
};
