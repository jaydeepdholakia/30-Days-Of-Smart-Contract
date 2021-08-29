import React from 'react'

export const Footer = () => {
    let footerStyle = {
        position: "relative",
        width: "100%"
    }
    return (
        <footer className="text-center bg-dark text-light py-3" style={footerStyle}>
            <p>Copyright &copy; Jaydeep Dholakia | <a className="link-light" href="https://etherscan.io/address/0xB2d8345C7D8A2a303E21d540b1Cd13fd4A66BaDa">Send ETH ♥</a> </p>
        </footer>
    )
}
