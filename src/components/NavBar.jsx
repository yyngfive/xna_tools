import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { ThemeSwitcher } from "./ThemeSwitcher";
import {Link} from '@nextui-org/link';

export default function NavBar() {
  return (
    <Navbar shouldHideOnScroll isBordered>
      <NavbarBrand>
        <p className="font-bold text-inherit">XNA Tools</p>
      </NavbarBrand>
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
          <ThemeSwitcher/>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
