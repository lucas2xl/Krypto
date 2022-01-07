import React, { ChangeEvent, createContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';
import { ITransaction } from '../components/TransactionsCard';

interface ITransactionsProviderProps {
  children: React.ReactNode;
}
interface ITransactionsContextProps {
  connectWallet: () => Promise<void>;
  currentAccount: string;
  formData: IFormData;
  handleChange: (e: ChangeEvent<HTMLInputElement>, name: string) => void;
  sendTransaction: () => void;
  transactions: ITransaction[];
  isLoading: boolean;
  transactionCount: string | null;
}
interface IFormData {
  addressTo: string;
  amount: string;
  keyword: string;
  message: string;
}

export const TransactionsContext = createContext(
  {} as ITransactionsContextProps,
);

const { ethereum, localStorage, } = window;

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();

  const transactionsContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer,
  );

  return transactionsContract;
};

export const TransactionsProvider = ({
  children,
}: ITransactionsProviderProps) => {
  const [currentAccount, setCurrentAccount] = useState('');
  const [formData, setFormData] = useState({} as IFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem('transactionCount'),
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const getAllTransactions = async () => {
    try {
      if (!ethereum) return alert('Please install metamask');

      const transactionsContract = createEthereumContract();

      const availableTransactions =
        await transactionsContract.getAllTransactions();

      const structuredTransactions = availableTransactions.map(
        (transaction: any) => ({
          addressTo: transaction.receiver,
          addressFrom: transaction.sender,
          timestamp: new Date(
            transaction.timestamp.toNumber() * 10000,
          ).toLocaleString(),
          message: transaction.message,
          keyword: transaction.keyword,
          amount: parseInt(transaction.amount._hex) / 10 ** 18,
        }),
      );

      console.log(structuredTransactions);

      setTransactions(structuredTransactions);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert('Please install metamask');

      const accounts: any[] = await ethereum.request({
        method: 'eth_accounts',
      });
      console.log(accounts);
      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        await getAllTransactions();
      } else {
        console.log('No accounts found');
      }
    } catch (error) {
      console.log(error);
      throw new Error('No ethereum object');
    }
  };

  const checkIfTransactionsExits = async () => {
    try {
      const transactionsContract = createEthereumContract();
      const transactionCount = await transactionsContract.getTransactionCount();

      localStorage.setItem('transactionCount', transactionCount);
    } catch (error) {
      console.log(error);
      throw new Error('No ethereum object');
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert('Please install metamask');

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error('No ethereum object');
    }
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum) return alert('Please install metamask');

      const { addressTo, amount, keyword, message } = formData;

      const transactionsContract = createEthereumContract();

      const parsedAmount = ethers.utils.parseEther(amount);

      await ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: '0x52208', // 2100 GWI -> 0.000021 Ether
            value: parsedAmount._hex,
          },
        ],
      });

      const transactionsHash = await transactionsContract.addToBlockchain(
        addressTo,
        parsedAmount,
        message,
        keyword,
      );

      setIsLoading(true);
      console.log(`Loading... ${transactionsHash.hash}`);
      await transactionsHash.wait();

      setIsLoading(false);
      console.log(`Success ${transactionsHash.hash}`);

      const transactionCount = await transactionsContract.getTransactionCount();

      setTransactionCount(transactionCount.toNumber());

    } catch (error) {
      console.log(error);
      throw new Error('No ethereum object');
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    checkIfTransactionsExits();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        handleChange,
        sendTransaction,
        transactions,
        isLoading,
        transactionCount,
      }}>
      {children}
    </TransactionsContext.Provider>
  );
};
