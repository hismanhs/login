import { Button } from '@salt-ds/core';

export function ButtonLogin({ onClick, text, ...restProp }: any) {
  return (
    <Button onClick={onClick} {...restProp}>
      {text}
    </Button>
  );
}

export default ButtonLogin;
