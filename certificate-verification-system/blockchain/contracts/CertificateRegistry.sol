// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title CertificateRegistry
 * @dev Smart contract for registering and verifying academic certificates on blockchain
 */
contract CertificateRegistry {
    
    // Mapping to store certificate hashes: certificateId => certificateHash
    mapping(string => string) private certificateHashes;
    
    // Mapping to store certificate issuers: certificateId => issuer address
    mapping(string => address) private certificateIssuers;
    
    // Mapping to store certificate status: certificateId => isIssued
    mapping(string => bool) private certificateStatus;
    
    // Array to store all issued certificate IDs
    string[] public issuedCertificates;
    
    // Event emitted when a certificate is issued
    event CertificateIssued(
        string indexed certificateId,
        string certificateHash,
        address indexed issuer,
        uint256 timestamp
    );
    
    // Event emitted when a certificate is verified
    event CertificateVerified(
        string indexed certificateId,
        bool isValid,
        uint256 timestamp
    );
    
    /**
     * @dev Issue a certificate by storing its hash on blockchain
     * @param certificateId Unique identifier for the certificate
     * @param certificateHash SHA-256 hash of the certificate file
     */
    function issueCertificate(
        string memory certificateId,
        string memory certificateHash
    ) public {
        // Require that the certificate ID is not empty
        require(bytes(certificateId).length > 0, "Certificate ID cannot be empty");
        require(bytes(certificateHash).length > 0, "Certificate hash cannot be empty");
        
        // Require that this certificate hasn't been issued before
        require(!certificateStatus[certificateId], "Certificate already issued");
        
        // Store the certificate hash
        certificateHashes[certificateId] = certificateHash;
        
        // Store the issuer address (typically the university)
        certificateIssuers[certificateId] = msg.sender;
        
        // Mark certificate as issued
        certificateStatus[certificateId] = true;
        
        // Add to issued certificates list
        issuedCertificates.push(certificateId);
        
        // Emit the CertificateIssued event
        emit CertificateIssued(certificateId, certificateHash, msg.sender, block.timestamp);
    }
    
    /**
     * @dev Verify a certificate by comparing the hash
     * @param certificateId Unique identifier for the certificate
     * @param providedHash SHA-256 hash provided for verification
     * @return bool Returns true if the certificate is valid, false otherwise
     */
    function verifyCertificate(
        string memory certificateId,
        string memory providedHash
    ) public returns (bool) {
        // Check if certificate exists
        require(certificateStatus[certificateId], "Certificate not found");
        
        // Compare the provided hash with the stored hash
        bool isValid = keccak256(abi.encodePacked(certificateHashes[certificateId])) == 
                       keccak256(abi.encodePacked(providedHash));
        
        // Emit the verification event
        emit CertificateVerified(certificateId, isValid, block.timestamp);
        
        return isValid;
    }
    
    /**
     * @dev Get the stored hash of a certificate
     * @param certificateId Unique identifier for the certificate
     * @return string Returns the certificate hash
     */
    function getCertificateHash(
        string memory certificateId
    ) public view returns (string memory) {
        require(certificateStatus[certificateId], "Certificate not found");
        return certificateHashes[certificateId];
    }
    
    /**
     * @dev Get the issuer of a certificate
     * @param certificateId Unique identifier for the certificate
     * @return address Returns the issuer's address
     */
    function getCertificateIssuer(
        string memory certificateId
    ) public view returns (address) {
        require(certificateStatus[certificateId], "Certificate not found");
        return certificateIssuers[certificateId];
    }
    
    /**
     * @dev Check if a certificate exists
     * @param certificateId Unique identifier for the certificate
     * @return bool Returns true if certificate exists, false otherwise
     */
    function certificateExists(
        string memory certificateId
    ) public view returns (bool) {
        return certificateStatus[certificateId];
    }
    
    /**
     * @dev Get total number of issued certificates
     * @return uint256 Returns the count of issued certificates
     */
    function getTotalIssuedCertificates() public view returns (uint256) {
        return issuedCertificates.length;
    }
    
    /**
     * @dev Get certificate ID at a specific index
     * @param index Position in the issued certificates array
     * @return string Returns the certificate ID at the index
     */
    function getCertificateAtIndex(
        uint256 index
    ) public view returns (string memory) {
        require(index < issuedCertificates.length, "Index out of bounds");
        return issuedCertificates[index];
    }
}
