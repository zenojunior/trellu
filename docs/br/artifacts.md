# Artefatos

## Diagrama de banco de dados

A estrutura do Bando de Dados é parte chave do desenvolvimento do projeto, respresentando o alicerce de como
os dados são trabalhados. O Modelo Entidade Relacionamento apresenta o intuito retratar a arquitetura do Banco de Dados de uma forma intuitiva e de fácil compreensão.
Por este motivo, foi criado um Modelo de Relacionamento representado na figura abaixo para identificar de que forma o projeto foi analisado e desenvolvido.  
  
<iframe width="100%" height="600" src='https://dbdiagram.io/d/5f7275ad3a78976d7b75977f'> </iframe>


**Últimas atualizações**
-
Data | Atualização
------------ | -------------
15/08/2020 | **Mudança do banco** <br> Utilizávamos MySQL porém vimos uma dificuldade em achar um serviço gratuito para rodar nossa aplicação em produção. E como estamos utilizando Heroku para hospedar nossa API, encontramos uma [solução em PostgreSQL](https://elements.heroku.com/addons/heroku-postgresql) que atendeu nossas expectativas, oferecida pela própria Heroku. Então decidimos migrar de MySQL para PostgreSQL.
23/08/2020 | **Tabela de listas adicionada** <br> A proposta inicial era salvar a estrutura (nome das listas e seus cards ordenados) diretamente na tabela Boards. <br> Devido a dificuldade de implementação de uma parte não relacional, com um banco relacional, optamos por criar a tabela de Lists e remover o atributo structure da tabela Boards. Assim, um quadro possui várias listas, e cada lista possui diversos cards.
24/08/2020 | **Criação das tabelas de auditoria e logs** <br> Por necessidade de controle dos processos e manutenção do sistema foi desenvolvida a auditoria e o log de erros.
11/09/2020 | **Criação da seção adminitrativa do sistema** <br> Com necessidade de manter controles de ações em uma área mais abrangente, alem de acesso a parte de erros e mudanças, foi desenvolvida a seção adminitrativa do sistema.
19/09/2020 | **Criação da tabela de grupos de usuários** <br> Criado para realizar o controle de acesso ao sistema sobre determinados grupos de usuários.
02/10/2020 | **Subtituição das triggers da auditorias** <br> Substituidas Triggers e View relacionadas a criação e listagem de auditorias e substituida por funções na própria aplicação.
12/10/2020 | **Tabela de versões adicionada** <br> Criada tabela de versões para controle de logs de erros vinculados à versões lançadas do sistema.
16/10/2020 | **Criadas dos gráficos do Dashboard do administrador** <br> Criados gráficos de login e logout de usuários, número de contas cadastradas e de atualização dos quadros.

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
RF002 | Manter quadros de atividades | Manter o cadastro de quadros, possibilitando a vinculação de listas de tarefas a serem feitas | Essencial
RF003 | Manter listas de tarefas | Manter o cadastro de listas de tarefas, estas vinculadas aos quadros, possibilitam a inserção de tarefas, alteração de ordem de listas sem alteração das tarefas agregadas a elas | 
RF004 | Manter tarefas | Manter o cadastro de tarefas, onde dentro das mesmas seja possível adicionar textos, anexar arquivos, vincular datas e criar checklists | Essencial
RF005 | Manter controle de datas nas tarefas | Em casos de tarefas com prazos a serem compridos, é requerida a noticiação do usuário com antecedência sobre o prazo configurado | Essencial
RF006 | Manter histórico de alterações de tarefas | Possibilitar que o usuário tenha acesso a todas as informações relacionadas a todas as tarefas, quando tarefas forem movidas de listas, manter um histórico de data e o que foi alterado | Essencial
RF007 | Possibilitar a inserção de anexos às tarefas | Possibilitar ao usuário vincular arquivos de anexos às tarefas | Média
RF008 | Possibilitar a inserção de checklists às tarefas | Possibilitar ao usuário vincular checklists às tarefas | Média
RF009 | Manter tela adminitrativa | Possibilitar aos usuários adminitradores acesso a partes restritas de adminitração do sistema | Média
RF010 | Manter controle de usúarios na parte administrativa | Possibilitar aos usuários adminitradores acesso ao cadastro de usuários possibilitando realizar alterações e ajustes | Média
RF011 | Manter listagem de logs | Possibilitar aos usuários adminitradores acesso aos logs de erros | Média
RF012 | Manter listagem de auditorias | Possibilitar aos usuários adminitradores acesso as auditorias | Média
RF013 | Manter cadastro de grupos de usuários | Manter o cadastro de grupos de usuários, aos quais conterão controles de acesso específico ao sistema | Essencial
RF014 | Possibilitar a exportação da auditoria em .CSV | Possibilitar que o usuário Administrador possa realizar a visualização e download dos dados da auditoria em arquivo .CSV | Média
RF015 | Listagem da auditoria possuir filtro de pesquisa avançado | Possibilitar que o relatório de Auditorias possua um filtro de pesquisa avançado. | Média
RF016 | Disponibilizar gráfico de usuários cadastrados| Disponibilizar visualização de gráfico interativo o número de usuários cadastrados por periodos flexíveis. Disponível somente para usuários adminitradores.  | Média
RF017 | Disponibilizar gráfico de quadros atualizados | Disponibilizar visualização de gráfico interativo o número de atualização de quadros por dia. Disponível somente para usuários adminitradores.  | Média
RF018 | Disponibilizar gráfico de logins e logouts de usuários | Disponibilizar visualização de gráfico interativo o número de logins e logouts mensais dos usuários. Disponível somente para usuários adminitradores. | Média
RF019 | Exportação dos gráficos do Dashboard para PDF | Disponibilizar a exportação dos gráficos do Dashboard do administrador para .PDF. | Média
RF020 | Disponibilizar exibição de nuvem de palavras | Disponibilizar visualização de gráfico do conjunto de palavras mais utilizados nos títulos dos cartões. Disponível somente para usuários adminitradores. | Média


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
RF010  | Controle de acesso ao administrador | Relizar o controle de acesso que apenas os usuários administradores tenham acesso a área administrativa | Essencial