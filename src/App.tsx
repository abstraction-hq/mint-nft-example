import { createAbstractionProvider } from "@abstraction-hq/wallet-sdk";
import { useEffect, useState } from "react";
import "./index.css"

const Home = () => {
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    (window as any).abstraction = createAbstractionProvider();
  }, []);

  const onConnect = async () => {
    const [wallet] = await (window as any).abstraction.request({
      method: "eth_requestAccounts",
      params: {},
    });

    setAddress(wallet);
  };

  const onMint = async () => {
    console.log("Mint");
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 bg-gray-800 p-8 rounded-lg">
      <span className="text-xl text-white font-bold">Mint NFT</span>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={onConnect}
        disabled={address.length > 0}
      >
        {address.length > 0 ? "Connected" : "Connect"}
      </button>
      {address.length > 0 && (
        <button
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={onMint}
        >
          Mint
        </button>
      )}
    </div>
  );
};

export default Home;