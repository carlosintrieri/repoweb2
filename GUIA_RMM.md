# 🎯 AutoBoots - Implementação RMM Completa

## Richardson Maturity Model (RMM) - 4 Níveis

### ✅ Nível 0: HTTP
**O que é:** Uso do protocolo HTTP  
**Implementado:** Toda comunicação via HTTP

### ✅ Nível 1: Recursos
**O que é:** URI única por recurso  
**Implementado:**
- `/api/clientes` - Coleção de clientes
- `/api/clientes/{id}` - Cliente específico

### ✅ Nível 2: Métodos HTTP
**O que é:** Usar verbos HTTP corretamente  
**Implementado:**
- `POST /api/clientes` → 201 Created
- `GET /api/clientes` → 200 OK
- `GET /api/clientes/{id}` → 200 OK ou 404 Not Found
- `PUT /api/clientes/{id}` → 200 OK ou 404 Not Found
- `DELETE /api/clientes/{id}` → 204 No Content ou 404 Not Found

### ✅ Nível 3: HATEOAS
**O que é:** Hypermedia As The Engine Of Application State  
**Implementado:** Links hipermídia em todas as respostas

**Exemplo de resposta:**
```json
{
  "id": 1,
  "nome": "João Silva",
  "_links": {
    "self": {
      "href": "http://localhost:8080/api/clientes/1"
    },
    "clientes": {
      "href": "http://localhost:8080/api/clientes"
    },
    "atualizar": {
      "href": "http://localhost:8080/api/clientes/1"
    },
    "excluir": {
      "href": "http://localhost:8080/api/clientes/1"
    }
  }
}
```

## 🚀 Como Testar

### 1. Executar Aplicação
```bash
mvn clean install
mvn spring-boot:run
```

### 2. Criar Cliente (HATEOAS)
```bash
curl -X POST http://localhost:8080/api/clientes \
-H "Content-Type: application/json" \
-d '{
  "nome": "Maria Santos",
  "nomeSocial": "Maria",
  "dataNascimento": "1985-03-20",
  "documentos": [{"tipo": "CPF", "numero": "987.654.321-00"}],
  "endereco": {
    "estado": "SP",
    "cidade": "São Paulo",
    "bairro": "Paulista",
    "rua": "Av. Paulista",
    "numero": "1000",
    "codigoPostal": "01310-100"
  },
  "telefones": [{"ddd": "11", "numero": "99999-8888"}]
}'
```

**Resposta esperada (201 Created):**
- Status: 201
- Header Location: http://localhost:8080/api/clientes/1
- Body com `_links` (HATEOAS)

### 3. Listar Todos (HATEOAS)
```bash
curl http://localhost:8080/api/clientes
```

**Resposta esperada:**
- Status: 200
- Body com `_embedded` e `_links`

### 4. Buscar por ID (HATEOAS)
```bash
curl http://localhost:8080/api/clientes/1
```

**Resposta esperada:**
- Status: 200 ou 404
- Body com `_links` se encontrado

### 5. Atualizar (PUT)
```bash
curl -X PUT http://localhost:8080/api/clientes/1 \
-H "Content-Type: application/json" \
-d '{
  "nome": "Maria Santos Silva",
  "nomeSocial": "Maria Silva"
}'
```

**Resposta esperada:**
- Status: 200 ou 404
- Body com `_links` se sucesso

### 6. Excluir (DELETE)
```bash
curl -X DELETE http://localhost:8080/api/clientes/1
```

**Resposta esperada:**
- Status: 204 No Content ou 404

## 📊 Principais Recursos Implementados

### Spring HATEOAS
```java
@Entity
public class Cliente extends RepresentationModel<Cliente> {
    // Permite adicionar links HATEOAS
}
```

### EntityModel e CollectionModel
```java
EntityModel<Cliente> resource = EntityModel.of(cliente);
resource.add(linkTo(methodOn(ClienteController.class)
    .buscarPorId(id)).withSelfRel());
```

### Links Automáticos
- `self` - Link para o próprio recurso
- `clientes` - Link para coleção
- `atualizar` - Link para atualizar
- `excluir` - Link para excluir
- `criar` - Link para criar novo

## 🎓 Benefícios do Nível 3 (HATEOAS)

1. **Descoberta dinâmica:** Cliente descobre ações disponíveis via `_links`
2. **Desacoplamento:** Mudanças em URLs não quebram clientes
3. **Navegabilidade:** API se torna navegável como HTML
4. **RESTful completo:** Verdadeiramente RESTful

## 🏆 Diferencial da Implementação

**API Comum (Nível 2):**
```json
{"id": 1, "nome": "João"}
```

**API com HATEOAS (Nível 3):**
```json
{
  "id": 1,
  "nome": "João",
  "_links": {
    "self": {"href": ".../1"},
    "atualizar": {"href": ".../1"}
  }
}
```

✅ **Sistema AutoBoots agora é 100% RESTful com todos os níveis RMM implementados!**
