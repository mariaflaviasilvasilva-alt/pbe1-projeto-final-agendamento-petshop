#!/bin/bash
# Script de automação de testes da API Pet Shop
# Uso: ./testes_automacao.sh > resultado_execucao.log 2>&1

BASE="http://localhost:3000"
FALHAS=0

# Confere se o curl e o jq estão instalados
for ferramenta in curl jq; do
  if ! command -v "$ferramenta" > /dev/null; then
    echo "ERRO: $ferramenta não está instalado."
    exit 1
  fi
done

# Confere se o servidor está no ar
if ! curl -s -o /dev/null "$BASE/clientes"; then
  echo "ERRO: servidor fora do ar. Rode 'npm start' em outro terminal."
  exit 1
fi

# Função: faz a requisição, mostra o status e confere com o esperado
# Uso: chamar METODO ROTA STATUS_ESPERADO [CORPO_JSON]
chamar() {
  local metodo="$1" rota="$2" esperado="$3" corpo="$4"

  echo
  echo ">>> $metodo $rota"
  if [ -n "$corpo" ]; then
    echo ">>> Corpo: $corpo"
    RESP=$(curl -s -X "$metodo" "$BASE$rota" \
      -H "Content-Type: application/json" -d "$corpo" -w "\n%{http_code}")
  else
    RESP=$(curl -s -X "$metodo" "$BASE$rota" -w "\n%{http_code}")
  fi

  STATUS=$(echo "$RESP" | tail -n 1)
  CORPO=$(echo "$RESP" | sed '$d')

  echo "Status recebido: $STATUS"
  echo "$CORPO" | jq .

  if [ "$STATUS" = "$esperado" ]; then
    echo "Resultado: OK (esperado $esperado)"
  else
    echo "Resultado: FALHOU (esperado $esperado, recebido $STATUS)"
    FALHAS=$((FALHAS + 1))
  fi
}

echo "=============================================="
echo " TESTES DA API - PET SHOP - $(date '+%d/%m/%Y %H:%M:%S')"
echo "=============================================="

echo
echo "##### 1. CADASTRAR CLIENTE #####"
chamar POST /clientes 201 '{"nome":"Maria Souza","telefone":"11999990000","email":"maria@email.com"}'
CLIENTE_ID=$(echo "$CORPO" | jq -r '.id')
echo "ID do cliente criado: $CLIENTE_ID"

echo
echo "##### 2. LISTAR E BUSCAR CLIENTES #####"
chamar GET /clientes 200
chamar GET "/clientes/$CLIENTE_ID" 200
chamar GET "/clientes?nome=maria" 200

echo
echo "##### 3. ATUALIZAR CLIENTE (PUT E PATCH) #####"
chamar PUT "/clientes/$CLIENTE_ID" 200 '{"nome":"Maria Souza Lima","telefone":"11988887777","email":"maria.lima@email.com"}'
chamar PATCH "/clientes/$CLIENTE_ID" 200 '{"telefone":"11977776666"}'


#Script de testes, parte 2 (agendamentos, filtros, erros, remoção)


echo
echo "##### 4. CRIAR AGENDAMENTO #####"
chamar POST /agendamentos 201 "{\"clienteId\":$CLIENTE_ID,\"nomePet\":\"Thor\",\"especie\":\"Cachorro\",\"servico\":\"banho\",\"data\":\"2026-12-10\",\"horario\":\"14:00\"}"
AGENDAMENTO_ID=$(echo "$CORPO" | jq -r '.id')
echo "ID do agendamento criado: $AGENDAMENTO_ID"

chamar GET /agendamentos 200
chamar GET "/agendamentos/$AGENDAMENTO_ID" 200

echo
echo "##### 5. ATUALIZAR AGENDAMENTO (PUT E PATCH) #####"
chamar PUT "/agendamentos/$AGENDAMENTO_ID" 200 "{\"clienteId\":$CLIENTE_ID,\"nomePet\":\"Thor\",\"especie\":\"Cachorro\",\"servico\":\"tosa\",\"data\":\"2026-12-11\",\"horario\":\"15:00\",\"status\":\"AGENDADO\"}"
chamar PATCH "/agendamentos/$AGENDAMENTO_ID" 200 '{"status":"CONCLUIDO"}'

echo
echo "##### 6. TESTAR FILTROS #####"
chamar GET "/agendamentos?status=CONCLUIDO" 200
chamar GET "/agendamentos?servico=tosa" 200
chamar GET "/agendamentos?status=CANCELADO" 200

echo
echo "##### 7. TESTAR ERROS (400 E 404) #####"
chamar POST /clientes 400 '{"nome":"Sem Telefone"}'
chamar POST /agendamentos 400 "{\"clienteId\":$CLIENTE_ID,\"nomePet\":\"Rex\"}"
chamar GET /clientes/9999 404
chamar GET /agendamentos/9999 404
chamar POST /agendamentos 404 '{"clienteId":9999,"nomePet":"Rex","especie":"Cachorro","servico":"banho","data":"2026-12-10","horario":"10:00"}'
chamar PUT /clientes/9999 404 '{"nome":"X","telefone":"1"}'
chamar PATCH /agendamentos/9999 404 '{"status":"CANCELADO"}'
chamar DELETE /clientes/9999 404

echo
echo "##### 8. REMOVER OS REGISTROS CRIADOS #####"
chamar DELETE "/agendamentos/$AGENDAMENTO_ID" 200
chamar DELETE "/clientes/$CLIENTE_ID" 200
chamar GET "/clientes/$CLIENTE_ID" 404

echo
echo "=============================================="
if [ "$FALHAS" -eq 0 ]; then
  echo " FIM: todos os testes passaram."
else
  echo " FIM: $FALHAS teste(s) falharam."
fi
echo "=============================================="
