'use client';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu,NavbarMenuItem } from "@nextui-org/navbar";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Link } from '@nextui-org/link';
import { useState } from "react";

export default function NavBar() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);


  return (
    <Navbar shouldHideOnScroll isBordered>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">XNA Tools</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">

        <NavbarItem>
          <Link color="foreground" href="/">
            Tools
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/docs/oligo">
            Docs
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/about">
            About
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
          <NavbarMenuItem >
            <Link color="foreground" className="w-full" href="/" size="lg">
              Tools
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem >
            <Link color="foreground" className="w-full" href="/docs/oligo" size="lg">
              Docs
            </Link>
          </NavbarMenuItem>
          <NavbarMenuItem >
            <Link color="foreground" className="w-full" href="/about" size="lg">
              About
            </Link>
          </NavbarMenuItem>
        
      </NavbarMenu>
    </Navbar>
  );
}
