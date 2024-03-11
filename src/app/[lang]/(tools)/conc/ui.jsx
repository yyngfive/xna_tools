'use client';

import { Select, SelectSection, SelectItem } from "@nextui-org/select";
import { n_by_unit } from "@/lib/conc";
import { Input } from "@nextui-org/input";
import { cm } from "./common_molecule";
import { Link } from "@nextui-org/link";
import { units_list } from "./units";
import { useEffect, useRef, useState } from "react";

export default function ConcUi() {

    const [ori, setOri] = useState({ vol: 0.0, mass: 0.0, density: 0.0, amount: 0.0, mw: 0.0, massconc: 0.0, mol: 0.0 });
    const [oriStock, setOriStock] = useState({ vol: 0.0, mass: 0.0, density: 0.0, amount: 0.0, mw: 0.0, massconc: 0.0, mol: 0.0 });
    const [oriUnit, setOriUnit] = useState({ vol: 'mL', mass: 'g', density: 'gpermL', amount: 'mole', mw: 'gpermole', massconc: 'gperL', mol: 'M' });
    const [dil, setDil] = useState({ vol: 0.0, mass: 0.0, density: 0.0, massconc: 0.0, mol: 0.0 });
    

    const handleVol1 = (value) => {
        const stock = n_by_unit('vol',oriUnit['vol']) * Number(value)
        console.log(stock);
         setOriStock({
             ...oriStock,
             vol:stock,
         })
         setOri({
            ...ori,
            vol:Number(value),
        })
    };
    // TODO：单位切换逻辑：已有数值：自动对数值进行单位换算，显示新的值
    // 修改数值：根据新的单位计算其他数据值
    // 计算时考虑单位
    const handleUnitVol1 = (value) => {
        //console.log('unit', value);
        var unit
        for (const item of value) {
            unit = item
          }
        setOriUnit({
            ...oriUnit,
            vol: unit,
        });
        setOri({
            ...ori,
            vol:Number(value) / n_by_unit('vol',unit),
        })
    };

    useEffect(() => {
        
        console.log('ori', ori);
    }, [ori]);

    return (
        <>
            <div className="flex flex-col gap-3 mt-4 mb-7">
                <div className="flex gap-3">
                    <Select
                        label="Molecule"
                        size="sm"
                        className="max-w-xs"
                    >
                        {cm.map((mole) => (
                            <SelectItem key={mole.name} textValue={mole.name}>
                                {mole.name}
                            </SelectItem>
                        ))}
                    </Select>
                    <Link isExternal href="/docs/conc">Need more?</Link>
                </div>
                {/* TODO:重置按钮 */}
                <span className="w-full text-lg font-bold my-2">Original</span>
                <div className="flex flex-col  gap-3">
                    <ConcItem title="Volume1" units={units_list['volume']} default_unit={'mL'} handleChange={handleVol1} handleSelect={handleUnitVol1} value={ori.vol} />
                    <ConcItem title="Mass1" units={units_list['mass']} default_unit={'g'} />
                    <ConcItem title="Density1" units={units_list['density']} default_unit={'gpermL'} />
                    <ConcItem title="Amount of Substance" units={units_list['amount']} default_unit={'mole'} />
                    <ConcItem title="Molecular Weight" units={units_list['mw']} default_unit={'gpermole'} />
                    <ConcItem title="Mass Concentration1" units={units_list['massconc']} default_unit={'gperL'} />
                    <ConcItem title="Molarity1" units={units_list['molarity']} default_unit={'mM'} />
                </div>
                <span className="w-full text-lg font-bold my-2">Diluted</span>
                <div className="flex flex-col  gap-3">
                    <ConcItem title="Volume2" units={units_list['volume']} default_unit={'mL'} />
                    <ConcItem title="Mass2" units={units_list['mass']} default_unit={'g'} />
                    <ConcItem title="Density2" units={units_list['density']} default_unit={'gpermL'} />
                    <ConcItem title="Mass Concentration2" units={units_list['massconc']} default_unit={'gperL'} />
                    <ConcItem title="Molarity2" units={units_list['molarity']} default_unit={'mM'} />
                </div>
            </div>
        </>
    );
}

function ConcItem({ title, units, default_unit, handleChange, handleSelect, value }) {

    return (
        <div className="flex flex-row gap-3 ml-1 mr-3">
            <span className="text-sm flex-auto w-28 my-auto">{title}</span>
            <ValueInput units={units} default_unit={default_unit} handleChange={handleChange} handleSelect={handleSelect} value={value} />
        </div>
    );
}

function ValueInput({ units, default_unit, handleChange, handleSelect, value }) {

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
            value = {value}
            onValueChange={handleChange}

            endContent={
                <Select
                    disallowEmptySelection
                    items={units}
                    aria-label="Volume Unit"
                    className="w-40"
                    size="sm"
                    variant="underlined"
                    defaultSelectedKeys={[default_unit]}
                    onSelectionChange={handleSelect}
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