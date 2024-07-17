import { createAbstractionProvider } from "@abstraction-hq/wallet-sdk";
import { useEffect, useState } from "react";
import "./index.css";
import { Address, encodeFunctionData } from "viem";
import CollectionAbi from "./Collection.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const collection: Address = "0xE5D1F481D1abdFbCe5f208142c20Fa8535894E17";

const Home = () => {
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    (window as any).abstraction = createAbstractionProvider();
  }, []);

  const onConnect = async () => {
    try {
      const [wallet] = await (window as any).abstraction.request({
        method: "eth_requestAccounts",
        params: {},
      });

      setAddress(wallet);
    } catch (error) {
      console.error(error);
    }
  };

  const onMint = async () => {
    // @ts-ignore
    const data = encodeFunctionData({
      abi: CollectionAbi,
      functionName: "mint",
      args: [address],
    });

    try {
      const txHash = await (window as any).abstraction.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: address,
            to: collection,
            value: 0,
            data,
          },
        ],
      });
      toast(
        <a href={`https://vicscan.xyz/tx/${txHash}`} target="_blank">
          NFT Minted, Click to view on scan
        </a>
      );
    } catch (error) {
      console.error(error);
    }
  };

  const isConnected = address.length > 0;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-4xl flex">
        <div className="w-1/2">
          <img
            src="image.png"
            alt="NFT Preview"
            className="rounded-lg"
          />
        </div>
        <div className="w-1/2 pl-8">
          <h2 className="text-2xl font-bold mb-4">
            Abstraction - Early supporters
          </h2>
          <p className="mb-4">
            Welcome, early supporters! We are thrilled to have you with us at
            the forefront of this revolutionary journey. By minting your NFT,
            you become a vital part of our mission to innovate and transform the
            blockchain space. We deeply appreciate your belief in our vision and
            your unwavering support. Together, we will push the boundaries of
            technology and build a future where blockchain technology is
            accessible to all. Thank you for being an essential part of our
            story.
          </p>
          {isConnected && (
            <div className="mb-4">
              <span className="block text-gray-400">
                Connected Address: {address}
              </span>
            </div>
          )}
          <div className="mt-6">
            <button
              onClick={isConnected ? onMint : onConnect}
              className="bg-green-500 text-gray-900 px-4 py-2 rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 w-full"
            >
              {isConnected ? "Mint" : "Login with abstraction"}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
