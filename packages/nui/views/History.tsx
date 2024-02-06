import React from 'react';
import { useQuery } from 'react-query';
import { HistoryItem } from '../../shared/Types';
import { ResourceConfig } from '../../shared/config';
import { Header } from '../components/Header';
import { useConfig } from '../hooks/useConfig';
import fetchNui from '../utils/fetchNui';
import { FormattedPrice } from '../utils/money';

export const History = () => {
  const { translations } = useConfig<ResourceConfig>() ?? {};
  const { data: history } = useQuery('history', () => {
    return fetchNui<{ data: HistoryItem[] }>('/history');
  });

  return (
    <>
      <Header />
      <div className="flex flex-col gap-4">
        <span className="text-xl text-center">{translations?.history}</span>
        <div className="flex flex-col gap-4">
          {history?.data?.map((transaction, index: number) => {
            return (
              <div key={index} className="bg-slate-700 p-4 rounded-lg">
                <div className="flex gap-4 items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-300">
                      {transaction.isIncoming ? transaction.senderName : transaction.recipientName}
                    </span>
                    <span className="text-lg">
                      {transaction.isIncoming ? transaction.sender : transaction.recipient}
                    </span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span
                      className={`text-sm ${transaction.isIncoming ? 'text-cyan-300' : 'text-rose-500'}`}
                    >
                      {transaction.isIncoming ? translations?.recieved : translations?.sent}
                    </span>
                    <span className="text-2xl font-medium">
                      <FormattedPrice>{transaction.amount}</FormattedPrice>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
