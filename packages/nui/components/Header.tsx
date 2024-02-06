import React from 'react';
import { Link } from 'react-router-dom';
import { useConfig } from '../hooks/useConfig';
import { ResourceConfig } from '../App';

export const Header = () => {
  const { translations } = useConfig<ResourceConfig>() ?? {};

  return (
    <header className="h-8">
      <Link to="/" tabIndex={-1}>
        <button className="hover:translate-x-2 transition-all text-cyan-300">
          {translations?.home}
        </button>
      </Link>
    </header>
  );
};
