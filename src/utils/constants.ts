import {abi} from './Transactions.json';

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

export const contractAddress = String(CONTRACT_ADDRESS) || '';
export const contractABI = abi;
