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

export const removeVCards = (data)=>{
    const allD = [];
    Object.map(data,(d,i)=>{
        const _id = isObj(d) && isNonNullString(d._id) ? d._id : isNonNullString(d)? d : undefined;
        const r = isObj(d)? d : {};
        if(_id){
            allD.push({
                ...r,
                _id,
                _deleted : true,
            })
        } 
    })
    if(!allD.length){
        return Promise.reject({message:"Aucune données à supprimér"});
    }
    return getVCardDB().then(({db})=>{
        return db.bulkDocs(allD);
    });
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