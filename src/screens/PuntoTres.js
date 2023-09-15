import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const ConsultaHorasScreen = () => {
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFinal, setFechaFinal] = useState('');
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    cargarRegistros();
  }, []);

  const cargarRegistros = async () => {
    try {
      const storedRegistros = await AsyncStorage.getItem('registros');
      if (storedRegistros) {
        const registrosParseados = JSON.parse(storedRegistros);
        setRegistros(registrosParseados);
      }
    } catch (error) {
      console.error('Error al obtener registros de AsyncStorage', error);
    }
  };

  const filtrarRegistrosPorFechas = () => {
    const registrosFiltrados = registros.filter((registro) => {
      const fechaRegistro = new Date(registro.fecha);
      const fechaInicioFiltro = new Date(fechaInicio);
      const fechaFinalFiltro = new Date(fechaFinal);

      return (
        fechaRegistro >= fechaInicioFiltro && fechaRegistro <= fechaFinalFiltro
      );
    });

    return registrosFiltrados.slice(0, 10); // Limitar a máximo 10 registros
  };

  const handleConsultar = () => {
    const registrosFiltrados = filtrarRegistrosPorFechas();
    setRegistros(registrosFiltrados);
  };

  return (
    <View style={styles.container}>
      <Text>Consulta de Horas Trabajadas</Text>
      <TextInput
        placeholder="Fecha de inicio (YYYY-MM-DD)"
        value={fechaInicio}
        onChangeText={(text) => setFechaInicio(text)}
      />
      <TextInput
        placeholder="Fecha final (YYYY-MM-DD)"
        value={fechaFinal}
        onChangeText={(text) => setFechaFinal(text)}
      />
      <Button title="Consultar" onPress={handleConsultar} />

      <Text style={styles.listaTitulo}>Registros Consultados</Text>
      {registros.map((registro, index) => (
        <View style={styles.listaItem} key={index}>
          <Text >Fecha: {registro.fecha}</Text>
          <Text>Hora Inicio: {registro.horaInicio}</Text>
          <Text>AM/PM: {registro.esAM ? 'AM' : 'PM'}</Text>
          <Text>Hora de Salida: {registro.horaSalida}</Text>
          <Text>Total de Horas Trabajadas: {registro.totalHoras}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'grey', // Fondo negro
  },
  text: {
    color: 'white', // Texto blanco
    fontSize: 18,
  },
  listaTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    color: 'white', // Texto blanco
    fontSize: 18,
  },
  listaItem: {
    marginVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    color: 'white', // Texto blanco
    fontSize: 18,
  },
});

export default ConsultaHorasScreen;
