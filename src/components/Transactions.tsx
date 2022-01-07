import React, { useContext } from 'react';
import { TransactionsContext } from '../context/TransactionsContext';
import { TransactionsCard } from './TransactionsCard';

export const Transactions = () => {
  const { currentAccount, transactions } = useContext(TransactionsContext);
  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="Flex flex-col md:p-12 py-12 px-4">
        {currentAccount ? (
          <h3 className="text-white text-3x; text-center my-2">
            Latest Transactions
          </h3>
        ) : (
          <h3 className="text-white text-3x; text-center my-2">
            Connect your account to see the latest transactions
          </h3>
        )}

        <div className="flex flex-wrap justify-center items-center mt-10">
          {transactions.reverse().map((transaction, index) => (
            <TransactionsCard key={index} {...transaction} />
          ))}
        </div>
      </div>
    </div>
  );
};
