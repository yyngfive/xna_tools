
import { Card, CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import { Button } from '@nextui-org/button';
import { Popover, PopoverTrigger, PopoverContent } from '@nextui-org/popover';
import { useState } from 'react';
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    getKeyValue
} from "@nextui-org/react";

function table_to_csv(table) {
    let csv = '';

    table.columns.forEach(column => {
        csv += column.label + ',';
    });
    csv += '\n';

    table.rows.forEach(row => {
        table.columns.forEach(column => {
            csv += row[column.key] + ',';
        });
        csv += '\n';
    });

    return csv;
}

export function ResultCard({ title, result, type }) {

    const [isOpen, setOpen] = useState(false);

    return (
        <>
            <Card shadow='none' className='border' radius='sm'>
                <CardHeader>
                    <h3 className='font-bold'>{title}</h3>
                </CardHeader>
                <CardBody className='break-all'>
                    {type === 'table' && <Table aria-label={title} removeWrapper>
                        <TableHeader columns={result.columns}>
                            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                        </TableHeader>
                        <TableBody items={result.rows}>
                            {(item) => (
                                <TableRow key={item.key}>
                                    {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>}
                    {type === 'text' && result}
                </CardBody>
                <CardFooter>

                    <Popover placement="bottom" isOpen={isOpen}>
                        <PopoverTrigger>
                            <Button color='default' onClick={async () => {
                                try {
                                    if(type === 'table'){
                                        await navigator.clipboard.writeText(table_to_csv(result));
                                    }else if(type === 'text'){
                                        await navigator.clipboard.writeText(result);
                                    }
                                    
                                } catch (err) {
                                    console.error(err.name, err.message);
                                }
                                setOpen(true);
                                setTimeout(() => { setOpen(false); }, 1000);
                            }}>Copy</Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <div className="px-1 py-2">
                                <div className="text-small font-bold">Copied!</div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </CardFooter>
            </Card>
        </>
    );
}

export function ResultCardGroup({ children }) {

    return (
        <div className="my-5 flex flex-col gap-3 justify-start max-w-full">
            {children}
        </div>
    );
}