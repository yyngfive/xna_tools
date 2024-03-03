import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { Link } from "@nextui-org/link";
import { Checkbox } from "@nextui-org/checkbox";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";


export default function ConcSetting({ setConc, onClose, conc }) {

    //TODO: 更加细致的范围校验
    const { register, handleSubmit, formState: { errors }, control, getValues } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        if (conc.idk) {
            setConc({ target: 'DNA', oligo: 0.25, na: 50, mg: 0, dntps: 0, idk: true });
        } else {
            setConc(data);
        }

    };
    const conc_validate = (value, min, max) => {
        const conc_value = Number(value);
        if (conc.idk) {
            return (true);
        } else if (conc_value >= min && conc_value <= max) {
            return true;
        } else {
            return (false);
        }
    };

    return (
        <>
            <ModalHeader className="flex flex-col gap-1">Tm Options</ModalHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody>
                    <div className="flex flex-col gap-5">
                        <Select
                            {...register("target", { required: !conc.idk })}
                            size='sm'

                            label="Type"
                            className=""
                            labelPlacement="outside-left"
                            defaultSelectedKeys={[conc.target]}

                            //selectedKeys={[conc.target]}
                            isInvalid={errors.target}
                            errorMessage={errors.target && 'You must choose one type'}

                        >
                            <SelectItem key="DNA" value="DNA">
                                DNA
                            </SelectItem>
                            {/* <SelectItem key="RNA" value="RNA">
                                RNA
                            </SelectItem> */}

                        </Select>

                        <Controller
                            name="oligo"
                            control={control}
                            defaultValue={conc.oligo}
                            rules={{ required: !conc.idk, validate: (value, formValues) => conc_validate(value, 0.0001, 10000) }}
                            render={({ field }) => (
                                <Input

                                    {...field}

                                    label='Oligo Conc.'
                                    type="number"
                                    labelPlacement="outside"
                                    endContent=' μM'
                                    placeholder="Default: 0.25"
                                    size='sm'

                                    isInvalid={errors.oligo}
                                    errorMessage={errors.oligo && 'Range: 0.0001 - 10000 μM'}
                                />
                            )}
                        />

                        <Controller
                            name="na"
                            control={control}
                            defaultValue={conc.na}
                            rules={{ required: !conc.idk, validate: (value, formValues) => conc_validate(value, 5, 1500) }}
                            render={({ field }) => (
                                <Input
                                    {...field}

                                    label={<>Na<sup>+</sup>&nbsp;Conc.</>}
                                    type="number"
                                    labelPlacement="outside"
                                    endContent=' mM'
                                    placeholder="Default: 50"
                                    size='sm'
                                    isInvalid={errors.na}
                                    errorMessage={errors.na && 'Range: 5 - 1500 mM'}
                                />
                            )}
                        />



                        <Controller
                            name="mg"
                            control={control}
                            defaultValue={conc.mg}
                            rules={{
                                required: !conc.idk,
                                validate: (value, formValues) => {
                                    //console.log(formValues);
                                    const mg = Number(value);
                                    if (mg === 0 || conc.idk) {
                                        return (true);
                                    } else if (mg >= 0.01 && mg <= 600) {
                                        return true;
                                    } else {
                                        return (false);
                                    }
                                }
                            }}
                            render={({ field }) => (
                                <Input
                                    {...field}

                                    label={<>Mg<sup>2+</sup>&nbsp;Conc.</>}
                                    type="number"
                                    labelPlacement="outside" endContent=' mM' placeholder="Default: 0" size='sm'

                                    isInvalid={errors.mg}
                                    errorMessage={errors.mg && 'Range: 0.01 - 600 mM'} />
                            )}
                        />
                        <Controller
                            name="dntps"
                            control={control}
                            defaultValue={conc.dntps}

                            rules={{ required: !conc.idk, validate: (value, formValues) => conc_validate(value, 0, 1000) }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    label='dNTPs Conc.' labelPlacement="outside"
                                    type="number"

                                    endContent=' mM' placeholder="Default: 0" size='sm'

                                    isInvalid={errors.dntps}
                                    errorMessage={errors.dntps && 'Range: 0 - 1000 mM'} />
                            )}
                        />
                        <Controller
                            name="idk"
                            control={control}

                            defaultSelected={conc.idk}
                            render={({ field }) => (
                                <Checkbox
                                    {...field}
                                    color="primary"
                                    value={conc.idk}
                                    defaultSelected={conc.idk}
                                    onValueChange={(value) => {
                                        setConc(draft => {
                                            draft.idk = value;
                                        });
                                    }}
                                >I {"don't"} know these concentrations<span className="" size='sm'><Link isExternal showAnchorIcon href="/docs/oligo">&nbsp;Help</Link></span></Checkbox>
                            )}
                        />


                    </div>
                </ModalBody>
                <ModalFooter>
                    
                    <Button color="primary" type="submit" 
                    >
                        Save
                    </Button>
                </ModalFooter>
            </form>
        </>

    );
}


