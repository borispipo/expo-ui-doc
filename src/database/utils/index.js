import {getDB} from "$pouchdb";
import vCardTable from "../tables/vCard/table";
import notify from "$cnotify";
import {isNonNullString,defaultStr,isObj} from "$cutils";
import generateId from "../tables/vCard/generateId";

export const getVCardDB = ()=>{
    return getDB({dbName:vCardTable});
}

export const fetchVCards = (options)=>{
    return getVCardDB().then(({db})=>{
        return db.getData(vCardTable.toUpperCase(),options);
    })
}

export const upsertVCard = (data)=>{
    data.table = vCardTable.toUpperCase();
    data._id = generateId(data);
    if(!isNonNullString(data?._id)){
        return Promise.reject({
            message : `Le champ nom(lastName) et prenom(firstName) sont requis`,
        })
    }
    return getVCardDB().then(({db})=>{
        return db.upsert(data._id,(nd)=>{
            return {...nd,...data}
        });
    })
}