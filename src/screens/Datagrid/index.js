import Screen from "$eScreen";
import Test from "$ecomponents/Datagrid/Test";
import React  from "$react";
import {isMobileNative} from "$cplatform";

export default function DatagridScreen(props){
    return <Screen{...props} contentContainerStyle={[{flex:1}]}>
        <Test count={isMobileNative() ? 1000 : 10000}/>
    </Screen>
};

DatagridScreen.screenName = "datagrid/test";
DatagridScreen.authRequired = false;