"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Loader2, Wallet, Rocket, AlertCircle, CheckCircle2 } from "lucide-react";
import {
  connectWallet,
  getConnectedAccount,
  getContractWithSigner,
  checkNetwork,
  switchToSepolia,
  isMetaMaskInstalled,
} from "@/lib/web3/registry";

type RegistrationStep = "connect" | "form" | "confirming" | "success" | "error";

export default function RegisterStartupPage() {
  const router = useRouter();
  const [step, setStep] = useState<RegistrationStep>("connect");
  const [account, setAccount] = useState<string | null>(null);
  const [startupName, setStartupName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [newStartupId, setNewStartupId] = useState<string | null>(null);

  // Check for existing wallet connection on mount
  useEffect(() => {
    async function checkConnection() {
      try {
        const connected = await getConnectedAccount();
        if (connected) {
          setAccount(connected);
          setStep("form");
        }
      } catch {
        // Not connected, stay on connect step
      }
    }
    checkConnection();
  }, []);

  // Listen for account changes
  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      const handleAccountsChanged = (accounts: unknown) => {
        const accountList = accounts as string[];
        if (accountList.length === 0) {
          setAccount(null);
          setStep("connect");
        } else {
          setAccount(accountList[0]);
          if (step === "connect") setStep("form");
        }
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);
      return () => {
        window.ethereum?.removeListener("accountsChanged", handleAccountsChanged);
      };
    }
  }, [step]);

  const handleConnect = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (!isMetaMaskInstalled()) {
        throw new Error("MetaMask is not installed. Please install MetaMask to continue.");
      }

      // Check network first
      const isCorrectNetwork = await checkNetwork();
      if (!isCorrectNetwork) {
        await switchToSepolia();
      }

      const connectedAccount = await connectWallet();
      setAccount(connectedAccount);
      setStep("form");
    } catch (err) {
      const error = err as Error;
      setError(error.message || "Failed to connect wallet");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!startupName.trim()) {
      setError("Please enter a startup name");
      return;
    }

    setIsLoading(true);
    setError(null);
    setStep("confirming");

    try {
      // Verify network
      const isCorrectNetwork = await checkNetwork();
      if (!isCorrectNetwork) {
        await switchToSepolia();
      }

      const { contract } = await getContractWithSigner();

      // Call registerStartup and wait for transaction
      const tx = await contract.registerStartup(startupName.trim());
      setTxHash(tx.hash);

      // Wait for confirmation
      const receipt = await tx.wait();

      // Extract startupId from the StartupRegistered event
      const event = receipt.logs.find((log: { fragment?: { name: string } }) => {
        return log.fragment?.name === "StartupRegistered";
      });

      if (event && event.args) {
        const startupId = event.args[0].toString();
        setNewStartupId(startupId);
        setStep("success");

        // Redirect after short delay
        setTimeout(() => {
          router.push(`/startup/${startupId}`);
        }, 2000);
      } else {
        // Fallback: try to get the ID from nextStartupId - 1
        const nextId = await contract.nextStartupId();
        const startupId = (BigInt(nextId) - BigInt(1)).toString();
        setNewStartupId(startupId);
        setStep("success");

        setTimeout(() => {
          router.push(`/startup/${startupId}`);
        }, 2000);
      }
    } catch (err) {
      const error = err as Error;
      console.error("Registration error:", err);
      setError(error.message || "Failed to register startup");
      setStep("error");
    } finally {
      setIsLoading(false);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Register Your Startup
          </h1>
          <p className="text-muted-foreground text-lg">
            Register your startup on the blockchain and receive a unique identifier
            and cryptographic hash.
          </p>
        </div>

        <div className="glass-card rounded-xl p-8 animate-fade-in">
          {/* Connect Wallet Step */}
          {step === "connect" && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <Wallet className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-2">Connect Your Wallet</h2>
                <p className="text-muted-foreground">
                  Connect your MetaMask wallet to register a startup on Sepolia testnet.
                </p>
              </div>
              {error && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-destructive text-sm">
                  <AlertCircle className="w-4 h-4 inline mr-2" />
                  {error}
                </div>
              )}
              <Button
                onClick={handleConnect}
                disabled={isLoading}
                size="xl"
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Wallet className="w-5 h-5 mr-2" />
                    Connect MetaMask
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Registration Form Step */}
          {step === "form" && (
            <form onSubmit={handleRegister} className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">Wallet Connected</span>
                </div>
                <span className="text-sm text-muted-foreground font-mono">
                  {account && formatAddress(account)}
                </span>
              </div>

              <div>
                <label
                  htmlFor="startupName"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Startup Name
                </label>
                <input
                  type="text"
                  id="startupName"
                  value={startupName}
                  onChange={(e) => setStartupName(e.target.value)}
                  placeholder="Enter your startup name"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                  required
                />
              </div>

              {error && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-destructive text-sm">
                  <AlertCircle className="w-4 h-4 inline mr-2" />
                  {error}
                </div>
              )}

              <div className="bg-muted/50 rounded-lg p-4 space-y-2 text-sm">
                <p className="font-medium">What happens next:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>MetaMask will ask you to confirm the transaction</li>
                  <li>Your startup will be registered on Sepolia testnet</li>
                  <li>You&apos;ll receive a unique startup ID and hash</li>
                  <li>You can then manage your cap table</li>
                </ul>
              </div>

              <Button
                type="submit"
                disabled={isLoading || !startupName.trim()}
                size="xl"
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Rocket className="w-5 h-5 mr-2" />
                    Register Startup
                  </>
                )}
              </Button>
            </form>
          )}

          {/* Confirming Transaction Step */}
          {step === "confirming" && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-primary animate-spin" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-2">
                  Confirming Transaction
                </h2>
                <p className="text-muted-foreground">
                  Please wait while your transaction is being confirmed on the
                  blockchain...
                </p>
              </div>
              {txHash && (
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-1">
                    Transaction Hash:
                  </p>
                  <a
                    href={`https://sepolia.etherscan.io/tx/${txHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline font-mono text-sm break-all"
                  >
                    {txHash}
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Success Step */}
          {step === "success" && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-2">
                  Startup Registered!
                </h2>
                <p className="text-muted-foreground">
                  Your startup has been successfully registered on the blockchain.
                </p>
              </div>
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-1">Startup ID:</p>
                <p className="text-2xl font-bold text-primary">{newStartupId}</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Redirecting to your startup page...
              </p>
            </div>
          )}

          {/* Error Step */}
          {step === "error" && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 mx-auto bg-destructive/20 rounded-full flex items-center justify-center">
                <AlertCircle className="w-10 h-10 text-destructive" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-2">
                  Registration Failed
                </h2>
                <p className="text-muted-foreground">{error}</p>
              </div>
              <Button
                onClick={() => {
                  setError(null);
                  setStep("form");
                }}
                size="lg"
              >
                Try Again
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
