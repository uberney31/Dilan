
import {View, Text} from 'react-native'
import RegisterForm from '../Components/RegisterForm';
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function SettingsScreen(){
    return(
        <View>
            <Text>Aqui puedes crear tu ceunta para usar la app</Text>
            <RegisterForm/>
        </View>
    );

}