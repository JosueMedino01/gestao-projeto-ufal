# Tutor CNH Frontend

Frontend Next.js integrado com a API Flask do projeto `cnhFacul`.

## Configurar

Crie o `.env.local` a partir do exemplo:

```powershell
Copy-Item .env.example .env.local
```

Variavel usada:

```text
NEXT_PUBLIC_API_URL=http://127.0.0.1:5000
```

## Executar com o backend

Em um terminal, suba o backend:

```powershell
cd ..\cnhFacul
docker compose up --build
```

Em outro terminal, suba o frontend:

```powershell
cd ..\tutor-cnh
npm run dev
```

Acesse:

```text
http://localhost:3000
```

## Fluxos integrados

- `POST /auth/login` e `POST /auth/cadastro`
- `GET/PATCH /perfil`
- `GET /desempenho`
- `GET /revisar-erros`
- `GET /areas`
- `POST /chat`
- `POST /simulados`, `POST /simulados/<id>/respostas` e `POST /simulados/<id>/finalizar`
- `POST /praticas/tema` e `POST /questoes/<id>/responder`

## Validar

```powershell
npm run lint
npm run build
```
