# Street-Eats-API
## Uma api de avaliação de lugares de lanches, refeições, etc. 
OBS *** Quando eu estava terminando o projeto pensei nele como uma api de avaliação de lugares em geral, porém eu ja estava terminando, mas nada impede que eu dê um update no futuro ***

### Esse foi um mini projeto que fiz após terminar um dos módulos de BackEnd do curso que estou fazendo, só pra fixar a teoria que aprendi. Tive a ideia e tentei executar.

#### FUNCIONALIDADES:

- Registrar usuário, login de usuário com jsonwebtoken
- Criação, atualização e delete de lugares
- O usuário pode apagar a conta caso queira e assim todas suas reviews tambem serão apagadas
- Sistema de Ranking de lugares onde o lugar com a media de Notas mais alta vai subindo no ranking
- Calculo das medias de notas baseado em total das notas dividido pela quantidade de reviews
- Visualização de lugares por id ou tipo

- OBS: ensureOwner que está comentado no código seria uma funcionalidade para definir se o usuário é dono daquele lugar ou não, porem o 'mini-projeto' ficaria extenso pra um mini-projeto.

#### Tecnologias

- Javascript ES6+
- Express
- NodeJs
- Bcrypt para hashing de senha
- UUID para ids únicos
- JsonWebToken para autenticação
- Git / Github

#### Como rodar:

##### clone o repositorio
git clone (link desse repositorio)

##### instale as dependencias
npm install

##### configure as variáveis de ambiente em um arquivo .env
PORT = 3000 e SECRET_KEY = algumacoisa

##### inicie o servidor
npm run start

#### Por fim teste as rotas via POSTMAN / INSOMNIA / thunderclient no Vscode mesmo

#### Exemplo de requisição

- GET /foodSpots/





