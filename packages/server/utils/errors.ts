import { getServerConfig } from './config';

const { translations } = getServerConfig();
export const getErrorMessage = (error: Zod.ZodError) => {
  if (error.errors.some((error) => error.code === 'too_big')) {
    return translations.error_amountMustBeLessThanMaxAmount.replace(
      '{{maxAmount}}',
      `${getServerConfig().limits.maxAmount}`,
    );
  }

  if (error.errors.some((error) => error.code === 'too_small')) {
    return translations.error_amountMustBeGreaterThanMinAmount.replace(
      '{{minAmount}}',
      `${getServerConfig().limits.minAmount}`,
    );
  }

  return error.errors.map((e) => `${e.message} ${e.path.join(', ')}`).join(', ');
};
