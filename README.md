# Jogo de Adivinhação de Pokémon
  O aplicativo é um jogo de adivinhação no qual os jogadores tentam adivinhar o nome de um Pokémon com base em uma determinada imagem. O jogo usa a PokéAPI para fornecer Pokémon e respostas aleatórias. Outros recursos incluem a capacidade de personalizar o sistema para os melhores jogadores..

# Funcionalidades Principais
  * Tela Inicial
    * O jogador insere seu nome e clica no botão "Confirmar" para começar.
    * Uma mensagem de boas-vindas personalizada é exibida junto do quiz.
  * Tela do Jogo
    * O jogador vê a imagem de um Pokémon aleatório, com quatro opções de resposta.
    * O jogador escolhe uma das opções, sendo uma correta.
    * Se a resposta estiver correta, o jogo avança para o próximo Pokémon e adiciona +1 ponto, caso contrário subtrai -1 ponto.

# Tecnologias utilizadas
  * O jogo foi desenvolvido usando React Native. Para executar o projeto, é necessário instalar:
    * Node.js
    * Expo CLI
    * @react-navigation/native para a navegação entre telas
    * axios para realizar as requisições HTTP á PokéAPI
  * PokéAPI
    * Endpoint
      * https://pokeapi.co/api/v2/pokemon/
      * Ao realizar a requisição para o endpoint de um Pokémon, a resposta contém diversas informações, incluindo as imagens nas propriedades sprites. A imagem do Pokémon pode ser acessada através de sprites.front_default.

# Instruções de Execução
  * Clone o repositório do GitHub:
    * git clone https://github.com/EduardoTaz/POKEAPP.git
  * Instale as dependências necessárias:
    * npm install 
  * Execute o projeto em um dispositivo físico ou em um emulador
    * npx expo start

# Testes e Depuração
  * Foram realizados testes para verificar a correta integração com a PokéAPI.
  * O fluxo de navegação entre as telas foi testado com diferentes entradas de usuário.
  * Testes de depuração incluíram validação de respostas corretas e incorretas e verificação de erros de requisição à API.

* Este aplicativo foi desenvolvido para fornecer uma experiência divertida de adivinhação de Pokémon, com funcionalidades de navegação fluida e integração com a PokéAPI.
