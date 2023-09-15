import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; 

// ..


const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigation = useNavigation();
  

  const handleLogin = async () => {
    // Recuperar el usuario almacenado localmente
    try {
      const userJSON = await AsyncStorage.getItem('user');
      if (userJSON !== null) {
        const savedUser = JSON.parse(userJSON);
        
        // Validar las credenciales ingresadas con las almacenadas localmente
        if (savedUser.email === email && savedUser.password === password) {
          // Autenticación exitosa
           navigation.navigate("Despues")
          setError('yes');
          
          // Realizar acciones de autenticación o navegar a la siguiente pantalla
        } else {
          setError('Credenciales incorrectas');
        }
      } else {
        setError('El usuario no está registrado');
      }
    } catch (error) {
      console.error('Error al cargar el usuario desde AsyncStorage', error);
    }
  };

  return (
    <View>
      <Text>Inicio de Sesión</Text>
      {error !== '' && <Text style={{ color: 'red' }}>{error}</Text>}
      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Iniciar Sesión" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
