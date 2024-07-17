import { ChangeEvent, HTMLProps } from "react";

interface InputProps extends HTMLProps<HTMLInputElement> {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function Input({ onChange, ...props }: InputProps) {
  return (
    <input
      {...props}
      onChange={onChange}
      className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
    />
  );
}
