# ClimaBR - Trabalho Final

## Detalhes

Essa aplicação trata-se do trabalho final da disciplina de Modelagem de Software. É uma aplicação simples para consulta à previsão do tempo de cidades brasileiras. 

Agora modificada para ver o histórico de cidades acessadas!

## Como usar?

Clone este repositório.

Entre na pasta do projeto e execute o comando abaixo para instalar as dependências:

`npm install`

Acesse o site https://openweathermap.org/api, faça seu cadastro e crie uma chave de API.

Crie um arquivo chamado `api-config.ts` no diretório `src/environment` do projeto, contendo o conteúdo abaixo (não se esqueça de alterar a propriedade `api_key` para a sua chave de API):

```ts
export const OPEN_WEATHER_CONFIG = {
  api_key: '<your-api-key>',
  api_url: 'https://api.openweathermap.org/data/2.5/onecall',
  api_icon_url: 'http://openweathermap.org/img/wn',
};
```

Para abrir a aplicação, execute o comando:

`ionic serve`

## Autores

 | [<img src="https://github.com/lhleonardo.png" width=115><br><sub>@lhleonardo</sub>](https://github.com/lhleonardo) <br><sub>Leonardo Braz</sub>| [<img src="https://github.com/pauloafpjunior.png" width=115><br><sub>@pauloafpjunior</sub>](https://github.com/pauloafpjunior) <br><sub>Paulo Júnior</sub>|
| :---: | :---: |
