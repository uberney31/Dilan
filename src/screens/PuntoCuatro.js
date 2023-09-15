import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput, FlatList, AsyncStorage, Alert } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';


const RegistroIncapacidadesScreen = () => {
  const [tipoRegistro, setTipoRegistro] = useState('Incapacidad');
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [dias, setDias] = useState('');
  const [horas, setHoras] = useState('');
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    cargarRegistrosGuardados();
  }, []);

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

  const calcularDias = () => {
    const fechaInicioDate = new Date(fechaInicio);
    const fechaFinDate = new Date(fechaFin);

    // Calcular la diferencia en milisegundos
    const diferenciaMilisegundos = fechaFinDate - fechaInicioDate;

    // Calcular los días redondeando hacia arriba
    const diasCalculados = Math.ceil(diferenciaMilisegundos / (1000 * 60 * 60 * 24));

    setDias(diasCalculados.toString());
  };

  const handleGuardarRegistro = () => {
    // Validar las reglas para licencias y vacaciones
    if (tipoRegistro === 'Licencia') {
      const horasFloat = parseFloat(horas);
      if (horasFloat > 8) {
        setTipoRegistro('Vacaciones');
        setDias('1'); // Establecer automáticamente a 1 día para vacaciones
        Alert.alert('Mensaje', 'La licencia debe ser ingresada como vacaciones debido a que supera las 8 horas.');
      } else {
        // Crear un objeto de registro
        const registro = {
          tipo: tipoRegistro,
          fechaInicio,
          fechaFin,
          dias,
        };

        // Guardar el registro en el array de registros
        const nuevosRegistros = [...registros, registro];
        setRegistros(nuevosRegistros);

        // Guardar los registros en AsyncStorage
        guardarRegistrosEnAsyncStorage(nuevosRegistros);

        // Limpiar los campos después de guardar el registro
        setFechaInicio('');
        setFechaFin('');
        setDias('');
        setHoras('');
      }
    } else if (tipoRegistro === 'Vacaciones') {
      const diasInt = parseInt(dias);
      if (diasInt < 1) {
        setDias('1'); // Establecer mínimo a 1 día para vacaciones
      } else if (diasInt > 15) {
        setDias('15'); // Establecer máximo a 15 días para vacaciones
        Alert.alert('Mensaje', 'Las vacaciones no pueden exceder de 15 días.');
      } else {
        // Crear un objeto de registro
        const registro = {
          tipo: tipoRegistro,
          fechaInicio,
          fechaFin,
          dias,
        };

        // Guardar el registro en el array de registros
        const nuevosRegistros = [...registros, registro];
        setRegistros(nuevosRegistros);

        // Guardar los registros en AsyncStorage
        guardarRegistrosEnAsyncStorage(nuevosRegistros);

        // Limpiar los campos después de guardar el registro
        setFechaInicio('');
        setFechaFin('');
        setDias('');
        setHoras('');
      }
    } else {
      // Crear un objeto de registro
      const registro = {
        tipo: tipoRegistro,
        fechaInicio,
        fechaFin,
        dias,
      };

      // Guardar el registro en el array de registros
      const nuevosRegistros = [...registros, registro];
      setRegistros(nuevosRegistros);

      // Guardar los registros en AsyncStorage
      guardarRegistrosEnAsyncStorage(nuevosRegistros);

      // Limpiar los campos después de guardar el registro
      setFechaInicio('');
      setFechaFin('');
      setDias('');
      setHoras('');
    }
  };

  const guardarRegistrosEnAsyncStorage = async (registros) => {
    try {
      await AsyncStorage.setItem('registros', JSON.stringify(registros));
      console.log('Registros guardados exitosamente');
    } catch (error) {
      console.error('Error al guardar registros en AsyncStorage', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Registro de Incapacidades, Licencias y Vacaciones</Text>

      <View style={styles.botonesContainer}>
        <Button
          title="Incapacidad"
          onPress={() => setTipoRegistro('Incapacidad')}
          color={tipoRegistro === 'Incapacidad' ? 'lightblue' : 'gray'}
        />
        <Button
          title="Licencia"
          onPress={() => setTipoRegistro('Licencia')}
          color={tipoRegistro === 'Licencia' ? 'lightblue' : 'gray'}
        />
        <Button
          title="Vacaciones"
          onPress={() => setTipoRegistro('Vacaciones')}
          color={tipoRegistro === 'Vacaciones' ? 'lightblue' : 'gray'}
        />
      </View>

      <TextInput
        placeholder="Fecha de inicio (YYYY-MM-DD)"
        value={fechaInicio}
        onChangeText={(text) => setFechaInicio(text)}
      />
      <TextInput
        placeholder="Fecha de fin (YYYY-MM-DD)"
        value={fechaFin}
        onChangeText={(text) => setFechaFin(text)}
      />
      {tipoRegistro === 'Licencia' && (
        <TextInput
          placeholder="Horas"
          value={horas}
          onChangeText={(text) => setHoras(text)}
        />
      )}
      <Button title="Calcular Días" onPress={calcularDias} />
      <Text>Días: {dias}</Text>

      <Button title="Guardar Registro" onPress={handleGuardarRegistro} />

      <Text style={styles.listaTitulo}>Registros Guardados</Text>
      <FlatList
        data={registros}
        renderItem={({ item }) => (
          <View style={styles.listaItem}>
            <Text>Tipo: {item.tipo}</Text>
            <Text >Fecha de inicio: {item.fechaInicio}</Text>
            <Text>Fecha de fin: {item.fechaFin}</Text>
            <Text>Días: {item.dias}</Text>
            {item.horas && <Text>Horas: {item.horas}</Text>}
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white', // Fondo negro
  },
  botonesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
    color: 'white',
  },
  listaTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    color: 'white',
  },
  listaItem: {
    marginVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    color: 'white',
  },
  text: {
    color: 'blue', // Texto blanco
    fontSize: 18,
  },
});

export default RegistroIncapacidadesScreen;

