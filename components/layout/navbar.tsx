"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, Wallet, Vote, GraduationCap } from "lucide-react";
import { UserButton, SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const { isSignedIn } = useUser();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-serif font-bold text-lg">
                V
              </span>
            </div>
            <span className="font-serif text-xl text-foreground font-medium">
              Verdant
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <NavigationMenu viewport={isMobile}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/opportunities"
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent",
                        isActive("/opportunities") && "text-accent-foreground"
                      )}
                    >
                      Opportunities
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/learn"
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent",
                        isActive("/learn") && "text-accent-foreground"
                      )}
                    >
                      Learn
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                {isSignedIn && (
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent">
                      My Portfolio
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[200px] gap-1 p-2">
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/portfolio"
                              className={cn(
                                "select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                isActive("/portfolio") && "bg-accent/50"
                              )}
                            >
                              <Wallet className="w-4 h-4" />
                              <div>
                                <div className="text-sm font-medium">
                                  Holdings
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  View your investments
                                </p>
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              href="/voting"
                              className={cn(
                                "select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                isActive("/voting") && "bg-accent/50"
                              )}
                            >
                              <Vote className="w-4 h-4" />
                              <div>
                                <div className="text-sm font-medium">
                                  Voting
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  Shareholder votes
                                </p>
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex items-center gap-4">
            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <>
                <SignInButton mode="modal">
                  <Button variant="ghost" size="sm" className="hidden md:flex">
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button
                    variant="default"
                    size="sm"
                    className="hidden md:flex"
                  >
                    Get Started
                  </Button>
                </SignUpButton>
              </>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-4">
              <Link
                href="/opportunities"
                className={cn(
                  "text-sm transition-colors",
                  isActive("/opportunities")
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                Opportunities
              </Link>
              <Link
                href="/learn"
                className={cn(
                  "text-sm transition-colors flex items-center gap-2",
                  isActive("/learn")
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                <GraduationCap className="w-4 h-4" />
                Learn
              </Link>
              {isSignedIn && (
                <div className="flex flex-col gap-2 pl-4 border-l border-border">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    My Portfolio
                  </span>
                  <Link
                    href="/portfolio"
                    className={cn(
                      "text-sm transition-colors flex items-center gap-2",
                      isActive("/portfolio")
                        ? "text-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Wallet className="w-4 h-4" />
                    Holdings
                  </Link>
                  <Link
                    href="/voting"
                    className={cn(
                      "text-sm transition-colors flex items-center gap-2",
                      isActive("/voting")
                        ? "text-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Vote className="w-4 h-4" />
                    Voting
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
