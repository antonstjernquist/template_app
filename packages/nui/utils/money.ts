import { ResourceConfig } from '../../shared/config';
import { useConfig } from '../hooks/useConfig';

export const FormattedPrice = ({ children }: { children: number }) => {
  const config = useConfig<ResourceConfig>();
  const Formatter = new Intl.NumberFormat(config?.locale.language ?? 'en', {
    style: 'currency',
    currency: config?.locale.currency ?? 'USD',
    minimumFractionDigits: 2,
  });

  return Formatter.format(children);
};
