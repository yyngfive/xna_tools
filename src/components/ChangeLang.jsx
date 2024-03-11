'use client'
import { Button,ButtonGroup } from '@nextui-org/button';
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/dropdown";
import { usePathname } from 'next/navigation'
import { Link } from 'next/link';
import { useState } from 'react';
import { LanguageIcon } from '../../public/icons/LanguageIcon';
export default function ChangeLanguage({lang}){


    const languages = {
        'en':'English',
        'zh':'中文'
    }

    console.log(usePathname());

    const current_path = usePathname()
    var url = current_path.slice(3,current_path.length)
    
       
    return(
        
      <Dropdown placement="bottom" >
        <DropdownTrigger>
          <Button isIconOnly size='sm' variant='light' className='my-3'>
            <LanguageIcon />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
        
          disallowEmptySelection
          aria-label="language options"
          selectionMode="single"
          defaultSelectedKeys={[lang]}
          
        >
          <DropdownItem key="en" href={'/en'+url}>
            English
          </DropdownItem>
          <DropdownItem key="zh" href={'/zh'+url}>
            中文
          </DropdownItem>
        
        </DropdownMenu>
      </Dropdown>

    )
}