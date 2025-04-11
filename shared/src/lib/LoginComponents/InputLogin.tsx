import { Input } from '@salt-ds/core';

export function InputLogin({ username, onChange, id, placeholder }: any) {
  return (
    <Input
      id={id}
      value={username}
      onChange={onChange}
      placeholder={placeholder}
      className="full-width"
    />
  );
}

export default InputLogin;
