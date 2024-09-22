"use client";

import React, { useEffect, useState } from 'react';
import { ethers, providers } from 'ethers';

// Temporarily set the ABI type to `any[]` if you don't have the actual ABI yet.
const contractABI: unknown[] = []; // Replace with the actual ABI later.
const contractAddress = 'YOUR_CONTRACT_ADDRESS_HERE';

const EthersComponent: React.FC = () => {
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [account, setAccount] = useState<string | null>(null);

  // Initialize contract and request MetaMask account
  useEffect(() => {
    const init = async () => {
      if (typeof window.ethereum !== "undefined") {
        try {
          // Request account access
          await window.ethereum.request({ method: 'eth_requestAccounts' });

          // Set up provider and signer
          const provider = new providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();

          // Initialize contract instance
          const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
          setContract(contractInstance);

          // Get current account
          const accounts = await provider.listAccounts();
          setAccount(accounts[0]);
        } catch (error) {
          console.error("Error accessing Ethereum accounts:", error);
        }
      } else {
        console.error('Please install MetaMask!');
      }
    };

    init();
  }, []);

  // Example function to interact with contract
  const callContractFunction = async () => {
    if (contract) {
      try {
        // Call a function from your contract (replace with your actual function)
        const result = await contract.yourFunctionName(); // Replace with your function name
        console.log("Contract function result:", result);
      } catch (error) {
        console.error("Error calling contract function:", error);
      }
    } else {
      console.error("Contract is not initialized.");
    }
  };

  return (
    <div>
      <h1>My DApp</h1>
      {account ? <p>Connected Account: {account}</p> : <p>Not connected</p>}
      <button onClick={callContractFunction}>Call Contract Function</button>
    </div>
  );
};

export default EthersComponent;
