# Documentação do Projeto

## Visão Geral

Este projeto é uma aplicação web desenvolvida em Angular para gerenciar uma tabela de registros a partir de um JSON local. A tabela oferece funcionalidades para adicionar, editar e excluir registros, além de permitir filtragem, busca, ordenação, paginação e exportação para CSV. Além disso, a aplicação foi estendida com a funcionalidade adicional de fazer upload de arquivos JSON e CSV.

## Requisitos

- **Node.js**: Versão 18.19.0 ou superior
- **NPM**: Gerenciador de pacotes

## Instalação e Configuração

### 1. Instalação do Node.js e NPM

Certifique-se de ter o [Node.js](https://nodejs.org/) instalado na sua máquina. A instalação do Node.js inclui o NPM (Node Package Manager). Para verificar a versão instalada, use:

```bash
node -v
npm -v
```

### 2. Clonando o Repositório

Faça um fork deste repositório no GitHub e clone-o para sua máquina local:

```bash
git clone https://github.com/SilvioCavalcantiBonfim/hiring-front-end-angular.git
```

Navegue até o diretório do projeto:

```bash
cd hiring-front-end-angular
```

### 3. Instalando Dependências

Instale as dependências do projeto usando o `NPM`:

```bash
npm install
```

### 4. Rodando o Ambiente de Desenvolvimento

Para iniciar o ambiente de desenvolvimento e verificar a aplicação localmente, execute:

```bash
npm start
```

Isso iniciará o servidor de desenvolvimento e abrirá a aplicação em seu navegador padrão, geralmente em `http://localhost:4200`.

### 5. Rodando a Build de Deploy

Para criar uma build de produção otimizada, execute:

```bash
npm run build --configuration=production
```

Os arquivos gerados estarão na pasta `dist/hiring-front-end-angular` e podem ser hospedados em um servidor de sua escolha.

## Funcionalidades

- **Adição de Registros**: Permite adicionar novos registros com todos os campos obrigatórios. O campo `id` é gerado automaticamente.
- **Edição de Registros**: Permite editar qualquer campo de um registro, exceto o `id`.
- **Exclusão de Registros**: Permite excluir registros com confirmação do usuário via modal.
- **Filtragem**: Permite filtrar registros por `department` e `role`.
- **Busca**: Permite buscar registros por `name`, `email`, ou `phone`.
- **Ordenação**: Permite ordenar a tabela por qualquer campo em ordem crescente ou decrescente.
- **Paginação**: Suporta paginação com no máximo 5 registros por página.
- **Exportação para CSV**: Permite exportar os registros visíveis na página atual para um arquivo CSV.
- **Upload de Arquivos**: Adicionada funcionalidade para fazer upload de arquivos JSON e CSV. Essa funcionalidade permite importar registros diretamente para a tabela a partir de arquivos, facilitando a integração com outros sistemas e a atualização dos dados.

## Hospedagem

Após a construção da aplicação, o projeto foi hospedado nos servidores da [Netlify](https://vnw-hiring.netlify.app/).

## Conclusão

Com essas instruções, você deve ser capaz de instalar, configurar, e executar a aplicação, além de gerar uma build de produção e hospedar a aplicação. Se tiver dúvidas ou precisar de assistência adicional abra uma issue no repositório GitHub.