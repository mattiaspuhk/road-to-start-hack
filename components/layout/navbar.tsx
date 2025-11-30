"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles, Info, Wallet } from "lucide-react";
import { UserButton, SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
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
                        isActive("/opportunities") &&
                          "bg-accent text-accent-foreground"
                      )}
                    >
                      Opportunities
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>How It Works</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="#"
                          >
                            <Sparkles className="mb-2 h-6 w-6" />
                            <div className="mb-2 mt-4 text-lg font-medium">
                              Get Started
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Learn how to find and apply to startup
                              opportunities that match your skills and
                              interests.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href="#" title="Browse Opportunities">
                        Explore startups looking for talent
                      </ListItem>
                      <ListItem href="#" title="Apply & Connect">
                        Submit applications and connect with founders
                      </ListItem>
                      <ListItem href="#" title="Join Teams">
                        Become part of innovative startup teams
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>About</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] lg:w-[600px] lg:grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                            href="#"
                          >
                            <Info className="mb-2 h-6 w-6" />
                            <div className="mb-2 mt-4 text-lg font-medium">
                              About Verdant
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Connecting talented individuals with innovative
                              startups and opportunities.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <ListItem href="#" title="Our Mission">
                        Building bridges between talent and opportunity
                      </ListItem>
                      <ListItem href="#" title="For Startups">
                        Post opportunities and find the right team members
                      </ListItem>
                      <ListItem href="#" title="For Talent">
                        Discover your next career opportunity
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center gap-4">
            {isSignedIn ? (
              <>
                <Link href="/portfolio">
                  <Button variant="ghost" size="sm" className="hidden md:flex gap-2">
                    <Wallet className="w-4 h-4" />
                    Portfolio
                  </Button>
                </Link>
                <UserButton afterSignOutUrl="/" />
              </>
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
              <div className="flex flex-col gap-2 pl-4 border-l border-border">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  How It Works
                </span>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Browse Opportunities
                </a>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Apply & Connect
                </a>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Join Teams
                </a>
              </div>
              <div className="flex flex-col gap-2 pl-4 border-l border-border">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  About
                </span>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Our Mission
                </a>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  For Startups
                </a>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  For Talent
                </a>
              </div>
              <div className="flex flex-col gap-2 pt-2">
                {isSignedIn ? (
                  <>
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
                      My Portfolio
                    </Link>
                    <div className="flex-1 flex justify-center pt-2">
                      <UserButton afterSignOutUrl="/" />
                    </div>
                  </>
                ) : (
                  <>
                    <SignInButton mode="modal">
                      <Button variant="ghost" size="sm" className="flex-1">
                        Sign In
                      </Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <Button variant="default" size="sm" className="flex-1">
                        Get Started
                      </Button>
                    </SignUpButton>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const ListItem = ({
  className,
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"a"> & {
  title: string;
  children?: React.ReactNode;
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          {children && (
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          )}
        </a>
      </NavigationMenuLink>
    </li>
  );
};
