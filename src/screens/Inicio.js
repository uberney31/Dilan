import react from 'react'
import { View, Button, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';


import { useNavigation } from '@react-navigation/native'; 


export default function Inicio(){
   
    const navigation = useNavigation();

    const goToPrimero =()=>{
        navigation.navigate("PuntoDos")
         }
    
         const goToSegundo =()=>{
            navigation.navigate("Punto3")
             }

             const goToTres =()=>{
                navigation.navigate("Punto4")
                 }

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          justifyContent: 'center', // Centra verticalmente
          alignItems: 'center', // Centra horizontalmente
          flex: 1,
    backgroundColor: 'black', // Fondo negro
    justifyContent: 'center',
    alignItems: 'center',
        },
        separator: {
          height: 10, // Altura de separación deseada entre botones
        },
        text: {
          color: 'white', // Texto blanco
          fontSize: 18,
        },
      });
      
    
    return(
        <View style={styles.container}>
      <Button title="Ingreso de horas" onPress={goToPrimero} />
      <View style={styles.separator} />
      <View style={styles.separator} />
      <Button title="Consulta de horas" onPress={goToSegundo} />
      <View style={styles.separator} />
      <View style={styles.separator} />
      <Button title= "Novedades" onPress={goToTres} />
    </View>
    );
  };
