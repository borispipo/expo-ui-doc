import fields from "./fields";
import tableName from "./table";


export default {
    fields,
    text : "VCard Generator",
    icon : "contacts",
    drawerSection : "introduction",
    newElementLabel : require("./newElementLabel").default,
    tableName,
    datagrid : require("./datagrid").default,
    order : 15,
}