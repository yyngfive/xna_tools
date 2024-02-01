'use client';

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { Image } from "@nextui-org/image";
import NextImage from "next/image";

export function ToolCard({ tool_info }) {
    const { name, desc, href, doc } = tool_info;
    return (
        <>
            <Card className="h-60 w-60 " isPressable shadow="sm" onPress={() => {
                window.open(href, '_blank');
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
                    <Link color="primary" href={doc} >
                        User Guide
                    </Link>
                </CardFooter>
            </Card>
        </>
    );
}

export function ToolCardGroup({ children }) {

    return (
        <div className='flex flex-wrap justify-stretch gap-4 m-2 '>
            {children}
        </div>
    );
}