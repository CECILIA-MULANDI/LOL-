// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract LaughterNFT is ERC721, ERC721URIStorage {
    uint256 private _tokenIdCounter;

    // who created each laugh?
    mapping(uint256 => address) public creators;
    event LaughMinted(
        address indexed creator,
        uint256 indexed tokenId,
        string tokenURI
    );

    constructor() ERC721("LaughterLegends", "LAUGH") {}

    function mintLaugh(string memory _tokenURI) public returns (uint256) {
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, _tokenURI);
        creators[tokenId] = msg.sender;
        emit LaughMinted(msg.sender, tokenId, _tokenURI);
        return tokenId;
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter;
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
}
//0x73c2c379B595a754073BCa937AFEA292f9ea602E
