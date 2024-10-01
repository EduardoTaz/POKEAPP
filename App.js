import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet, Alert } from 'react-native';

const apiUrl = 'https://pokeapi.co/api/v2/pokemon/'; // URL DA API

const App = () => {
  const [pokemon, setPokemon] = useState(null);
  const [resposta, setResposta] = useState('');
  const [pontuacao, setPontuacao] = useState(0);

  //TRATAMENTO DE ERROS NA BUSCA DA API
  const buscaPokemon = async () => { // FUNCAO QUE BUSCA O POKEMON
    const randomId = Math.floor(Math.random() * 150) + 1; 
    try {
      const response = await fetch(`${apiUrl}${randomId}`);
      const data = await response.json();
      setPokemon(data);
    } catch (error) {
      console.error('Erro ao buscar o Pokémon:', error);
      Alert.alert('Erro', 'Não foi possível buscar o Pokémon.'); 
    }
  };

  const respostaUser = () => { // VERIFICA A RESPOSTA DO USUARIO E FALA SE ESTÁ CERTO OU INCORRETO
    if (pokemon && resposta.toLowerCase() === pokemon.name.toLowerCase()) {  // JOGA TUDO PRA MINUSCULO POR QUE SE NAO DÁ PROBLEMA
      Alert.alert('Correto!', `O nome do pokemón é ${pokemon.name}.`);
      setPontuacao(pontuacao + 1); // ADICIONA +1 SE ACERTAR
      setResposta(''); // LIMPA CMAPO 
      buscaPokemon();
    } else {
      Alert.alert('Incorreto!', `O nome correto era ${pokemon.name}.`);
      setPontuacao(0);
      setResposta(''); //LIMPA CAMPO
      buscaPokemon();
    }
  };

  useEffect(() => {
    buscaPokemon(); // 
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adivinhe o Pokémon!</Text>
      
      {pokemon ? (
        <>
          <Image
            source={{ uri: pokemon.sprites.front_default }}
            style={styles.pokemonImage}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Digite o nome do Pokémon"
            value={resposta}
            onChangeText={setResposta}
          />
          
          <Button title="Verificar" onPress={respostaUser} />
        </>
      ) : (
        <Text style={styles.loading}>Carregando Pokémon</Text> 

      )}
      
      <Text style={styles.pontuacao}>Pontuação: {pontuacao}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  pokemonImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '80%',
    textAlign: 'center',
  },
  pontuacao: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  loading: {
    fontSize: 18,
    marginTop: 20,
  },
});

export default App;
