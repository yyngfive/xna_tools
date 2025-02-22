'use client';

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import useTranslation from 'next-translate/useTranslation';
import { Link } from "@nextui-org/link";
import { Image } from "@nextui-org/image";
import NextImage from "next/image";

export function ToolCard({ tool_info }) {
    const { name, desc, href, doc } = tool_info;
    const { lang } = useTranslation('common');
    return (
        <>
            <Card className="h-60 w-60 " isPressable shadow="sm" onPress={() => {
                if(href.slice(0,1) === '/'){
                    window.open('/'+lang+href, '_blank');
                }else{
                    window.open(href, '_blank');
                }
                
            }}>

                <CardHeader>
                    <h3 className="font-bold">
                        {name}
                    </h3>

                </CardHeader>
                <CardBody>

                    <p className="absolute bottom-1 left-3 right-3">{desc}</p>
                </CardBody>
                <CardFooter>
                    <Link color="primary" href={'/'+lang+doc} >
                        User Guide
                    </Link>
                </CardFooter>
            </Card>
        </>
    );
}

export function ToolCardGroup({ children }) {

    return (
        <div className='flex flex-wrap gap-4 m-2 '>
            {children}
        </div>
    );
}