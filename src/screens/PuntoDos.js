import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';


const RegistroHorasScreen = () => {
  const [fecha, setFecha] = useState('');
  const [horaInicio, setHoraInicio] = useState('');
  const [esAM, setEsAM] = useState(true);
  const [horaSalida, setHoraSalida] = useState('');
  const [totalHoras, setTotalHoras] = useState('');
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    obtenerHoraActual();
    cargarRegistrosGuardados();
  }, []);

  const obtenerHoraActual = () => {
    const horaActual = new Date();
    const hora = horaActual.getHours();
    const minutos = horaActual.getMinutes();
    const periodo = hora < 12 ? 'AM' : 'PM';
    const horaFormateada = `${hora < 10 ? '0' : ''}${hora}:${minutos < 10 ? '0' : ''}${minutos}`;
    setHoraInicio(horaFormateada);
    setEsAM(periodo === 'AM');
  };

  const cargarRegistrosGuardados = async () => {
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

  const calcularTotalHoras = () => {
    if (horaSalida) {
      const horaInicioArray = horaInicio.split(':');
      const horaSalidaArray = horaSalida.split(':');

      const horaInicioTotalMinutos =
        parseInt(horaInicioArray[0]) * 60 + parseInt(horaInicioArray[1]);
      const horaSalidaTotalMinutos =
        parseInt(horaSalidaArray[0]) * 60 + parseInt(horaSalidaArray[1]);

      const diferenciaMinutos = horaSalidaTotalMinutos - horaInicioTotalMinutos;

      if (diferenciaMinutos >= 0) {
        const horas = Math.floor(diferenciaMinutos / 60);
        const minutos = diferenciaMinutos % 60;
        setTotalHoras(`${horas} horas ${minutos} minutos`);
      } else {
        setTotalHoras('Hora de salida debe ser después de la hora de inicio');
      }
    }
  };

  const handleRegistro = async () => {
    calcularTotalHoras();

    // Crear un objeto de registro
    const registro = {
      fecha,
      horaInicio,
      esAM,
      horaSalida,
      totalHoras,
    };

    // Obtener registros existentes de AsyncStorage o crear un nuevo array
    let registrosExistentes = [];
    try {
      const storedRegistros = await AsyncStorage.getItem('registros');
      if (storedRegistros) {
        registrosExistentes = JSON.parse(storedRegistros);
      }
    } catch (error) {
      console.error('Error al obtener registros de AsyncStorage', error);
    }

    // Agregar el nuevo registro al array de registros
    registrosExistentes.push(registro);

    // Guardar el array actualizado en AsyncStorage
    try {
      await AsyncStorage.setItem('registros', JSON.stringify(registrosExistentes));
      console.log('Registro guardado exitosamente');
      setRegistros(registrosExistentes);
    } catch (error) {
      console.error('Error al guardar registro en AsyncStorage', error);
    }

    // Limpiar los campos después de guardar el registro
    setFecha('');
    setHoraSalida('');
    setTotalHoras('');
  };

  return (
    <View style={styles.container}>
      <Text>Registro de Horas</Text>
      <TextInput
        placeholder="Fecha (YYYY-MM-DD)"
        value={fecha}
        onChangeText={(text) => setFecha(text)}
      />
      <Text>Hora Inicio: {horaInicio}</Text>
      <Text>AM/PM: {esAM ? 'AM' : 'PM'}</Text>
      <TextInput
        placeholder="Hora de Salida (HH:MM)"
        value={horaSalida}
        onChangeText={(text) => setHoraSalida(text)}
      />
      <Button title="Registrar" onPress={handleRegistro} />
      <Text>Total de Horas Trabajadas: {totalHoras}</Text>

      <Text style={styles.listaTitulo}>Registros Guardados</Text>
      {registros.map((registro, index) => (
        <View style={styles.listaItem} key={index}>
          <Text>Fecha: {registro.fecha}</Text>
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
    backgroundColor: 'white', 
    alignItems: 'center',
  },
  listaTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  listaItem: {
    marginVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
  },
  text: {
    color: 'white', // Texto blanco
    fontSize: 18,
  },
});

export default RegistroHorasScreen;
