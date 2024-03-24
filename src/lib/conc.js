import { units_list } from "../app/units";

export function n_by_unit(type, unit) {

    const n = findObjectByKey(units_list[type], unit).n;
    return n;
}

function findObjectByKey(array, key) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].key === key) {
            return array[i];
        }
    }
    return null;
}

const operations2 = {
    vol_mass:('massconc','-/'),
    vol_amount:('mol','-/'),
    vol_massconc:('mass','*'),
    vol_mol:('amount','*'),
    mass_amount:('mw','/'),
    mass_mw:('amount','/'),
    mass_massconc:('vol','/'),
    amount_mw:('mass','*'),
    amount_mol:('vol','/'),
    mw_massconc:('mol','-/'),
    mw_mol:('massconc','*'),
    massconc_mol:('mw','/'),
}

const calcOri = (oriStock,input) => {

};