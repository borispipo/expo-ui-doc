import {isNonNullString,defaultStr,isObj} from "$cutils";

export default function generateId(data){
    if(!isObj(data)) return "";
    if(isNonNullString(data._id)) return data._id;
    if(!isNonNullString(data?.firstName) || !isNonNullString(data?.lastName)){
        return "";
    }
    data._id = defaultStr(data._id,`${data.firstName}-${data.lastName}`.replace(/\s/g,''))
    return data._id;
}