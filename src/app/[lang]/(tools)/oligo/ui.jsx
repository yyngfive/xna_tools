'use client';
import useTranslation from 'next-translate/useTranslation';
import { Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import {useEffect, useState } from "react";
import { sequence_verify, sequence_length, sequence_complement, sequence_value, sequence_parse,sequence_get } from "@/lib/oligo";
import { ResultCard, ResultCardGroup } from "@/components/ResultCard";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/modal";
import ConcSetting from "./concentrations_setting";
import { useImmer } from "use-immer";

import { ChevronDownIcon } from "../../../../../public/icons/ChevronDownIcon";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function OligoUI() {

    const { t } = useTranslation('oligo');

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
            setComplement(sequence_complement(sequence_get(parsed)));
            setOligoValue(sequence_value(parsed, seqType, conc));
        } else {
            setBaseCount(0);
            setComplement('');
            setOligoValue({ tm: 0, weight: 0, ext: 0, gc: 0 });
        }
    }, [verified, parsed, seqType, conc]);

    const notify = () => toast.warn(t('common:Alert'));

    useEffect(() => {

        notify()

    }, []);
    return (
        <main className="w-full">
            <ToastContainer />
            <div className="flex justify-start gap-3 mt-6">
                {/* TODO：改成dropdown */}
                <Select
                    isDisabled
                    size="sm"
                    label={t('oligo:set-as')}
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

                <Dropdown>
                    <DropdownTrigger>
                        <Button
                            isDisabled
                            size="sm" className="w-20" color="primary" endContent={<ChevronDownIcon />}
                        >
                            {t('oligo:mod')} </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="modifications" items={[]}>
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
                    <Button onPress={onOpen} color="primary" size="sm" variant="light">{t('oligo:tm-options')}</Button>
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
                label={t("oligo:Sequence") + " 5' → 3'"}
                placeholder={t("oligo:Enter your sequence")}
                className="max-w-full my-2 break-all"
                value={sequence}
                onValueChange={handleInput}
            />

            <div className="grid grid-cols-2 w-full">
                <span className="self-center">{t("oligo:Bases") + " "} {baseCount}</span>
                <Button color="danger" className="place-self-end" onClick={() => { setSequence(''); setVerified(sequence_verify('', seqType)); setParsed([]); }}>Clear</Button>
            </div>

            <ResultCardGroup>
                <ResultCard title={t("oligo:Complement") + " 5' → 3'"} result={complement} type='text' />
                <ResultCard title={t("oligo:Parameters")} result={
                    {
                        columns: [
                            { key: 'name', label: t('oligo:NAME') },
                            { key: 'value', label: t('oligo:VALUE') }
                        ],
                        rows: [
                            { key: '1', name: t('oligo:Molecular Weight'), value: oligoValue.weight + ' g/mole' },
                            { key: '2', name: t('oligo:GC Content'), value: oligoValue.gc + ' %' },
                            { key: '3', name: t('oligo:Tm Value'), value: oligoValue.tm + ' ℃' },
                            { key: '4', name: t('oligo:Extinction Coefficient'), value: oligoValue.ext + ' L/(mole·cm)' },
                            { key: '5', name: 'μM·cm/OD260', value: oligoValue.ext == 0 ? '0' : Number(((1 / oligoValue.ext) * 1000000).toFixed(2)) },
                            { key: '6', name: 'ng·cm/(μL·OD260)', value: oligoValue.ext == 0 ? '0' : Number(((oligoValue.weight / oligoValue.ext) * 1000).toFixed(2)) },
                        ]
                    }
                } type='table' />
            </ResultCardGroup>


        </main >
    );
}

