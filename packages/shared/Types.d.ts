export type HistoryItem = {
  sender: string;
  senderName: string;
  recipient: string;
  recipientName: string;
  amount: number;
  date: string;
  isIncoming?: boolean;
};

export type NPWDUser = {
  name: string;
  source: number;
  phoneNumber: string;
};
