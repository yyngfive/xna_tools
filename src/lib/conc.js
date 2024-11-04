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

const operations = {
  
};

export function calcConc(ori,dil){
  let newOri = {...ori}
  let newDil = {...dil}
  if(ori.mass > 0 && ori.mw > 0){
    //console.log(typeof ori.mass);
    
    newOri.amount = ori.mass.div(ori.mw)
  }
  if(ori.amount > 0 && ori.vol > 0){
    newOri.mol = ori.amount.div(ori.vol)
  }
  if(ori.amount >0 && dil.mol > 0){
    newDil.vol = ori.amount.div(dil.mol)
  }
  if(ori.mass > 0 && dil.vol > 0){
    newDil.massconc = ori.mass.div(dil.vol)
  }

  return {newOri,newDil};
}