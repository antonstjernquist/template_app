import { useEffect, useState } from 'react';
import { getConfig } from '../utils/config';

export const useConfig = <T>() => {
  const [config, setConfig] = useState<T>();

  useEffect(() => {
    const fetchConfig = async () => {
      const config = await getConfig<T>();
      setConfig(config);
    };

    fetchConfig();
  }, []);

  return config;
};
