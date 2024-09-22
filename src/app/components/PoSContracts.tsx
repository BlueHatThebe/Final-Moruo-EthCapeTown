"use client";

import React, { useEffect, useState } from 'react';
import { ethers, utils, providers } from 'ethers';
import contractABI from '../abi/POSContractABI.json'; // Adjust the path as necessary

// Replace with your contract's address
const contractAddress = "YOUR_CONTRACT_ADDRESS";

const PoSContracts: React.FC = () => {
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState(0);
  const [purchaseId, setPurchaseId] = useState(0);
  const [purchaseQuantity, setPurchaseQuantity] = useState(0);

  // Function to connect to the contract
  const connectToContract = async (): Promise<void> => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
      setContract(contractInstance);
      console.log('Contract connected');
    } else {
      alert("Please install MetaMask!");
    }
  };

  // Initialize contract when the component mounts
  useEffect(() => {
    connectToContract();
  }, []);

  // Function to add a product to the contract
  const handleAddProduct = async () => {
    if (contract) {
      try {
        const tx = await contract.addProduct(productName, utils.parseEther(productPrice), productQuantity);
        await tx.wait();
        alert('Product added successfully!');
      } catch (error) {
        console.error('Error adding product', error);
      }
    }
  };

  // Function to purchase a product from the contract
  const handlePurchaseProduct = async () => {
    if (contract) {
      try {
        const product = await contract.products(purchaseId);
        const tx = await contract.purchase(purchaseId, purchaseQuantity, { value: product.price.mul(purchaseQuantity) });
        await tx.wait();
        alert('Product purchased successfully!');
      } catch (error) {
        console.error('Error purchasing product', error);
      }
    }
  };

  return (
    <div>
      <h1>Point of Sale Contract Interaction</h1>

      {/* Add Product Section */}
      <div>
        <h2>Add Product</h2>
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Product Price (in ETH)"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Product Quantity"
          value={productQuantity}
          onChange={(e) => setProductQuantity(Number(e.target.value))}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>

      {/* Purchase Product Section */}
      <div>
        <h2>Purchase Product</h2>
        <input
          type="number"
          placeholder="Product ID"
          value={purchaseId}
          onChange={(e) => setPurchaseId(Number(e.target.value))}
        />
        <input
          type="number"
          placeholder="Purchase Quantity"
          value={purchaseQuantity}
          onChange={(e) => setPurchaseQuantity(Number(e.target.value))}
        />
        <button onClick={handlePurchaseProduct}>Purchase Product</button>
      </div>
    </div>
  );
};

// Use default export
export default PoSContracts;
