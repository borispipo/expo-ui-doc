import Item from "../TableDataScreen";
import {getTableDataScreenName} from "$enavigation/utils";
import table from "$src/database/tables/vCard/table";
import generateId from "$src/database/tables/vCard/generateId";
import { upsertVCard } from "$src/database/utils";

export default class VCARDScreen extends Item{
    upsertToDB({data}){
        return upsertVCard(data).then((data)=>{
            return data.newDoc;
        })
    }
    prepareField ({name,field,isUpdate}){
        if(!isUpdate && ["firstName","lastName"].includes(name)){
            const {onBlur} = field;
            field.required = true;
            field.onBlur = (p)=>{
                const firstName = this.getField("firstName"), lastName = this.getField("lastName"),_id = this.getField("_id");
                if(_id  && firstName && lastName && firstName.isValid() && lastName.isValid()){
                    _id.validate({value:generateId({
                        firstName : firstName.getValue(),
                        lastName : lastName.getValue(),
                    })});  
                } 
                if(typeof onBlur =='function'){
                    return onBlur(p)
                }
            }
        }
    }
}

VCARDScreen.screenName = getTableDataScreenName(table);

VCARDScreen.Modal = true;

