import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, TextInput  } from 'react-native';

const apiUrl = 'https://pokeapi.co/api/v2/pokemon/'; // API DA POKEAPI

const App = () => {
  const [pokemon, setPokemon] = useState(null);
  const [alternativas, setAlternativas] = useState([]); 
  const [pontuacao, setPontuacao] = useState(0);
  const [nomeUsuario, setNomeUsuario] = useState(''); 
  const [executaQuiz, setExecutaQuiz] = useState(false); 

  //AQUI ELE EMBARALHA TODOS OS POKEMÓNS 
  const embaralhaArray = (array) => array.sort(() => Math.random() - 0.5); /*SE O VALOR DE MATH.RANDOM FOR MAIOR QUE 0.5, O RESULTADO DA SUBTRAÇÃO 
  SERÁ POSITIVO, AGORA SE FOR MENOR QUE 0.5 O RESULTADO SERÁ NEGATIVO, SE FOR NEGATIVO, O SORT() MOVE O PRIMEIRO ELEMENTO ANTES DO SEGUNDO
  SE O NUMERO FOR POSITIVO ELE MOVE O PRIMEIRO ELEMENTO DEPOIS DO SEGUNDO   */

  //BUSCA OS POKEMÓNS
  const buscaPokemon = async () => {
    const randomId = Math.floor(Math.random() * 150) + 1; // SE MATH.RANDOM GERA 0.234, ENTÃO SE VOCE MULTIPLICAR POR 150 DÁ 35.1
    try {
      const response = await fetch(`${apiUrl}${randomId}`); /* FETCH() SERVE PRA FAZER REQUJISIÇÕES HTTP, ELA PODE SER USADA PRA BUSCAR DADOS EM
      SERVIDORES VIA URL, ELE PUXA apiUrl E randomID, A APIURL É A URL DA API E O RANDOMID É NÚMERO ALEATÓRIO CRIADO LA EM CIMA*/
      const data = await response.json(); // A VARIAVEL DATA TEM OS DADOS DO POKEMON 

      // CRIRAR 3 NOMES INCORRETOSS
      const alternativasErradas = []; // CRIEI UM ARRAY PARA ARMAZENAR AS ALTERNATIVAS
      while (alternativasErradas.length < 3) { // PARA TER SÓ 3
        const randomIdErrado = Math.floor(Math.random() * 150) + 1; // FAZ A MESMA COISA LA EM CIMA MAS AQUI VOU USAR PRA BUSCAR AS ERRADAS
        if (randomIdErrado !== randomId) { // ESTAVA DANDO CONFLITO COM O ANTIGO QUE CRIEI
          const responseErrado = await fetch(`${apiUrl}${randomIdErrado}`); // FAZ UMA REQUISIÇÃO HTTP PARA BUSCAR AS ALTERNATIVAS ERRADAS
          const dataErrado = await responseErrado.json(); // ARMAZENA OS DADOS DO POKEMON ERRADIO
          alternativasErradas.push(dataErrado.name); /* alternativasErradas.push() ADICIONA ELEMENTOS NO FINAL DO ARRAY QUE CRIEI ALI EM CIMA
          ACREDITO QEU VAI SER ALEATÓRIO POR CONTA QUE O ARRAY CRESCE EM QUYANTO OS VALORES SÃO ADICIONADOS, ENTÃO NÃO TEM UM LUGAR FIXO PARA ELE */
        }
      }

      // Misturando o nome correto com os incorretos
      const alternativasEmbaralhadas = embaralhaArray([
        data.name, // ESSE AQUI É O NOME CORRETO DO PKEMON, DATA.NAME == NOME CORRETO DO POKEMON, DENTRO DE DATA 
        ...alternativasErradas, /* ... CHAMA OPERADOR SPREAD ELE ESPALHA OS ELEMENTOS DO ARRAY, É MEIO CONFUSO MAS É FACIL DE ENTENDER
        SEM ESSE OPERADOR SPREAD, O ARRAY FICA ASSIM ['Pikachu', ['Charmander', 'Bulbasaur', 'Squirtle']], OU SEJA, ELE ESTÁ ANINHADO, JÁ COM O SPREAD
        FICA ASSIM ['Pikachu', 'Charmander', 'Bulbasaur', 'Squirtle'], RESUMINDO, ISSO TORNA OS ELEMENTOS EM APENAS UM ARRAY PRINCIPAL, EVITANDO ERROS */
      ]);

      setPokemon(data); // POKEMON ATUAL
      setAlternativas(alternativasEmbaralhadas); // COLOCANDO AS ALTERNATIVAS
    } catch (error) {
      console.error('Erro ao buscar o Pokémon:', error);
      Alert.alert('Erro', 'Não foi possível buscar o Pokémon.');
    }
  };

  //VERIFICA RESPOSTA DO USUARIO
  const verificarResposta = (respostaSelecionada) => {
    if (respostaSelecionada === pokemon.name) {
      Alert.alert('Correto!', `O nome correto é ${pokemon.name}.`);
      setPontuacao(pontuacao + 1);
    } else {
      Alert.alert('Incorreto!', `O nome correto era ${pokemon.name}.`);
      setPontuacao(pontuacao - 1);
    }
    buscaPokemon(); // BUSCA O PROXIMO POKEMON
  }; 

  const voltarTelaInicial = () => { // ESSA FUNCAO É PARA VOLTAR PARA TELA INICIAL PRA FAZER UM NOVO LOGIN
    setExecutaQuiz(false); // ESSE AQUI RESETA A VALIDAÇÃO QUE EU FIZ QUE SE executaQuiz FOR VERDADEIRO ELE EXECUTA A TELA DO QUIZ
    setNomeUsuario(''); // LIMPA O NOME DE USUÁRIO
    setPontuacao(0); // RESETA A PONTUAÇÃO
  };

  useEffect(() => { // 
    if (executaQuiz) { // AO CLICAR NO BOTÃO, EXECUTAQUIZ SE TORNA TRUE
      buscaPokemon(); // SÓ VAI BUSCAR O POKEMON SE O QUIZ FOR EXECUTADO
    }
  }, [executaQuiz]);

  // EXECUTA O QUIZ
  const iniciarQuiz = () => {
    if (nomeUsuario.trim()) {
      setExecutaQuiz(true); // CASO SE O NOME FOR PREENCHIDO, ELE VAI EXECUTAR O QUIZ
    } else {
      Alert.alert('Erro', 'Por favor, insira seu nome.'); // SE NAO ELE RETORNA UM ERRO
    }
  };


  return (
    <View style={styles.container}>
      {executaQuiz ? ( // O "?" É O MESMO QUE O IF(executaQuiz) OU SEJA, SE executaQuiz FOR VERDADEIRO
      //TELA DO QUIZ
        <>
          <Text style={styles.title}>Olá, {nomeUsuario}!</Text>
          <Text style={styles.title}>Adivinhe o Pokémon!</Text>

          {pokemon && (
            <>
              <Image
                source={{ uri: pokemon.sprites.front_default }}
                style={styles.pokemonImage}
              />

              {alternativas.map((opcao, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.btnAlt}
                  onPress={() => verificarResposta(opcao)}
                  >

                  <Text style={styles.btnText}>{opcao}</Text>
                </TouchableOpacity>
              ))}
            </>
          )}

          <Text style={styles.score}>Pontuação: {pontuacao}</Text>
          <TouchableOpacity
            style={styles.btnVoltar}
            onPress={voltarTelaInicial}
            >
            <Text style={styles.btnVoltarText}>Voltar para tela inicial</Text>
          </TouchableOpacity>
        </>
      ) : (
        //TELA DE LOGIN
        <>
          <Text style={styles.title}>Bem-vindo ao quiz de pokemón</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome"
            value={nomeUsuario}
            onChangeText={setNomeUsuario}
          />
          <TouchableOpacity style={styles.btnLogin} onPress={iniciarQuiz}>
            <Text style={styles.btnLoginText}>Confirmar</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161616',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  pokemonImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  score: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  btnAlt: {
    backgroundColor: '#7f7f7f',
    margin: 5,
    padding: 10,
    minWidth: 200,
    minHeight: 50,
    borderRadius: 10,
    alignItems: 'center',
  },
  btnText: {
    fontSize: 17,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    width: '80%',
    marginBottom: 20,
    fontSize: 18,
  },
  btnLogin: {
    backgroundColor: '#7f7f7f',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  btnVoltarText: {
    backgroundColor: '#909090',
    padding: 15,
    margin: 30,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    color: '#A52A2A',
  },
});

export default App;
