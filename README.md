# Guia-de-Documentos-do-Cidadao

O Guia de Documentos do Cidadão é um aplicativo mobile que centraliza informações sobre os principais documentos pessoais brasileiros — RG, CPF, CNH, Título de Eleitor, Carteira de Trabalho, Passaporte — incluindo onde emitir, quais documentos são necessários, qual é o custo e qual o prazo para emissão. 

Muitas pessoas, especialmente jovens tirando o primeiro documento ou cidadãos com menor acesso à informação, enfrentam dificuldades para saber o que é necessário para emitir ou renovar um documento. Este aplicativo simplifica essa informação de forma direta e acessível, funcionando inclusive sem conexão com a internet após o primeiro carregamento. 

# Tutorial: Rodar o App no Expo Go
### O que você vai fazer
Clonar o projeto do GitHub, instalar as dependências e rodar o app no seu celular com Expo Go para acompanhar as atualizações em tempo real.

## Pré-requisitos
Instale antes de começar:

- Node.js (versão 18+) — nodejs.org
- Git — git-scm.com
- Expo Go no celular — iOS ou Android
Verifique se estão instalados:

```
node --version
git --version
```

## Passo 1: Clonar o Repositório
Abra o terminal e execute:
```
cd ~/Documentos
git clone https://github.com/seu-usuario/guia-documentos.git
cd guia-documentos
```
## Passo 2: Instalar Dependências
```
npm install
```
Isso pode levar 2-5 minutos na primeira vez.

## Passo 3: Configurar Variáveis de Ambiente
Na raiz do projeto (onde está package.json), crie um arquivo chamado .env.local

Cole o seguinte conteúdo:
```
EXPO_PUBLIC_BACK4APP_APP_ID=seu_app_id_aqui
EXPO_PUBLIC_BACK4APP_API_KEY=sua_rest_key_aqui
EXPO_PUBLIC_BACK4APP_URL=https://parseapi.back4app.com
```
Preencha com suas credenciais do Back4App:
- Acesse back4app.com
- Clique no seu app
- Copie App ID (campo "App ID")
- Copie Rest Key (dropdown "Keys" → "Rest Key")

⚠️ Nunca compartilhe o arquivo .env.local — ele contém credenciais sensíveis!

## Passo 4: Iniciar o Servidor
```
npx expo start --clear
```
Você verá um QR code no terminal.

## Passo 5: Conectar no Celular
###Android:
- Abra o app Expo Go
- Clique em "Scan QR code"
- Aponte para o QR code no terminal
- Aguarde carregar (30-60 segundos)

## Passo 6: Acompanhar Atualizações
Quando houver atualizações no GitHub:
```
git pull origin main
npm install
```
Depois recarregue no celular:

- Android: Shake o celular → "Reload"
Ou pressione r no terminal.

📚 Estrutura do Projeto
```
guia-documentos/
├── app/(tabs)/              # Abas principais
│   ├── index.tsx            # Documentos com busca
│   ├── favoritos.tsx        # Favoritos
│   ├── dicas.tsx            # Dicas
│   └── _layout.tsx          # Layout das abas
├── components/              # Componentes
├── services/                # API (Back4App)
├── store/                   # Estado global
├── .env.local              # Variáveis (criar)
└── package.json
```
## Checklist
[ ] Node.js e Git instalados

[ ] Expo Go instalado no celular

[ ] Repositório clonado

[ ] npm install executado

[ ] .env.local criado com credenciais

[ ] npx expo start --clear rodando

[ ] QR code escaneado

[ ] App funcionando no celular
