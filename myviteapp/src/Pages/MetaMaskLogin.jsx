import Web3 from "web3";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MetaMaskLogin = () => {
  const [account, setAccount] = useState("");
  const navigate = useNavigate();

  const connectWallet = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        console.log("Connected Account:", accounts[0]);
      } catch (error) {
        console.error("User denied account access");
      }
    } else {
      alert("Please install MetaMask");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h3>MetaMask Login</h3>
      <button onClick={connectWallet}>Connect Wallet</button>
      {account && <p>🦊 Connected as: {account}</p>}

    </div>
  );
};

export default MetaMaskLogin;
