import React, { ChangeEvent, HTMLProps } from 'react';

interface IInput extends HTMLProps<HTMLInputElement> {
  placeholder: string;
  name: 'addressTo' | 'amount' | 'keyword' | 'message';
  handleChange: (event: ChangeEvent<HTMLInputElement>, name: string) => void;
}

export const Input = ({ placeholder, handleChange, name, ...rest }: IInput) => (
  <input
    placeholder={placeholder}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
    {...rest}
  />
);
