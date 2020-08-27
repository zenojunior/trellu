# Artefatos

## Diagrama de banco de dados

<iframe width="100%" height="600" src='https://dbdiagram.io/embed/5f37400fe1246d54aa2d653e'> </iframe>

**Últimas atualizações**

Data | Atualização
------------ | -------------
15/08/2020 | **Mudança do banco** <br> Utilizávamos MySQL porém vimos uma dificuldade em achar um serviço gratuito para rodar nossa aplicação em produção. E como estamos utilizando Heroku para hospedar nossa API, encontramos uma [solução em PostgreSQL](https://elements.heroku.com/addons/heroku-postgresql) que atendeu nossas expectativas, oferecida pela própria Heroku. Então decidimos migrar de MySQL para PostgreSQL.
23/08/2020 | **Tabela de listas adicionada** <br> A proposta inicial era salvar a estrutura (nome das listas e seus cards ordenados) diretamente na tabela Boards. <br> Devido a dificuldade de implementação de uma parte não relacional, com um banco relacional, optamos por criar a tabela de Lists e remover o atributo structure da tabela Boards. Assim, um quadro possui várias listas, e cada lista possui diversos cards.
24/08/2020 | **Tabela de auditoria e logs adicionadas**

## Diagrama de classes

<img src="_media/class.jpg">

## Casos de uso

<img src="_media/use-case.png">