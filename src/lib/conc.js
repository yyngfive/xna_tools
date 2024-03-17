import { units_list } from "../app/units";

export function n_by_unit(type,unit){
    
    const n = findObjectByKey(units_list[type],unit).n
    return n
}

function findObjectByKey(array, key) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].key === key) {
        return array[i];
      }
    }
    return null; 
  }