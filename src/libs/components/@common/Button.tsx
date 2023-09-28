import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
}
export default function Button({ disabled, ...props }: Props) {
  return <button disabled={disabled} {...props}></button>;
}
