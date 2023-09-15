
import {View, Text, Button, StyleSheet} from 'react-native'
import LoginForm from '../Components/LoginForm';
import { SafeAreaProvider } from 'react-native-safe-area-context';



export default function HomeScreen(props){
    const{navigation}=props;

    const goToSettings =()=>{
       navigation.navigate("Crear")
    }
   
     //

     //
    console.log(props);
    return(
        <View style={styles.container}>
            <Text>Registro de horas de los trabajadores de una mina</Text>
              <LoginForm/>
              <View style={styles.separator} />
              <Button onPress={goToSettings} title="Crear Cuenta"/>
        </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    separator: {
        height: 10, // Altura de separación deseada entre botones
      },
  });

