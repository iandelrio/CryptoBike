pragma solidity 0.5.0;

import "zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";
import "zeppelin-solidity/contracts/ownership/Ownable.sol";

contract GradientToken is ERC721Token, Ownable {
    string public constant name = "GradientToken";
    string public constant symbol = "GRAD";
}