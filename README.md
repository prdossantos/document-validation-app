[![Codacy Badge](https://app.codacy.com/project/badge/Grade/4af9d4089fdd4dca9da1e93fecaa1e65)](https://www.codacy.com/gh/prdossantos/document-validation-app/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=prdossantos/document-validation-app&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://app.codacy.com/project/badge/Coverage/4af9d4089fdd4dca9da1e93fecaa1e65)](https://www.codacy.com/gh/prdossantos/document-validation-app/dashboard?utm_source=github.com&utm_medium=referral&utm_content=prdossantos/document-validation-app&utm_campaign=Badge_Coverage)

# Gerenciamento de documentos

Gerenciamento de CPF/CNPJ (CRUD) com a possibilidade filtros, ordenação e marcação de alguns em uma blacklist

## Recursos utilizados

1.  ReactJS
2.  Boostrap

## Como usar localmente

1.  Clone este repositório e execute o comando: `npm install`.
2.  Execute o comando: `npm start`.
3.  Você precisa da <https://github.com/prdossantos/document-validation-api> rodando
4.  Por padrão irá iniciar em <http://localhost:3000>.

## Use o docker :)

Se você tiver o docker e docker-compose, basta seguir os passos.

1.  Execute o comando: `docker-compose build` 
2.  Execute o comando: `docker-compose up`,  isso pode demorar um pouco dependendo do seu PC.
3.  Aguarge a mensagem: `react-app    |   Local:            http://localhost:3000`
4.  Você precisa da <https://github.com/prdossantos/document-validation-api> rodando
5.  Por padrão irá iniciar em <http://localhost:3000>.

## Estrutura de pastas

O projeto segue a seguinte estrutura.

```js
src/
  - components    # Contém os componentes globais do app
  - pages         # Contém as páginas de acesso
  - schemas       # Contém os esquemas da regra de negócio
  - forms         # Contém os formulários da aplicação
```
