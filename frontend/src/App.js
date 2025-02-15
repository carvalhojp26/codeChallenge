import ConnectWallet from "./components/ConnectWallet";
import { useState } from "react";

function App () {
	const [ signer, setSigner ] = useState(null);

	return (
		<div>
			<ConnectWallet setSigner={setSigner}/>
		</div>
	)
}

export default App;