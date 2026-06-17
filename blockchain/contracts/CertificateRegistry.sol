// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CertificateRegistry {
    mapping(string => string) private certificateHashes;
    mapping(string => bool) private certificateExists;
    address public owner;

    event CertificateStored(string indexed certId, string hash, uint256 timestamp);
    event CertificateRevoked(string indexed certId, uint256 timestamp);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function storeCertificate(string memory certId, string memory sha256Hash) public onlyOwner {
        require(!certificateExists[certId], "Certificate ID already exists");
        certificateHashes[certId] = sha256Hash;
        certificateExists[certId] = true;
        emit CertificateStored(certId, sha256Hash, block.timestamp);
    }

    function verifyCertificate(string memory certId, string memory sha256Hash) public view returns (bool) {
        if (!certificateExists[certId]) {
            return false;
        }
        return keccak256(abi.encodePacked(certificateHashes[certId])) == keccak256(abi.encodePacked(sha256Hash));
    }

    function getCertificateHash(string memory certId) public view returns (string memory) {
        require(certificateExists[certId], "Certificate does not exist");
        return certificateHashes[certId];
    }

    function certificateRegistered(string memory certId) public view returns (bool) {
        return certificateExists[certId];
    }

    function revokeCertificate(string memory certId) public onlyOwner {
        require(certificateExists[certId], "Certificate does not exist");
        certificateExists[certId] = false;
        emit CertificateRevoked(certId, block.timestamp);
    }
}
