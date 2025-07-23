// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract LaughterNFT is ERC721, ERC721URIStorage, ReentrancyGuard, Ownable {
    uint256 private _tokenIdCounter;
    uint256 public mintPrice = 0.00001 ether;
    uint256 public royaltyPercentage = 5;

    struct LaughData {
        address creator;
        string title;
        string description;
        uint256 price;
        bool forSale;
    }

    mapping(uint256 => LaughData) public laughs;

    event LaughMinted(
        address indexed creator,
        uint256 indexed tokenId,
        string tokenURI,
        string title
    );
    event LaughListed(uint256 indexed tokenId, uint256 price);
    event LaughSold(
        uint256 indexed tokenId,
        address indexed buyer,
        uint256 price
    );
    event LaughRemovedFromSale(uint256 indexed tokenId);

    constructor() ERC721("LaughterLegends", "LAUGH") Ownable(msg.sender) {}

    function mintLaugh(
        string memory _tokenURI,
        string memory _title,
        string memory _description
    ) public payable nonReentrant returns (uint256) {
        require(msg.value >= mintPrice, "Insufficient funds for minting");

        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, _tokenURI);

        laughs[tokenId] = LaughData({
            creator: msg.sender,
            title: _title,
            description: _description,
            price: 0,
            forSale: false
        });

        emit LaughMinted(msg.sender, tokenId, _tokenURI, _title);
        return tokenId;
    }

    function listForSale(uint256 tokenId, uint256 price) public {
        require(_exists(tokenId), "Token does not exist");
        require(ownerOf(tokenId) == msg.sender, "You are not the owner");
        require(price > 0, "Price must be greater than 0");

        laughs[tokenId].price = price;
        laughs[tokenId].forSale = true;
        emit LaughListed(tokenId, price);
    }

    function removeFromSale(uint256 tokenId) public {
        require(_exists(tokenId), "Token does not exist");
        require(ownerOf(tokenId) == msg.sender, "You are not the owner");

        laughs[tokenId].forSale = false;
        laughs[tokenId].price = 0;
        emit LaughRemovedFromSale(tokenId);
    }

    function buyLaugh(uint256 tokenId) public payable nonReentrant {
        require(_exists(tokenId), "Token does not exist");
        require(laughs[tokenId].forSale, "Token not for sale");
        require(msg.value >= laughs[tokenId].price, "Insufficient payment");

        address seller = ownerOf(tokenId);
        address creator = laughs[tokenId].creator;
        uint256 price = laughs[tokenId].price;

        // Calculate royalty
        uint256 royalty = (price * royaltyPercentage) / 100;
        uint256 sellerAmount = price - royalty;

        // Transfer NFT
        _transfer(seller, msg.sender, tokenId);

        // Update sale status
        laughs[tokenId].forSale = false;
        laughs[tokenId].price = 0;

        // Transfer payments
        payable(seller).transfer(sellerAmount);
        if (creator != seller) {
            payable(creator).transfer(royalty);
        }

        emit LaughSold(tokenId, msg.sender, price);
    }

    // View functions for frontend
    function getTokensForSale() external view returns (uint256[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < _tokenIdCounter; i++) {
            if (laughs[i].forSale) count++;
        }

        uint256[] memory tokens = new uint256[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < _tokenIdCounter; i++) {
            if (laughs[i].forSale) {
                tokens[index] = i;
                index++;
            }
        }
        return tokens;
    }

    function getTokensForSalePaginated(
        uint256 offset,
        uint256 limit
    ) external view returns (uint256[] memory) {
        require(limit <= 50, "Limit too high");

        uint256[] memory tokens = new uint256[](limit);
        uint256 found = 0;
        uint256 checked = 0;

        for (uint256 i = 0; i < _tokenIdCounter && found < limit; i++) {
            if (laughs[i].forSale) {
                if (checked >= offset) {
                    tokens[found] = i;
                    found++;
                }
                checked++;
            }
        }

        // Resize array to actual found tokens
        uint256[] memory result = new uint256[](found);
        for (uint256 i = 0; i < found; i++) {
            result[i] = tokens[i];
        }
        return result;
    }

    function getTokensOwnedBy(
        address owner
    ) external view returns (uint256[] memory) {
        uint256 balance = balanceOf(owner);
        uint256[] memory tokens = new uint256[](balance);
        uint256 index = 0;

        for (uint256 i = 0; i < _tokenIdCounter; i++) {
            if (_exists(i) && ownerOf(i) == owner) {
                tokens[index] = i;
                index++;
            }
        }
        return tokens;
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter;
    }

    // Admin functions
    function setMintPrice(uint256 _price) public onlyOwner {
        mintPrice = _price;
    }

    function setRoyaltyPercentage(uint256 _percentage) public onlyOwner {
        require(_percentage <= 10, "Royalty too high");
        royaltyPercentage = _percentage;
    }

    function withdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    // Helper functions
    function _exists(uint256 tokenId) internal view returns (bool) {
        return tokenId < _tokenIdCounter;
    }

    // Override functions
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

    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721) returns (address) {
        return super._update(to, tokenId, auth);
    }
}
