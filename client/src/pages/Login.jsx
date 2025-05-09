import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import Abi from "../contracts/Abi.json";
import { toast } from "sonner";

const contractAdd = "0x2183373d076ca1b8aEbE541597A1B04dC7101a1F";

const Login = ({ wallet }) => {
  const [walletConnected, setWalletConnected] = useState(false);
  const navigate = useNavigate();

  const connectWallet = async () => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      if (window.ethereum.chainId === "0xaa36a7") {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          await provider.send("eth_requestAccounts", []);
          const signer = await provider.getSigner();
          const contract = new ethers.Contract(contractAdd, Abi.abi, signer);
          toast.success("Metamask connected");
          setWalletConnected(true);
          wallet(provider, contract, signer.address);
          navigate("/Dashboard");
        } catch (error) {
          toast.error(error.message);
        }
      } else {
        toast.error("Please select Sepolia test network");
      }
    } else {
      toast.error("Please install metamask");
    }
  };

  return (
    <div className="flex h-[90%] bg-gradient-to-br from-indigo-900 via-purple-900 to-black">
      <div className="w-[50%] bg-slate-50 h-full flex flex-col justify-center items-center text-center dark:bg-slate-800">
        <div className="space-y-5">
          <h1 className="text-4xl font-bold text-[#4263EB] tracking-wider">Voting Dapp</h1>
          <p className="text-lg font-light text-gray-800 dark:text-white">
            A decentralized polling system for electing candidates, built entirely with <span className="font-semibold">Blockchain Technology</span>.
          </p>
        </div>
      </div>

      <div className="w-[100%] h-[100%] md:w-[48%] bg-slate-50 flex justify-center items-center absolute md:relative dark:bg-slate-800">
        <div className="bg-white w-[90%] h-[80%] p-10 rounded-xl shadow-2xl dark:bg-slate-900 dark:shadow-cyan-500/50">
          <div className="flex flex-col justify-center items-center space-y-10">
            <div>
              <img
                className="h-[95%] md:h-[100%] mr-1 md:mr-0"
                src="https://voting-dapp.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fimage%2Fpublic%2Fsvg%2Flogo.b954829cff7fddca2bb11cc74a1876a5.svg&w=384&q=75"
                alt="Votechain Logo"
              />
              <h1 className="text-[#4263EB] text-3xl font-bold">Votechain</h1>
            </div>

            <div>
              {walletConnected ? (
                <button className="bg-[#4263EB] p-4 text-xl rounded-md text-white hover:bg-[#4e6dec] shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105">
                  Connected to Wallet
                </button>
              ) : (
                <button
                  className="bg-[#4263EB] p-4 text-xl rounded-md text-white hover:bg-[#4e6dec] shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
                  onClick={connectWallet}
                >
                  Connect Wallet
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

