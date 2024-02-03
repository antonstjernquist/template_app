import React, { ReactNode } from 'react';

export const HEADER_HEIGHT = '4rem';
interface HeaderProps {
  children: ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
};

export default Header;
