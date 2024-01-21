import Screen from "$escreen";
import DocVersion from "$components/DocVersion";
import View from "$ecomponents/View";

export default function DocIntrodoctionScreen(props){
    return <Screen {...props}>
        <View>
            <DocVersion/>
        </View>    
    </Screen>
}

DocIntrodoctionScreen.screenName = "introduction";