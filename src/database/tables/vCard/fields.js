import {fields} from "$src/vCard";

const formFields = {};
Object.map(fields,(f,i)=>{
    if(!isObj(f) || i =="version") return;
    const field = Object.clone(f);
    formFields[i] = field;
    if(["firstName","lastName"].includes(i)){
        field.required  = true;
        field.readOnlyOnEditing = true;
    }
    if(defaultStr(field.type).toLowerCase().trim() =="tel"){
        field.country = "CM"
    }
});

formFields._id = {
    text : "Id",
    width : 180,
    primaryKey : true,
    readOnly : true,
};

export default formFields;