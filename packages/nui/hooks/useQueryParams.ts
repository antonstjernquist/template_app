import qs, { ParsedQs } from 'qs';
import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

export function useQueryParams<T = Record<string, string>>(defaultValues: T = {} as T) {
  const { search } = useLocation();

  return useMemo(() => {
    const query = qs.parse(search, { ignoreQueryPrefix: true });

    if (!defaultValues) {
      return query as T & Partial<ParsedQs>;
    }
    return { ...defaultValues, ...query } as T & Partial<ParsedQs>;
  }, [search, defaultValues]);
}
