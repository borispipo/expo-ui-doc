import Screen from "$eScreen";
import SWRDatagrid from "$ecomponents/Datagrid/SWRDatagrid";
import vCardTable from "$src/database/tables/vCard/table";
import { fetchVCards } from "$src/database/utils";
import getTable from "$src/database/tables/getTable";
import {defaultStr,isObj} from "$cutils";

export default function TableDataListScreen ({fetcher,table,tableName,...props}){
    tableName = defaultStr(tableName,table);
    const tableObj = Object.assign({},getTable(tableName));
    return <Screen {...props}>
        <SWRDatagrid 
            {...props}
            {...tableObj}
            parseMangoQueries = {false}
            columns = {tableObj.fields}
            {...Object.assign({},tableObj.datagrid)}
            fetchPath = {tableName}
            fetchPathKey = {tableName}
            tableName = {tableName}
            sessionName = {tableName}
            fetcher = {(url,options)=>{
                if(isObj(options?.fetchOptions)){
                    options.fetchOptions.selector = defaultObj(options.fetchOptions.selector,options.fetchOptions.where);
                }
                if(typeof fetcher =="function") return fetcher(url,options);
                return fetchVCards(options);
            }}
        />
    </Screen>
}

TableDataListScreen.withFab = false;//if you want to display main FAB layout on this screen toggle this value to true
TableDataListScreen.withNotifications = true; //pour afficher les notifications dans les écrans de type liste