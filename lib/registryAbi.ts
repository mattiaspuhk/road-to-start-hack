// Minimal ABI for StartupRegistry contract using ethers.js human-readable format
export const REGISTRY_ABI = [
  "function registerStartup(string name) returns (uint256)",
  "function getStartup(uint256 startupId) view returns (address founder, string name, uint256 createdAt, bytes32 startupHash)",
  "function getCapTable(uint256 startupId) view returns (address[] holders, uint256[] shares)",
  "function setCapTable(uint256 startupId, address[] holders, uint256[] shares)",
  "function nextStartupId() view returns (uint256)",
  "event StartupRegistered(uint256 indexed startupId, address indexed founder, string name, bytes32 startupHash)",
];
