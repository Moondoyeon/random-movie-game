export const responsive = (device: 'phone' | 'tablet' | 'laptop') => {
  switch (device) {
    case 'phone':
      return `@media screen and (max-width: 767px)`;
    case 'tablet':
      return `@media screen and (min-width: 768px) and (max-width: 1023px)`;
    case 'laptop':
      return `@media screen and (min-width: 1024px)`;
    default:
      return '';
  }
};
