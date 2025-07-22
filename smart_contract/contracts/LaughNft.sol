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
    // who created each laugh?
    mapping(uint256 => LaughData) public laughs;
    mapping(uint256 => uint) public tokenPrices;
    event LaughMinted(
        address indexed creator,
        uint256 indexed tokenId,
        string tokenURI,
        string title
    );
    event LaughListed(uint256 tokenPrice, uint256 price);
    event LaughSold(
        uint256 indexed tokenId,
        address indexed buyer,
        uint256 price
    );

    constructor() ERC721("LaughterLegends", "LAUGH") Ownable(msg.sender) {}

    function mintLaugh(
        string memory _tokenURI,
        string memory _title,
        string memory _description
    ) public payable nonReentrant returns (uint256) {
        require(msg.value >= mintPrice, "You have insufficient Funds!");
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
        require(
            laughs[tokenId].creator == msg.sender,
            "You are not the creator"
        );
        require(price > 0, "Price must be greater than 0");
        laughs[tokenId].price = price;
        laughs[tokenId].forSale = true;
        emit LaughListed(tokenId, price);
    }

    function buyLaugh(uint256 tokenId) public payable nonReentrant {
        require(laughs[tokenId].forSale, "Not for sale");
        require(msg.value >= laughs[tokenId].price, "Insufficient payment!");
        address seller = ownerOf(tokenId);
        address creator = laughs[tokenId].creator;
        uint256 price = laughs[tokenId].price;

        //calculate the royalty
        uint256 royalty = (price * royaltyPercentage) / 100;
        uint256 sellerAmount = price - royalty;

        _transfer(seller, msg.sender, tokenId);
        laughs[tokenId].forSale = false;
        laughs[tokenId].price = 0;
        payable(seller).transfer(sellerAmount);
        if (creator != seller) {
            payable(creator).transfer(royalty);
        }

        emit LaughSold(tokenId, msg.sender, price);
    }

    function setMintPrice(uint256 _price) public onlyOwner {
        mintPrice = _price;
    }

    function withdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
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

    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721) returns (address) {
        return super._update(to, tokenId, auth);
    }
}
//0x73c2c379B595a754073BCa937AFEA292f9ea602E
