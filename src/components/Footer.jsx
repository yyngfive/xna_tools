'use client'
import {Link} from '@nextui-org/link';
import { Divider } from '@nextui-org/divider';
import useTranslation from 'next-translate/useTranslation';
export default function Footer(){
    const {t,lang} = useTranslation('common')
    return(
        <>
        <div className="bottom-0  z-50 fixed w-full items-center bg-background shadow-lg shadow-black">
            <div className="flex flex-col mx-3 items-center my-4 space-y-3">
                <div className='flex justify-center space-x-4 h-5'>
                    <div ><Link isExternal showAnchorIcon color='foreground' href='https://stassenger.top'>{t('blog')}</Link></div>
                    <Divider orientation="vertical" />
                    <div><Link isExternal showAnchorIcon color='foreground' href='https://github.com/yyngfive/xna_tools'>{t('source')}</Link></div>
                    <Divider orientation="vertical" />
                    <div><Link isExternal showAnchorIcon color='foreground' href='https://github.com/yyngfive/xna_tools/issues'>{t('feedback')}</Link></div>
                </div>
                <span >XNA Tools Copyright © 2024 <Link  isExternal href='https://github.com/yyngfive' showAnchorIcon >Asante</Link></span>
                
            </div>
        </div>
        </>
    )
}