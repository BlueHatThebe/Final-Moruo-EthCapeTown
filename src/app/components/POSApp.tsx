"use client";

import React, { useState } from 'react';
import { ethers, utils, providers } from 'ethers';
import  QRCode  from 'qrcode.react';
import 'bootstrap/dist/css/bootstrap.min.css';

const STORE_ADDRESS = 'YOUR_STORE_ETH_ADDRESS';
const SMART_CONTRACT_ADDRESS = 'YOUR_SMART_CONTRACT_ADDRESS';

const POSApp: React.FC = () => {
    const [account, setAccount] = useState<string | null>(null);
    const [amount, setAmount] = useState<number>(0);
    const [item, setItem] = useState<string>('');
    const [qrValue, setQRValue] = useState<string | null>(null);
    const [transactionCompleted, setTransactionCompleted] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const connectWallet = async () => {
        if (typeof window.ethereum !== "undefined") {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setAccount(accounts[0]);
            } catch (error) {
                setErrorMessage("Error connecting wallet");
            }
        } else {
            setErrorMessage("MetaMask not detected!");
        }
    };

    const generateQRCode = () => {
        if (account && amount > 0 && item) {
            const qrData = JSON.stringify({
                to: STORE_ADDRESS,
                value: utils.parseEther(amount.toString()).toString(),
                itemName: item
            });
            setQRValue(qrData);
            setErrorMessage('');
        } else {
            setErrorMessage("Please fill out the item and amount.");
        }
    };

    const sendPayment = async () => {
        if (account && typeof window.ethereum !== "undefined") {
            const provider = new providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const transactionContract = new ethers.Contract(
                SMART_CONTRACT_ADDRESS,
                ['function payForItem(string itemName) payable'],
                signer
            );
            try {
                const tx = await transactionContract.payForItem(item, {
                    value: utils.parseEther(amount.toString())
                });
                await tx.wait();
                setTransactionCompleted(true);
                setErrorMessage('');
                alert('Payment successful!');
            } catch (error) {
                setErrorMessage("Transaction error");
            }
        }
    };

    return (
        <div>
            <h2>QR Code Payment</h2>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            {account ? (
                <p>Connected Account: {account}</p>
            ) : (
                <button onClick={connectWallet}>Connect MetaMask</button>
            )}
            <div>
                <input
                    type="text"
                    placeholder="Item Name"
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Amount in ETH"
                    value={amount}
                    onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
                />
                <button onClick={generateQRCode}>Generate QR Code</button>
                <button onClick={sendPayment}>Pay with MetaMask</button>
            </div>

            {qrValue && (
                <div>
                    <h3>Scan QR Code to Pay</h3>
                    <QRCode value={qrValue} />
                </div>
            )}

            {transactionCompleted && (
                <div>
                    <h3>Transaction Completed!</h3>
                    <p>Item: {item}</p>
                    <p>Amount: {amount} ETH</p>
                </div>
            )}
        </div>
    );
};

export default POSApp;