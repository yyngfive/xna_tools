import { units } from "@/app/[lang]/(tools)/conc/units";

export function n_by_unit(type,unit){
    
    n = findObjectByKey(units[type],unit).n
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