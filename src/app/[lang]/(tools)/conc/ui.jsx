'use client';
import useTranslation from 'next-translate/useTranslation';
import { Select, SelectSection, SelectItem } from "@nextui-org/select";
import { n_by_unit } from "@/lib/conc";
import { Input } from "@nextui-org/input";
import { cm } from "./common_molecule";
import { Link } from "@nextui-org/link";
import { units_list } from "@/app/units";
import { useEffect, useRef, useState } from "react";
import { useImmer } from "use-immer";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// TODO:大数运算
export default function ConcUi() {

    const { t, lang } = useTranslation('conc');

    const [ori, setOri] = useImmer({ vol: '', mass: '', density: '', amount: '', mw: '', massconc: '', mol: '' });
    const [oriStock, setOriStock] = useImmer({ vol: 0.0, mass: 0.0, density: 0.0, amount: 0.0, mw: 0.0, massconc: 0.0, mol: 0.0 });
    const [oriUnit, setOriUnit] = useImmer({ vol: 'mL', mass: 'g', density: 'gpermL', amount: 'mole', mw: 'gpermole', massconc: 'gperL', mol: 'M' });
    const [dil, setDil] = useImmer({ vol: '', mass: '', density: '', massconc: '', mol: '' });
    const [dilStock, setDilStock] = useImmer({ vol: 0.0, mass: 0.0, density: 0.0, massconc: 0.0, mol: 0.0 });
    const [dilUnit, setDilUnit] = useImmer({ vol: 'mL', mass: 'g', density: 'gpermL', massconc: 'gperL', mol: 'M' });


    const handleOri = (value, type) => {
        const stock = n_by_unit(type, oriUnit[type]) * Number(value);
        console.log(stock);

        setOriStock((draft) => {
            draft[type] = stock;
        });
        setOri((draft) => {
            draft[type] = value.toString();
        });


    };
    const handleDil = (value, type) => {
        const stock = n_by_unit(type, dilUnit[type]) * Number(value);
        console.log(stock);

        setDilStock((draft) => {
            draft[type] = stock;
        });
        setDil((draft) => {
            draft[type] = value.toString();
        });


    };
    // TODO：单位切换逻辑：已有数值：自动对数值进行单位换算，显示新的值
    // 修改数值：根据新的单位计算其他数据值
    // 计算时考虑单位
    const handleOriUnit = (value, type) => {
        //console.log('unit', value);
        var unit;
        for (const item of value) {
            unit = item;
        }
        setOriUnit((draft) => {
            draft[type] = unit;
        });

        setOri((draft) => {
            draft[type] = (Number(oriStock[type]) / n_by_unit(type, unit)).toString();
        });
    };
    const handleDilUnit = (value, type) => {
        //console.log('unit', value);
        var unit;
        for (const item of value) {
            unit = item;
        }
        setDilUnit((draft) => {
            draft[type] = unit;
        });

        setDil((draft) => {
            draft[type] = (Number(dilStock[type]) / n_by_unit(type, unit)).toString();
        });
    };

    useEffect(() => {

        console.log('ori', ori);
    }, [ori]);

    const notify = () => toast.warn(t('common:Alert'));

    useEffect(() => {

        notify();

    }, []);


    return (
        <>
            <ToastContainer />
            <div className="flex flex-col gap-3 mt-4 mb-7">
                <div className="flex gap-3">
                    <Select
                        label={t("conc:Molecule")}
                        size="sm"
                        className="max-w-xs"
                    >
                        {cm.map((mole) => (
                            <SelectItem key={mole.name} textValue={mole.name}>
                                {mole.name}
                            </SelectItem>
                        ))}
                    </Select>
                    <Link isExternal href="/docs/conc">{t("conc:Need more")}?</Link>
                </div>
                {/* TODO:重置按钮 */}
                <span className="w-full text-lg font-bold my-2">{t("conc:Original")}</span>
                <div className="flex flex-col  gap-3">

                    <ConcItem title={t("conc:Volume") + " 1"} default_unit={'mL'} value={ori} type='vol' handleChange={handleOri} handleSelect={handleOriUnit} />
                    <ConcItem title={t("conc:Mass") + " 1"} default_unit={'g'} value={ori} type='mass' handleChange={handleOri} handleSelect={handleOriUnit} />
                    <ConcItem title={t("conc:Density") + " 1"} default_unit={'gpermL'} value={ori} type='density' handleChange={handleOri} handleSelect={handleOriUnit} />
                    <ConcItem title={t("conc:Amount of Substance") + " 1"} default_unit={'mole'} value={ori} type='amount' handleChange={handleOri} handleSelect={handleOriUnit} />
                    <ConcItem title={t("conc:Molecular Weight") + " 1"} default_unit={'gpermole'} value={ori} type='mw' handleChange={handleOri} handleSelect={handleOriUnit} />
                    <ConcItem title={t("conc:Mass Concentration") + " 1"} default_unit={'gperL'} value={ori} type='massconc' handleChange={handleOri} handleSelect={handleOriUnit} />
                    <ConcItem title={t("conc:Molarity") + " 1"} default_unit={'mM'} value={ori} type='mol' handleChange={handleOri} handleSelect={handleOriUnit} />
                </div>
                <span className="w-full text-lg font-bold my-2">{t('conc:Diluted')}</span>
                <div className="flex flex-col  gap-3">
                    <ConcItem title={t("conc:Volume") + " 2"} default_unit={'mL'} value={dil} type='vol' handleChange={handleDil} handleSelect={handleDilUnit} />
                    <ConcItem title={t("conc:Mass") + " 2"} default_unit={'g'} value={dil} type='mass' handleChange={handleDil} handleSelect={handleDilUnit} />
                    <ConcItem title={t("conc:Density") + " 2"} default_unit={'gpermL'} value={dil} type='density' handleChange={handleDil} handleSelect={handleDilUnit} />
                    <ConcItem title={t("conc:Mass Concentration") + " 2"} default_unit={'gperL'} value={dil} type='massconc' handleChange={handleDil} handleSelect={handleDilUnit} />
                    <ConcItem title={t("conc:Molarity") + " 2"} default_unit={'mM'} value={dil} type='mol' handleChange={handleDil} handleSelect={handleDilUnit} />

                </div>
            </div>
        </>
    );
}

