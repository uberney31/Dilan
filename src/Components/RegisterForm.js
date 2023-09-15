import React, { useState } from 'react';
import { View, Text, TextInput, Button,Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegistrationScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isStrongPassword = (password) => {
    // Utiliza expresiones regulares para verificar los requisitos de contraseña
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleRegistration = async () => {
    if (!isStrongPassword(password)) {
      setError(
        'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial.'
      );
      return;
    }

    // Guardar el usuario localmente
    const user = { email, password };
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
      console.log('Usuario registrado localmente:', user);
      Alert.alert('Éxito', 'El registro se ha realizado correctamente');
    } catch (error) {
      console.error('Error al guardar el usuario en AsyncStorage', error);
    }
  };

  return (
    <View>
      <Text>Registro</Text>
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
      <Button title="Registrarse" onPress={handleRegistration} />
    </View>
  );
};

export default RegistrationScreen;
