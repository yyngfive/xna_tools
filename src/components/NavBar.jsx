"use client";
import useTranslation from 'next-translate/useTranslation';

import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/navbar";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Link } from '@nextui-org/link';
import { useState } from "react";
import ChangeLanguage from './ChangeLang';

export default function NavBar() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, lang } = useTranslation('common');

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
          <Link color="foreground" href={`/${lang}`}>
            {t("title_tools")}
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href={`/${lang}/docs/oligo`}>
            {t("title_docs")}
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href={`/${lang}/about`}>
            {t("title_about")}
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>

          <ChangeLanguage lang={lang}/>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem >
          <Link color="foreground" className="w-full" href={`/${lang}`} size="lg">
            {t("title_tools")}
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem >
          <Link color="foreground" className="w-full" href={`/${lang}/docs/oligo`} size="lg">
            {t('title_docs')}
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem >
          <Link color="foreground" className="w-full" href={`/${lang}/about`} size="lg">
            {t('title_about')}
          </Link>
        </NavbarMenuItem>

      </NavbarMenu>
    </Navbar>
  );
}
