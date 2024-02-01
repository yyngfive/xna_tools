'use client';

import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { analyzer_config, database_config,visualizer_config } from '../../config/tools';
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { AnalyzerIcon, DatabaseIcon, VisualizerIcon } from '../../public/icons/HomeIcons';

export default function Sidebar({ type }) {

    return (
        <div className='flex-initial w-56'>
            <Accordion defaultExpandedKeys={["1"]} selectionMode="multiple">
                <AccordionItem
                    key="1"
                    aria-label="Analyzer"
                    startContent={<AnalyzerIcon className="text-primeary" />}
                    title={<h3 className='font-bold text-lg text-primary-600' >Analyzer</h3>}
                >
                    <Listbox>
                        {analyzer_config.map((item, index) => (
                            <ListboxItem key={index} href={type==='docs'?item.doc: item.href}>
                                <span className='font-bold'>{item.name}</span>
                            </ListboxItem>
                        ))}
                    </Listbox>

                </AccordionItem>

                <AccordionItem
                    key="2"
                    aria-label="Visualizer"
                    startContent={<VisualizerIcon className="text-secondary" />}
                    title={<h3 className='font-bold text-lg text-secondary-600' >Visualizer</h3>}
                >
                    {visualizer_config.map((item, index) => (
                            <ListboxItem key={index} href={type==='docs'?item.doc: item.href}>
                                <span className='font-bold'>{item.name}</span>
                            </ListboxItem>
                        ))}
                </AccordionItem>
                <AccordionItem
                    key="3"
                    aria-label="Database"
                    startContent={<DatabaseIcon className="text-success" />}
                    title={<h3 className='font-bold text-lg text-success-600' >Database</h3>}>
                    <Listbox>
                        {database_config.map((item, index) => (
                            <ListboxItem key={index} href={type==='docs'?item.doc: item.href}>
                                <span className='font-bold'>{item.name}</span>
                            </ListboxItem>
                        ))}
                    </Listbox>

                </AccordionItem>
            </Accordion>
        </div>
    );
}