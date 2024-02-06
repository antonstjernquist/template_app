import React, { FormEvent, useMemo } from 'react';
import { ResourceConfig } from '../../shared/config';
import { Header } from '../components/Header';
import { useConfig } from '../hooks/useConfig';
import fetchNui, { fetchNuiPhone } from '../utils/fetchNui';
import { LinkExternal } from '../components/ExternalLink';
import { User } from 'react-feather';
import { useQueryParams } from '../hooks/useQueryParams';

export const toggleKeys = async (keepGameFocus: boolean) => {
  return await fetchNuiPhone('npwd:toggleAllControls', {
    keepGameFocus,
  });
};

interface Contact {
  number: string;
  id: string;
  display: string;
}

export const Send = () => {
  const { contact } = useQueryParams<{ contact: string }>();
  const parsedContact: Contact | null = useMemo(() => {
    try {
      return JSON.parse(decodeURIComponent(contact));
    } catch (e) {
      return null;
    }
  }, [contact]);

  const [amount, setAmount] = React.useState('');
  const [recipient, setRecipient] = React.useState(parsedContact?.number ?? '');
  const [error, setError] = React.useState('');
  const { translations } = useConfig<ResourceConfig>() ?? {};

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (recipient === '') {
      setError(translations?.error_recipientIsRequired ?? 'Recipient is required');
      return;
    }

    if (amount === '') {
      setError(translations?.error_amountIsRequired ?? 'Amount is required');
      return;
    }

    if (isNaN(Number(amount))) {
      setError(translations?.error_amountMustBeANumber ?? 'Amount must be a number');
      return;
    }

    try {
      const res = await fetchNui('/send', {
        recipient,
        amount: Number(amount),
      });

      if (!res.ok) {
        setError(res.error);
        return;
      }

      setRecipient('');
      setAmount('');
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Header />

      <div className="flex flex-col gap-4 flex-1">
        <span className="text-xl text-center">{translations?.send}</span>
        <form className="flex flex-col gap-4 flex-1 h-full" onSubmit={handleSubmit}>
          <div
            tabIndex={0}
            className="flex rounded-lg border-2 border-cyan-500 p-4 items-center focus:border-cyan-300 transition-all outline-none min-w-0"
          >
            <input
              tabIndex={-1}
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder={translations?.recipient}
              className="bg-transparent border-none flex-1 outline-none min-w-0"
              onMouseDown={() => {
                toggleKeys(false);
              }}
              onBlur={() => {
                toggleKeys(true);
              }}
            />

            <LinkExternal
              to={`/contacts?referal=/send_app/send`}
              tabIndex={-1}
              className="self-center flex"
            >
              <button
                type="button"
                className="p-2 -my-3 -mx-2 hover:text-gray-100 hover:bg-cyan-800 rounded-md border-2 border-transparent focus:border-cyan-300 outline-none transition-all"
              >
                <User />
              </button>
            </LinkExternal>
          </div>

          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={translations?.amount}
            className="p-4 rounded-lg bg-transparent border-2 border-cyan-500 outline-none min-w-0 focus:border-cyan-300 transition-all"
            onMouseDown={() => {
              toggleKeys(false);
            }}
            onBlur={() => {
              toggleKeys(true);
            }}
          />

          {error && <span className="text-red-500">{error}</span>}

          <button className="mt-auto p-4 bg-cyan-600 rounded-lg border-transparent border hover:bg-cyan-400">
            {translations?.send}
          </button>
        </form>
      </div>
    </>
  );
};
