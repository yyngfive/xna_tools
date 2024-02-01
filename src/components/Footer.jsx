import {Link} from '@nextui-org/link';
import { Divider } from '@nextui-org/divider';

export default function Footer(){

    return(
        <>
        <div className="bottom-0  z-50 fixed w-full items-center bg-background shadow-lg shadow-black">
            <div className="flex flex-col mx-3 items-center my-4 space-y-3">
                <div className='flex justify-center space-x-4 h-5'>
                    <div ><Link isExternal showAnchorIcon color='foreground' href='https://stassenger.top'>Blog</Link></div>
                    <Divider orientation="vertical" />
                    <div><Link isExternal showAnchorIcon color='foreground' href='https://github.com/yyngfive/xna_tools'>Source</Link></div>
                    <Divider orientation="vertical" />
                    <div><Link isExternal showAnchorIcon color='foreground' >Links</Link></div>
                </div>
                <span >XNA Tools Copyright © 2024 <Link  isExternal href='https://github.com/yyngfive' showAnchorIcon >Asante</Link></span>
                
            </div>
        </div>
        </>
    )
}