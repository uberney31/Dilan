
import {createStackNavigator} from "@react-navigation/stack"
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LoginForm from '../Components/LoginForm';
import PuntoDos from '../screens/PuntoDos';
import PuntoTres from '../screens/PuntoTres';
import PuntoCuatro from '../screens/PuntoCuatro';
import Inicio from '../screens/Inicio';
import { SafeAreaProvider } from 'react-native-safe-area-context';


const Stack = createStackNavigator();

export default function NavigationStack(){
    return(
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Login" component={HomeScreen} />
            <Stack.Screen name="Crear" component={SettingsScreen} />
            <Stack.Screen name="Inicio" component={LoginForm} />
            <Stack.Screen name="PuntoDos" component={PuntoDos} />
            <Stack.Screen name="Punto3" component={PuntoTres} />
            <Stack.Screen name="Punto4" component={PuntoCuatro} />
            <Stack.Screen name="Despues" component={Inicio} />
        </Stack.Navigator>
    )

}
