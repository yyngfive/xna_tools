
import { Button,ButtonGroup } from '@nextui-org/button';
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/dropdown";
import { Link } from 'next/link';
import { useState } from 'react';
import { LanguageIcon } from '../../public/icons/LanguageIcon';
export default function ChangeLanguage({lang}){


    const languages = {
        'en':'English',
        'zh':'中文'
    }
       
    return(
        
      <Dropdown placement="bottom">
        <DropdownTrigger>
          <Button isIconOnly>
            <LanguageIcon />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          aria-label="language options"

          selectionMode="single"
 
        >
          <DropdownItem key="en" >
            <Link href='/' locale='en' key='en'>English</Link>
          </DropdownItem>
          <DropdownItem key="zh" >
            中文
          </DropdownItem>
        
        </DropdownMenu>
      </Dropdown>

    )
}