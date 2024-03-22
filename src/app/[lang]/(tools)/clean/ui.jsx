'use client';
import useTranslation from 'next-translate/useTranslation';
import { ResultCard, ResultCardGroup } from "@/components/ResultCard";
import { Textarea, Input } from "@nextui-org/input";
import { Select, SelectSection, SelectItem } from "@nextui-org/select";
import { useRef, useState } from 'react';
import { Button } from "@nextui-org/button";
import { sequence_verify, make_dna_clean, row_verify } from '@/lib/clean';
export default function CleanUi() {
    const { t } = useTranslation('clean');
    const [verified, setVerified] = useState(true);
    const [verifiedRow, setVerifiedRow] = useState(true);
    const [cleaned, setCleaned] = useState("");
    const sequenceRef = useRef(null);
    const rowRef = useRef(30);
    const handleInput = () => {

        const sequence = sequenceRef.current.value;
        const row = rowRef.current.value;
        const test = sequence_verify(sequence);
        const test_row = row_verify(row);

        setVerified(test);
        setVerifiedRow(test_row);
        if (test && test_row) {
            setCleaned(make_dna_clean(sequence, Number(row)));
            //console.log(make_dna_clean(sequence, 5));
        }
        //setCleaned(sequence.current.value);
    };

    return (
        <>
            <div className='flex gap-3 my-3'>
                <Input ref={rowRef} type='number' size='sm' className='max-w-32' variant="underlined" labelPlacement='outside-left' label={t('clean:Max Width')} isInvalid={!verifiedRow} errorMessage={verifiedRow ? '' : 'Range: 10-200'} defaultValue='30' />
                {/* <Select label={''} size='sm' className='max-w-32' variant='underlined'>

                </Select>
                <Input label={''} size='sm' variant='underlined' className='max-w-32'/>
                <Input label={''} size='sm' variant='underlined' className='max-w-32'/>
                <Input label={''} size='sm' variant='underlined' className='max-w-32'/> */}
            </div>


            <form>
                <Textarea
                    isRequired
                    ref={sequenceRef}
                    isInvalid={!verified}
                    errorMessage={verified ? '' : 'Please check your sequence'}
                    label={t("clean:Sequence") + " 5' → 3'"}
                    placeholder={t("clean:Enter your sequence")}
                    className="max-w-full my-2 break-all"
                    onBlur={handleInput}
                />
                <div className='flex flex-row place-content-end my-3 gap-2'>
                    <Button color="primary" className="text-white" onClick={handleInput}>{t("Ok")}</Button>
                    <Button color="danger" type='reset' className="text-white" onClick={() => { handleInput(); }} >{t("Clear")}</Button>
                </div>
            </form>

            {/* TODO:增加序列统计信息 */}
            <ResultCardGroup>
                <ResultCard title={t("clean:Result")} result={cleaned} type='text' className='break-all whitespace-pre-wrap overflow-auto font-mono' />
            </ResultCardGroup>
        </>
    );
};