import { InputHTMLAttributes } from 'react';

type IInputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input(props: IInputProps) {
  return (
    <input
      className='border-0 h-9 rounded outline-none px-3 py-2 mb-3 text-zinc-800'
      {...props}
    />
  );
}
