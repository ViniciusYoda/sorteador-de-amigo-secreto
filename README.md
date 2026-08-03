# Sorteador de Amigo Secreto

Aplicação web para cadastrar participantes e realizar um sorteio de amigo secreto de forma simples. O projeto foi desenvolvido com React, TypeScript e Vite e utiliza Recoil para compartilhar o estado entre as páginas.

## Funcionalidades

- Cadastro de participantes;
- remoção automática de espaços no início e no fim dos nomes;
- bloqueio de nomes vazios;
- prevenção de nomes duplicados, ignorando diferenças entre maiúsculas, minúsculas e acentuação;
- exigência de pelo menos três participantes para iniciar a brincadeira;
- sorteio no qual ninguém recebe o próprio nome;
- consulta individual do resultado;
- interface responsiva e acessível;
- testes automatizados dos componentes e da regra de sorteio.

## Tecnologias

- [React](https://react.dev/) — construção da interface;
- [TypeScript](https://www.typescriptlang.org/) — tipagem estática;
- [Vite](https://vite.dev/) — servidor de desenvolvimento e build;
- [React Router](https://reactrouter.com/) — navegação entre páginas;
- [Recoil](https://recoiljs.org/) — gerenciamento do estado global;
- [Vitest](https://vitest.dev/) — execução dos testes;
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/) — testes da interface;
- [just-shuffle](https://www.npmjs.com/package/just-shuffle) — embaralhamento dos participantes.

## Pré-requisitos

Antes de começar, instale:

- Node.js 18 ou superior;
- npm, incluído na instalação do Node.js.

Para conferir as versões instaladas:

```bash
node --version
npm --version
```

## Instalação

Clone o repositório, entre na pasta do projeto e instale as dependências:

```bash
git clone <URL_DO_REPOSITORIO>
cd sorteador-de-amigo-secreto
npm install
```

## Execução local

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O Vite mostrará no terminal o endereço da aplicação, normalmente:

```text
http://localhost:5173
```

## Como usar

1. Na página inicial, digite o nome de um participante.
2. Clique em **Adicionar**.
3. Repita o processo até cadastrar pelo menos três pessoas.
4. Clique em **Iniciar brincadeira**.
5. Na página do sorteio, selecione o seu nome.
6. Clique em **Sortear** para revelar o seu amigo secreto.

> O resultado fica armazenado apenas na memória do navegador. Recarregar a página ou fechar a aplicação reinicia a brincadeira.

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o Vite em modo de desenvolvimento. |
| `npm start` | Atalho para iniciar o Vite. |
| `npm run build` | Verifica o TypeScript e gera o build de produção. |
| `npm run preview` | Executa localmente o build de produção. |
| `npm test` | Executa todos os testes uma vez. |
| `npm run test:watch` | Executa os testes em modo de observação. |

## Estrutura do projeto

```text
.
├── public/
│   └── imagens/                 # Imagens servidas diretamente pelo Vite
├── src/
│   ├── componentes/             # Componentes reutilizáveis da interface
│   │   ├── Cabecalho/
│   │   ├── Card/
│   │   ├── Formulario.tsx
│   │   ├── ListaParticipantes.tsx
│   │   └── Rodape.tsx
│   ├── paginas/                 # Páginas associadas às rotas
│   │   ├── Configuracao.tsx
│   │   └── Sorteio.tsx
│   ├── state/
│   │   ├── helpers/             # Regra pura do sorteio
│   │   ├── hook/                # Hooks que acessam ou alteram o estado
│   │   └── atom.ts              # Átomos do Recoil
│   ├── App.tsx                  # Rotas e provedor do Recoil
│   ├── index.tsx                # Ponto de entrada do React
│   └── setupTests.ts            # Configuração do ambiente de testes
├── index.html                   # Documento HTML usado pelo Vite
├── vite.config.ts               # Configuração do Vite e Vitest
└── tsconfig.json                # Configuração do TypeScript
```

## Arquitetura e fluxo de dados

O componente `App` configura duas rotas:

| Rota | Página | Responsabilidade |
| --- | --- | --- |
| `/` | `Configuracao` | Cadastrar participantes e iniciar o sorteio. |
| `/sorteio` | `Sorteio` | Selecionar um participante e revelar o resultado. |

O estado global é mantido em três átomos do Recoil:

| Átomo | Tipo | Conteúdo |
| --- | --- | --- |
| `listaParticipantesState` | `string[]` | Lista de nomes cadastrados. |
| `resultadoAmigoSecreto` | `Map<string, string>` | Relação entre cada participante e seu amigo secreto. |
| `erroState` | `string` | Mensagem de validação apresentada no formulário. |

Os hooks em `src/state/hook` isolam o acesso ao Recoil. Assim, os componentes não precisam conhecer os detalhes de leitura e atualização dos átomos.

## Regra do sorteio

A função `realizarSorteio`:

1. recebe a lista de participantes;
2. cria uma cópia para não modificar a lista original;
3. embaralha os nomes;
4. associa cada pessoa ao próximo nome da lista embaralhada;
5. associa a última pessoa à primeira, fechando um ciclo.

Exemplo:

```text
Ana → João
João → Maria
Maria → Ana
```

Esse formato garante que:

- ninguém sorteie a si mesmo, quando há pelo menos duas pessoas;
- todos sejam sorteados exatamente uma vez;
- todos tenham exatamente um amigo secreto.

A interface exige três participantes para iniciar, embora a função de domínio aceite sorteios a partir de duas pessoas.

## Testes

Execute a suíte completa:

```bash
npm test
```

Os testes cobrem:

- habilitação e envio do formulário;
- rejeição de nomes duplicados;
- remoção temporizada da mensagem de erro;
- renderização da lista de participantes;
- bloqueio do início com poucos participantes;
- navegação para a página do sorteio;
- exibição do resultado;
- garantia de que ninguém sorteie o próprio nome;
- comportamento com uma lista sem participantes suficientes.

Para desenvolver acompanhando alterações:

```bash
npm run test:watch
```

## Build de produção

Gere os arquivos otimizados:

```bash
npm run build
```

O resultado será criado na pasta `dist/`. Para verificá-lo localmente:

```bash
npm run preview
```

## Implantação

Publique o conteúdo da pasta `dist/` em um serviço de hospedagem estática.

Como o projeto usa `BrowserRouter`, o servidor de produção deve redirecionar rotas desconhecidas para `index.html`. Sem esse fallback, abrir `/sorteio` diretamente pode resultar em erro 404.

Além disso, acessar `/sorteio` diretamente não restaura um sorteio anterior, pois o estado não é persistido.

## Solução de problemas

### O comando `npm run dev` não funciona

Confirme que o Node.js 18 ou superior está instalado e execute novamente:

```bash
npm install
npm run dev
```

### As imagens não aparecem

Os arquivos públicos devem permanecer em `public/imagens` e ser referenciados a partir da raiz:

```tsx
<img src="/imagens/arquivo.png" alt="Descrição da imagem" />
```

### A rota funciona localmente, mas retorna 404 em produção

Configure a hospedagem para encaminhar todas as rotas da aplicação para `index.html`.

### O sorteio desapareceu após atualizar a página

Esse é o comportamento atual: os dados são mantidos somente no estado do React/Recoil. Para persistência, será necessário adicionar armazenamento local ou uma API.

## Contribuição

1. Crie uma branch para sua alteração.
2. Implemente a mudança.
3. Execute `npm test` e `npm run build`.
4. Abra um pull request descrevendo o que foi alterado.