function ConcItem({ title, default_unit, value, type, handleChange, handleSelect }) {

    return (
        <div className="flex flex-row gap-3 ml-1 mr-3">
            <span className="text-sm flex-auto w-28 my-auto">{title}</span>
            <ValueInput default_unit={default_unit} data={value} type={type} handleChange={handleChange} handleSelect={handleSelect} />
        </div>
    );
}

function ValueInput({ default_unit, data, type, handleChange, handleSelect }) {

    console.log(data, type);

    return (
        <Input
            className="w-2/3"
            type="number"
            aria-label="input"
            placeholder="0.00"
            labelPlacement="outside"
            variant="underlined"
            //onBlur={handleChange}
            //ref={valueRef}
            value={data[type]}
            onValueChange={(value) => {
                handleChange(value, type);
            }}

            endContent={
                <Select
                    disallowEmptySelection
                    items={units_list[type]}
                    aria-label="Volume Unit"
                    className="w-40"
                    size="sm"
                    variant="underlined"
                    defaultSelectedKeys={[default_unit]}
                    onSelectionChange={(value) => {
                        handleSelect(value, type);
                    }}
                    renderValue={(items) => {
                        return items.map((item) => (
                            <div key={item.key} >
                                {item.data.power ? <span className="text-right w-full">{item.data.name}<sup>{item.data.power}</sup></span> : <span className="text-right w-full">{item.data.name}</span>}

                            </div>
                        ));
                    }}
                >
                    {(unit) => (
                        <SelectItem className="w-48" key={unit.key} textValue={unit.name}>
                            {unit.power ? <span >{unit.name}<sup>{unit.power}</sup></span> : <span >{unit.name}</span>}
                        </SelectItem>
                    )}
                </Select>
            }
        />
    );
}