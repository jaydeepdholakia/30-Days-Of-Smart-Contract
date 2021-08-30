// import Web3 from "web3";
import React, { useState } from 'react'
import { Footer } from "./components/Footer";
import {ethers} from 'ethers'
import HelloWorldContract from './artifacts/contracts/HelloWorld.sol/HelloWorld.json'

const contractAddress = "0x5fab27465bf6927686c958c2d39a0fa890cdb5af"

function App() {

  const [msg, setMsg] = useState('')
  const [contractMsg, setContractMsg] = useState(fetchMsg())

  async function requestAccount() {
    await window.ethereum.request({method: 'eth_requestAccounts'})
    // console.log(window.ethereum.selectedAddress)
  }

  async function fetchMsg() {
    if(typeof window.ethereum !== 'undefined'){
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(contractAddress, HelloWorldContract.abi, provider)
      try {
        const data = await contract.getMsg()
        await setContractMsg(data)
      } catch (error) {
        console.log("Error: ", error)
      }
    }
  }

  async function updateMsg() {
    if(!msg) return
    if(typeof window.ethereum !== 'undefined'){
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, HelloWorldContract.abi, signer)
      const transaction = await contract.setHelloWorld(msg)
      await transaction.wait()
    }
  }
  let mystle ={
    minHeight: "90vh"
  }
  return (
    <>
    <div className="container" style={mystle}>
      <h1 className="text-center my-5">Welcome to HelloWorld Blockchain project</h1>
      <p className="text-center my-2">This project is part of my <a href="https://github.com/jaydeepdholakia/30-Days-Of-Smart-Contract">30 Days Of Smart Contract</a>. Where I code 10 different smart contract but with a UI for anyone to interact with.<br />
      A HelloWorld.sol contract is deployed on Mumbai testnet. You can check contract's code <a href="https://github.com/jaydeepdholakia/30-Days-Of-Smart-Contract/blob/main/1-Hello-World-Project/contracts/HelloWorld.sol">here</a>.</p>
      <hr />
      <div className="alert alert-info my-3">
        <p>The <strong>Read msg</strong> button displays the current stored string value in HelloWorld.sol</p>
        <p>The <strong>Update msg</strong> button takes the input given in the input field and transacts it into the contract</p>
      </div>
      <div className="alert alert-danger my-3">
        <center><strong>NOTE: </strong> Please be connected to a test network (like Mumbai, Ropsten, Rinkeby), as you would not want to spend real ETH for Hello World!<br />
        (You can send it to me if you have extra 😅 (check footer) | Or you can just hire me!)</center>
      </div>
      <hr />
      <center><button className="btn btn-primary shadow-sm" onClick={()=>{fetchMsg()}}>Read msg</button></center>
      <p>Current value inside HelloWorld.sol: </p>
      <input className="form-control my-3" value={contractMsg} readOnly={true}/>
      <p>Now update the value: </p>
      <input className="form-control my-3" id="updateMsg" onChange={e => {setMsg(e.target.value)}} value={msg}
      placeholder="Enter your Hello World msg"/>
      <button className="btn btn-primary" onClick={()=>{updateMsg()}}>Update Msg</button>
      <p className="my-4 alert alert-info shadow">Once transaction successful, click on Read msg button</p>
    </div>
      <Footer />
    </>
  );
}

export default App;
