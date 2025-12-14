# Script de build para Monorepo no Vercel

echo "--- Instalando dependências da API ---"
npm install --prefix api

echo "--- Instalando dependências do Frontend ---"
npm install --prefix frontend

echo "--- Construindo o Frontend (Vite) ---"
npm run build --prefix frontend

echo "--- Construindo a API (TypeScript) ---"
npm run build --prefix api

echo "--- Build do Monorepo Concluído! ---"