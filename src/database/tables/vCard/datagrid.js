import {navigateToTableData} from "$enavigation/utils";
import newElementLabel from "./newElementLabel";
import table from "./table";
import addIcon from "./addIcon";
import editIcon from "./editIcon";
import {printTableData} from "$epdf";
import {format,fields as fFields} from "$src/vCard";
const {version} = fFields;
export default {
    actions : [
        {icon:addIcon,text:newElementLabel,onPress:()=>navigateToTableData(table)},
    ],
    selectedRowsActions : ({selectedRows})=>{
        return [
            {
                icon : editIcon,
                text : "Modifier",
                onPress : ()=>{
                    navigateToTableData (table,{datas:selectedRows})
                }
            },
            {
                icon : "qrcode-plus",
                text : "Générer QRCodes",
                onPress : ()=>{
                    return printTableData(Object.values(selectedRows),{
                        tableName : table,
                        formDataProps : {
                            fields : {
                                version,
                            }
                        },
                        print : ({data,version})=>{
                            const qr = format({...data,version});
                            const fileName = `${data.firstName && `${data.firstName}`||''}${data.middleName && ` ${data.middleName} `||''}${data.lastName && ` ${data.lastName}` || ""}`;
                            return {
                                content : [
                                    { qr,alignment: "center",fit:250},
                                    {text : fileName, bold : true, margin : [10,35],alignment:"center"},
                                ],
                            }
                        }
                    })
                }
            },
        ]
    }
}