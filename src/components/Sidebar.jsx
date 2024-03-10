'use client';
import useTranslation from 'next-translate/useTranslation';
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { analyzer_config, database_config, visualizer_config } from '../../config/tools';
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { AnalyzerIcon, DatabaseIcon, VisualizerIcon } from '../../public/icons/HomeIcons';
import PlusIcon from "../../public/icons/PlusIcon";
import { Button } from "@nextui-org/button";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";


export default function Sidebar({ type, current }) {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    
    return (
        <>
            <div className='w-56 flex-initial hidden sm:flex'>
                <Menu type={type} current={current} />
            </div >
            <Button isIconOnly color="primary" className="fixed right-7 bottom-28 z-10 sm:hidden" onPress={onOpen}><PlusIcon /></Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={true} isKeyboardDismissDisabled={true}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody className="m-3">
                                <Menu type={type} current={current} />
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>

    );
}

function Menu({ type, current }) {

    const { t, lang } = useTranslation("common");
    
    return (
        <Accordion defaultExpandedKeys={["1"]} >
            <AccordionItem
                key="1"
                aria-label="Analyzer"
                startContent={<AnalyzerIcon className="text-primeary" />}
                title={<h3 className='font-bold text-lg text-primary-600' >Analyzer</h3>}
            >
                <Listbox>
                    {analyzer_config.map((item, index) => (
                        <ListboxItem key={index} href={type === 'docs' ? '/'+lang+item.doc : '/'+lang+item.href}>
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
                    <ListboxItem key={index} href={type === 'docs' ? '/'+lang+item.doc : '/'+lang+item.href}>
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
                        <ListboxItem key={index} href={type === 'docs' ? '/'+lang+item.doc : '/'+lang+item.href}>
                            <span className='font-bold'>{item.name}</span>
                        </ListboxItem>
                    ))}
                </Listbox>

            </AccordionItem>
        </Accordion>
    );
}