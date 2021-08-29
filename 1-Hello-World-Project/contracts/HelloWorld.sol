//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract HelloWorld {
    string private helloWorld;

    constructor(string memory _helloWorld) {
        helloWorld = _helloWorld;
    }

    function getMsg() public view returns (string memory) {
        return helloWorld;
    }

    function setHelloWorld(string memory _helloWorld) public {
        helloWorld = _helloWorld;
    }
}
