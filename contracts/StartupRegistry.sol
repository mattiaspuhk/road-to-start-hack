// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract StartupRegistry {

    struct Startup {
        address founder;
        string name;
        uint256 createdAt;
        bytes32 startupHash;
    }

    struct CapEntry {
        address holder;
        uint256 shares;
    }

    uint256 public nextStartupId;

    mapping(uint256 => Startup) public startups;
    mapping(uint256 => CapEntry[]) public capTables;

    event StartupRegistered(
        uint256 indexed startupId,
        address indexed founder,
        string name,
        bytes32 startupHash
    );

    function registerStartup(string calldata name) external returns (uint256) {
        uint256 id = nextStartupId++;

        bytes32 hash = keccak256(
            abi.encodePacked(msg.sender, block.timestamp, name)
        );

        startups[id] = Startup({
            founder: msg.sender,
            name: name,
            createdAt: block.timestamp,
            startupHash: hash
        });

        emit StartupRegistered(id, msg.sender, name, hash);
        return id;
    }

    function setCapTable(
        uint256 startupId,
        address[] calldata holders,
        uint256[] calldata shares
    ) external {
        require(holders.length == shares.length, "Length mismatch");

        delete capTables[startupId];

        for (uint256 i = 0; i < holders.length; i++) {
            capTables[startupId].push(
                CapEntry({holder: holders[i], shares: shares[i]})
            );
        }
    }

    function getCapTable(uint256 startupId)
        external
        view
        returns (address[] memory holders, uint256[] memory shares)
    {
        CapEntry[] storage entries = capTables[startupId];
        holders = new address[](entries.length);
        shares = new uint256[](entries.length);
        for (uint256 i = 0; i < entries.length; i++) {
            holders[i] = entries[i].holder;
            shares[i] = entries[i].shares;
        }
    }

    function getStartup(uint256 startupId)
        external
        view
        returns (
            address founder,
            string memory name,
            uint256 createdAt,
            bytes32 startupHash
        )
    {
        Startup storage s = startups[startupId];
        return (s.founder, s.name, s.createdAt, s.startupHash);
    }
}
