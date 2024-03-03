'use client';

import { Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { useEffect, useState } from "react";
import { sequence_verify, sequence_length, sequence_complement, sequence_value, sequence_parse } from "@/lib/oligo";
import { ResultCard, ResultCardGroup } from "@/components/ResultCard";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/modal";
import {Accordion, AccordionItem} from "@nextui-org/accordion";
import ConcSetting from "./concentrations_setting";
import { useImmer } from "use-immer";

import { ChevronDownIcon } from "../../../../public/icons/ChevronDownIcon";


export default function OligoUI() {

    const [baseCount, setBaseCount] = useState(0);
    const [seqType, setSeqType] = useState('DNA');
    const [verified, setVerified] = useState(true);
    const [sequence, setSequence] = useState('');
    const [parsed, setParsed] = useState([]);
    const [valid, setValid] = useState(false);
    const [conc, setConc] = useImmer({ target: 'DNA', oligo: 0.25, na: 50, mg: 0, dntps: 0, idk: false });

    const [complement, setComplement] = useState('');
    const [oligoValue, setOligoValue] = useState({ tm: 0, weight: 0, ext: 0, gc: 0 });

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const valid_modi = [
        {key:'0101',value:'5bioA'},
        {key:'0102',value:'5bioT'},
        {key:'0103',value:'5bioC'},
        {key:'0104',value:'5bioG'},
        {key:'0201',value:'rA'},
        {key:'0202',value:'rC'},
        {key:'0203',value:'rT'},
        {key:'0204',value:'rG'},
        {key:'0205',value:'rU'},
        {key:'0206',value:'rI'},
        {key:'0301',value:'tA'},
        {key:'0302',value:'tC'},
        {key:'0303',value:'tG'},
        {key:'0304',value:'tT'},
        {key:'0305',value:'tU'},
        {key:'0401',value:'fA'},
        {key:'0402',value:'fC'},
        {key:'0403',value:'fG'},
        {key:'0404',value:'fT'},
        {key:'0405',value:'fU'},
    ] 

    const handleInput = (value) => {
        ///console.log('value', value);
        setSequence(value);
        const verified_here = sequence_verify(value, seqType);
        //console.log('verified', verified_here);
        setVerified(verified_here);
        if (verified_here) {
            setParsed(sequence_parse(value));

        }
    };

    useEffect(() => {
        if (verified) {
            //console.log('parsed', parsed);
            setBaseCount(sequence_length(parsed));
            setComplement(sequence_complement(parsed));
            setOligoValue(sequence_value(parsed, seqType, conc));
        } else {
            setBaseCount(0);
            setComplement('');
            setOligoValue({ tm: 0, weight: 0, ext: 0, gc: 0 });
        }
    }, [verified, parsed, seqType, conc]);


    return (
        <main className="w-full">
            <div className="flex justify-start gap-3 mt-6">
                <Select
                    size="sm"
                    label="Set As"
                    aria-label="type"
                    className="w-36"
                    labelPlacement="outside-left"
                    defaultSelectedKeys={[seqType]}
                    selectedKeys={[seqType]}
                    isInvalid={seqType === '' ? true : false}
                    errorMessage={seqType === '' ? 'You must choose one type' : ''}
                    onChange={(e) => {
                        setSeqType(e.target.value);
                        setVerified(sequence_verify(sequence, e.target.value));
                        //console.log(seqType);
                    }}
                >
                    <SelectItem key="DNA" value="DNA">
                        DNA
                    </SelectItem>
                    <SelectItem key="RNA" value="RNA">
                        RNA
                    </SelectItem>
                    <SelectItem key="TNA" value="TNA">
                        TNA
                    </SelectItem>
                    <SelectItem key="FANA" value="FANA">
                        FANA
                    </SelectItem>

                </Select>
                {/* TODO: 自动插入修饰：5‘：插入开头，3’：插入结尾，中间：插入光标后*/}
                <Dropdown >
                    <DropdownTrigger>
                        <Button
                             size="sm" className="w-32" color="primary" endContent={<ChevronDownIcon/>}
                        >
                            Modifications
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="modifications" items={valid_modi}>
                        {(item) => (
                            <DropdownItem
                                key={"modi" + item.key}
                              
                            >
                                {item.value}
                            </DropdownItem>
                        )}
                    </DropdownMenu>
                </Dropdown>
        
                <>
                    <Button onPress={onOpen} color="primary" size="sm" variant="light">Tm Options</Button>
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                        <ModalContent>
                            {(onClose) => (
                                <ConcSetting onClose={onClose} setConc={setConc} conc={conc} />
                            )}
                        </ModalContent>
                    </Modal>
                </>
            </div>


            <Textarea
                isRequired
                maxLength={200}
                isInvalid={!verified}
                errorMessage={verified ? '' : 'Please check your sequence'}
                label="Sequence (5' → 3')"
                placeholder="Enter your sequence"
                className="max-w-full my-2 break-all"
                value={sequence}
                onValueChange={handleInput}
            />

            <div className="grid grid-cols-2 w-full">
                <span className="self-center">Bases {baseCount}</span>
                <Button color="danger" className="place-self-end" onClick={() => { setSequence(''); setVerified(sequence_verify('', seqType)); setParsed([]); }}>Clear</Button>
            </div>

            <ResultCardGroup>
                <ResultCard title="Complement 3' → 5'" result={complement} type='text' />
                <ResultCard title="Parameters" result={
                    {
                        columns: [
                            { key: 'name', label: 'NAME' },
                            { key: 'value', label: 'VALUE' }
                        ],
                        rows: [
                            { key: '1', name: 'Molecular Weight', value: oligoValue.weight + ' g/mole' },
                            { key: '2', name: 'GC Content', value: oligoValue.gc + ' %' },
                            { key: '3', name: 'Tm Value', value: oligoValue.tm + ' ℃' },
                            { key: '4', name: 'Extinction Coefficient', value: oligoValue.ext + ' L/(mole·cm)' },
                        ]
                    }
                } type='table' />
            </ResultCardGroup>


        </main >
    );
}

