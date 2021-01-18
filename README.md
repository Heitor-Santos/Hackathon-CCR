# Hackathon CCR - Equipe 133
## Sobre

O Loomer é um aplicativo gamificado multiplataforma e multidisciplinar que auxilia os jovens estudantes a terem uma maior participação no mundo acadêmico e cultural com a troca de informações de forma recompensatória através de um clube de descontos em cursos, centro culturais, eventos, estabelecimentos, serviços e variados tipos de produtos.

## Tecnologias

Utilizamos tecnologia para aplicativos multiplataforma, assim oferecendo maior velocidade, qualidade e menor tempo de resposta nas requisições feitas.

React - Framework para desenvolvimento web -  É mantido pelo Facebook, Instagram, e outras empresas. É utilizado nos sites da Netflix, Imgur, Feedly, Airbnb, SeatGeek, HelloSign, Walmart e outros.

Ionic - Framework para desenvolvimento de aplicações híbridas mobile-web - Projetado para funcionar e ser exibido em diferentes plataformas, possui um design limpo, simples e funcional.

MongoDB (NoSQL) integrado na plataforma Heroku - Possibilita a consulta de documentos através de métodos avançados de agrupamento e filtragem através de processamento de dados massivos, comumente utilizado em BigData. Exemplo de utilizadores: Google, Facebook, Globo, Amazon, Twitter, Ebay entre outros.

Node.JS – Plataforma de aplicação com pré-compilação e otimização, possui sua alta capacidade de escala e flexibilidade. Exemplo de utilizadores: Netflix, Uber e LinkedIn

## Setup
### Configurando

Clone o repositório para um diretório da sua preferência. O Loomer requer o Node.js v10 ou posterior.

Para rodar o backend crie um arquivo "proccess.env" e sete suas varíaveis de ambiente (MONGO_URL e PORT)

Instale o Ionic:

    npm install -g ionic
Instale as dependências do projeto (das 2 principais pastas):

    npm install

### Executando  no navegador
Dentro da pasta de frontend/backend do repositório, execute:

    npm start


### Preparando para produção
Dentro da pasta raiz do repositório, execute:

    ionic build
    ionic cap add android
    ionic cap open android

## Equipe

- Ana Laura Q. Frisina
- Antônio Barros da Silva Netto
- Heitor da Silva Santos
- Leonardo dos Anjos Silva
- Robson Oliveira
- Wagner Alcantara