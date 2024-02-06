import React from 'react';
import { Link } from 'react-router-dom';
import { AppIcon } from '../../../icon';
import { ResourceConfig } from '../../shared/config';
import { useConfig } from '../hooks/useConfig';

export const Home = () => {
  const { translations, bankName } = useConfig<ResourceConfig>() ?? {};

  return (
    <div className="flex h-full flex-col mt-4">
      <div className="flex flex-col">
        <div className="flex gap-1 self-center">
          <span className="text-xl text-center">{bankName}</span>
          <AppIcon className="stroke-gray-200 size-8 hover:animate-pulse transition-all text-gray-100" />
        </div>
        <AppIcon className="size-48 hover:animate-pulse m-auto mt-24 transition-all text-cyan-500" />
      </div>

      <div className="flex mt-auto gap-4">
        <Link to="/send" className="flex-1 flex flex-col">
          <button className="p-4 bg-cyan-600 rounded-lg border-transparent border hover:bg-cyan-400">
            {translations?.send}
          </button>
        </Link>
        <Link to="/history" className="flex-1 flex flex-col">
          <button className="p-4 rounded-lg flex-1 border border-cyan-500 text-cyan-300 hover:bg-cyan-400 hover:bg-opacity-15">
            {translations?.history}
          </button>
        </Link>
      </div>
    </div>
  );
};
