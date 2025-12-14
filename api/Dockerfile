# Stage 1: Build the TypeScript code
FROM node:18-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Compila o TypeScript para JavaScript no diretório 'dist'
RUN npm run build


# Stage 2: Run the compiled application
FROM node:18-alpine

WORKDIR /usr/src/app

# Copia apenas os arquivos necessários para rodar (JavaScript compilado e package.json)
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/src/data ./src/data

# Expõe a porta que o app Express está escutando
EXPOSE 3000

# O comando CMD agora aponta para o JS compilado
CMD ["node", "dist/server.js"]