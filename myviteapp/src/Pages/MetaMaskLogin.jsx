import Web3 from "web3";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BubblesBackground from "../components/BubblesBackground";
import Layout from "../components/Layout";

const MetaMaskLogin = () => {
  const [account, setAccount] = useState("");
 
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
    <Layout>
     <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
            <BubblesBackground count={15} />
    <div style={{ padding: "2rem" }}>
      <h3 className="mt-6 text-center text-2xl font-bold tracking-tight text-white">MetaMask Login</h3>
      <button className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold text-white shadow hover:bg-blue-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300 mt-5"
              onClick={connectWallet}>Connect Wallet</button>
              <div className="text-white">
      {account && <p>🦊 Connected as: {account}</p>}
      </div>

    </div>
    </div>
    </Layout>
  );
};

export default MetaMaskLogin;
