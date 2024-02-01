'use client';

import { Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { sequence_verify, sequence_counts, sequence_complement, sequence_value } from "@/lib/oligo";
import { ResultCard, ResultCardGroup } from "@/components/ResultCard";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/modal";
import ConcSetting from "./concentrations_setting";


export default function OligoUI() {

    const [baseCount, setBaseCount] = useState(0);
    const [seqType, setSeqType] = useState('DNA');
    const [verified, setVerified] = useState(true);
    const [sequence, setSequence] = useState('');
    const [valid, setValid] = useState(false);
    const [conc, setConc] = useState({ target: 'DNA', oligo: 0, Na: 0, Mg: 0, dNTPs: 0 });

    const [complement, setComplement] = useState('');
    const [oligoValue, setOligoValue] = useState({ tm: 0, weight: 0, ext: 0 });

    const { isOpen, onOpen, onOpenChange } = useDisclosure();


    useEffect(() => {
        setValid((seqType != '' && verified) ? true : false);
        //console.log('valid',valid);
        if (valid) {
            setBaseCount(sequence_counts(sequence));
            setComplement(sequence_complement(sequence));
            setOligoValue(sequence_value(sequence, seqType));
        }else{
            setBaseCount(0);
            setComplement('');
            setOligoValue({weight:0,tm:0,ext:0});
        }
    }, [seqType, sequence, verified, valid]);

    return (
        <main className="w-full">
            <div className="flex justify-start gap-3 mt-6">
                <Select
                    size="sm"
                    isRequired
                    label="Type"
                    className="max-w-40"
                    labelPlacement="outside-left"
                    defaultSelectedKey={[seqType]}
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
                    ))
                </Select>
                <>
                    <Button onPress={onOpen} color="primary" size="sm" variant="light">Set concentrations (for Tm value)</Button>
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                        <ModalContent>
                            {(onClose) => (
                                <ConcSetting onClose={onClose} setConc={setConc} />
                            )}
                        </ModalContent>
                    </Modal>
                </>
            </div>


            <Textarea
                isRequired
                isInvalid={!verified}
                errorMessage={verified ? '' : 'Please check your sequence'}
                label="Sequence (5' → 3')"
                placeholder="Enter your sequence"
                className="max-w-full my-2 break-all"
                value={sequence}
                onValueChange={(value) => {
                    setSequence(value);
                    setVerified(sequence_verify(value, seqType));
                    //console.log(sequence, seqType, verified);
                }}
            />
            <div className="grid grid-cols-2 w-full">
                <span className="self-center">Bases {baseCount}</span>
                <Button color="danger" className="place-self-end" onClick={()=>{setSequence('');setVerified(sequence_verify('', seqType));}}>Clear</Button>
            </div>
            <ResultCardGroup>
                <ResultCard title="Complement 3' → 5'" result={complement} type='text'/>
                <ResultCard title="Oligo Parameters" result={
                    {
                        columns:[
                            {key:'name',label:'NAME'},
                            {key:'value',label:'VALUE'}
                        ],
                        rows:[
                            {key:'1',name:'Molecular Weight',value:oligoValue.weight + ' g/mole'},
                            {key:'2',name:'Tm Value',value:oligoValue.tm + ' ℃'},
                            {key:'3',name:'Extinction Coefficient',value:oligoValue.ext + ' L/(mole·cm)'},
                        ]
                    }
                } type='table'/>
            </ResultCardGroup>


        </main>
    );
}

