import { useState } from "react";
import { BrowserProvider } from "ethers";
import "../styles.css"

export default function ConnectWallet ({ setSigner }) {
    const [ account, setAcccount ] = useState(null);

    const connectWallet = async () => {
        if (!window.ethereum) {
            alert("Metamask not found. Install the extension.");
            return;
        }

        try {
            const provider = new BrowserProvider(window.ethereum);

            await window.ethereum.request({ // Force metamask to always open the popup
                method: "wallet_requestPermissions",
                params: [{ eth_accounts: {} }]
            })

            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            const signer = await provider.getSigner();
            const address = accounts[0];

            setSigner(signer);
            setAcccount(address);
        } catch (error) {
            console.error("Error connecting to wallet: ", error);
        }
    } 

    return (
        <div>
            {account ? (
                <div></div>
            ) : (
                <div className="container">
                    <div>
                       <h1 className="title-style">Welcomeme</h1>
                        <p className="text-style">This is my solution to the Subvisual code challenge. In order to proceed connect with your Metamask wallet.</p>
                    </div>
                    <button className="button" onClick={connectWallet}>Connect wallet</button>
                </div>
            )}
        </div>
    )
}