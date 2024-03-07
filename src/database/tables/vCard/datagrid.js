import {navigateToTableData} from "$enavigation/utils";
import newElementLabel from "./newElementLabel";
import table from "./table";
import addIcon from "./addIcon";
import editIcon from "./editIcon";
import {printTableData} from "$epdf";
import {format,fields as fFields} from "$src/vCard";
import Label from "$ecomponents/Label";
import {showConfirm} from "$econfirm";
import {removeVCards} from "$src/database/utils";
import notify from "$notify";
import Preloader from "$preloader";

const {version} = fFields;

export default {
    actions : [
        {icon:addIcon,text:newElementLabel,onPress:()=>navigateToTableData(table)},
    ],
    selectedRowsActions : ({selectedRows,context})=>{
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
                    const _fields = {version,sep:{type:"html",render:()=><Label primary textBold fontSize={17}>Work addesses</Label>,label:"Work addesses",responsiveProps : {style:[{width:"100%"}]}}};
                    const addessesFields = ['label',"street","city","stateProvince","postalCode","countryRegion"];
                    addessesFields.map((add)=>{
                        _fields[add] = {
                            type : "text",
                            label : add.includes("country")? "Country" : add.toCamelCase().ucFirst(),
                        }
                    });
                    return printTableData(Object.values(selectedRows),{
                        tableName : table,
                        formDataProps : {
                            fields : _fields,
                        },
                        print : ({data,version,...rest})=>{
                            const workAddress = {};
                            addessesFields.map((ad)=>{
                                workAddress[ad] = rest[ad];
                            });
                            console.log("will print with work address ",workAddress,data);
                            const qr = format({...data,version,workAddress});
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
            {
                text : "Supprimer",
                icon : "delete",
                onPress : ()=>{
                    return showConfirm({
                        title : "Supprimer les éléments",
                        message : "Voulez vous supprimer les éléments sélectionnés",
                        onSuccess : ()=>{
                            Preloader.open("Suppression en cours...");
                            return removeVCards(selectedRows).then(()=>{
                                notify.success("Données supprimées avec succèes");
                                context?.refresh && context.refresh();
                            }).finally(Preloader.close);
                        }
                    })
                }
            }
        ]
    }
}