# Artefatos

## Diagrama de banco de dados

A estrutura do Bando de Dados é parte chave do desenvolvimento do projeto, respresentando o alicerce de como
os dados são trabalhados. O Modelo Entidade Relacionamento apresenta o intuito retratar a arquitetura do Banco de Dados de uma forma intuitiva e de fácil compreensão.
Por este motivo, foi criado um Modelo de Relacionamento representado na figura abaixo para identificar de que forma o projeto foi analisado e desenvolvido.  
  
<iframe width="100%" height="600" src='https://dbdiagram.io/embed/5f37400fe1246d54aa2d653e'> </iframe>


**Últimas atualizações**
-
Data | Atualização
------------ | -------------
15/08/2020 | **Mudança do banco** <br> Utilizávamos MySQL porém vimos uma dificuldade em achar um serviço gratuito para rodar nossa aplicação em produção. E como estamos utilizando Heroku para hospedar nossa API, encontramos uma [solução em PostgreSQL](https://elements.heroku.com/addons/heroku-postgresql) que atendeu nossas expectativas, oferecida pela própria Heroku. Então decidimos migrar de MySQL para PostgreSQL.
23/08/2020 | **Tabela de listas adicionada** <br> A proposta inicial era salvar a estrutura (nome das listas e seus cards ordenados) diretamente na tabela Boards. <br> Devido a dificuldade de implementação de uma parte não relacional, com um banco relacional, optamos por criar a tabela de Lists e remover o atributo structure da tabela Boards. Assim, um quadro possui várias listas, e cada lista possui diversos cards.
24/08/2020 | **Criação das tabelas de auditoria e logs** <br> Por necessidade de controle dos processos e manutenção do sistema foi desenvolvida a auditoria e o log de erros.
11/09/2020 | **Criação da seção adminitrativa do sistema** <br> Com necessidade de manter controles de ações em uma área mais abrangente, alem de acesso a parte de erros e mudanças, foi desenvolvida a seção adminitrativa do sistema.

## Diagrama de classes

Criado para descrever a forma de como os dados são trabalhados, o diagrama de classes esboça como as estruturas responsáveis pela leitura, alteração e remoção de dados são dispostas, afim de expor o método de organização utilizado dento do código fonte. Além de também retratar os niveis de privacidades de dados e como eles são moldados.

<img src="_media/class.jpg">

## Casos de uso

O diagrama de casos de uso é responsável por esboçar a forma de como o usuário final irá interagir como sistema, e de quais formas as tarefas são correlacionadas entre si. Designado a expor de que modo as ações são entrelaçadas, levando em consideração o modo de como o usuário ira atuar dentro do sistema.

<img src="_media/use-case.png">

## Requisitos funcionais

Responsável por identificar funcionalidades sensíveis ao usuário final, os requisitos funcionais são alusivo a todas as ferramentas, dispostas a qual o usuário pode interagir e utilizar. Também possui o intuito de organizar a estrutura de desenvolvimento, identificando os níveis de prioridades das funcionalidades ao projeto.

Código | Título | Descrição | Prioridade
------------ | -------------  | -------------  | -------------
RF001 | Manter Usuários | Manter o cadastro de usuários, possibilitando a alteração e exclusão ao usuário. O cadastro de usuário é realizado utilizando ferramentas de sincronização como Google ou Facebook | Essencial
RF002  | Manter quadros de atividades | Manter o cadastro de quadros, possibilitando a vinculação de listas de tarefas a serem feitas | Essencial
RF003  | Manter listas de tarefas | Manter o cadastro de listas de tarefas, estas vinculadas aos quadros, possibilitam a inserção de tarefas, alteração de ordem de listas sem alteração das tarefas agregadas a elas | Essencial
RF004  | Manter tarefas | Manter o cadastro de tarefas, onde dentro das mesmas seja possível adicionar textos, anexar arquivos, vincular datas e criar checklists | Essencial
RF005  | Manter controle de datas nas tarefas | Em casos de tarefas com prazos a serem compridos, é requerida a noticiação do usuário com antecedência sobre o prazo configurado | Essencial
RF006  | Manter histórico de alterações de tarefas | Possibilitar que o usuário tenha acesso a todas as informações relacionadas a todas as tarefas, quando tarefas forem movidas de listas, manter um histórico de data e o que foi alterado | Essencial
RF007  | Possibilitar a inserção de anexos às tarefas | Possibilitar ao usuário vincular arquivos de anexos às tarefas | Média
RF008   | Possibilitar a inserção de checklists às tarefas | Possibilitar ao usuário vincular checklists às tarefas | Média
RF009  | Manter tela adminitrativa | Possibilitar aos usuários adminitradores acesso a partes restritas de adminitração do sistema | Média
RF010 | Manter controle de usúarios na parte administrativa | Possibilitar aos usuários adminitradores acesso ao cadastro de usuários possibilitando realizar alterações e ajustes | Média
RF011 | Manter listagem de logs | Possibilitar aos usuários adminitradores acesso aos logs de erros | Média
RF012 | Manter listagem de auditorias | Possibilitar aos usuários adminitradores acesso as auditorias | Média


## Requisitos não funcionais

Responsável por identificar funcionalidades não sensíveis ao usuário final, os requisitos não funcionais são alusivo a todas as ferramentas necessárias ao controle interno do sistema. Também possui o intuito de estabeceler funções peculiares as regras de negócios ou funcionalidades internas do projeto.

Código | Título | Descrição | Prioridade
------------ | -------------  | -------------  | -------------
RF001 | Tecnologias utilizadas | Adonis, Electron, Socket IO (ou Pusher), VueJS | Essencial
RF002  | Banco de Dados Postgres | Utilização de banco de dados relacional Postgres | Essencial
RF003  |  Tamanho máximo de upload de arquivo 2MB | Possibilitar anexação de arquivos com no máximo 2 MegaBytes por arquivo | Essencial
RF004  | Restrição no formato de arquivos | Arquivos a serem anexados serão restritos por tipo de documento, sendo somente permitidos arquivos como documentos, planilhas e imagens (.pdf, .doc, .jpeg, .png, etc) | Essencial
RF005  | Criptografia de senhas | Todas as senhas dos clientes devem ser criptografadas, para segurança dos usuários | Essencial
RF006  | Registro de log | Manter o registro de logs do sistema, notificando questão de falhas, erros, problemas ocorridos, quando estes acontecem e qual seu efeito e situação no sistema | Essencial
RF007  | Possibilitar vínculo de contas com contas digitais | Possibilitar se cadastrar utilizando contas digitais, como Google, Facebook, Github | Média
RF008  | Atualização dos quadros em tempo real | Quando realizada alguma alteração de estrutura do quadro, a atualização do mesmo será automática | Essencial
RF009  | Notificar API Offline | Caso o servidor da API estiver desligado, informar na tela que o mesmo está sendo iniciado | Média