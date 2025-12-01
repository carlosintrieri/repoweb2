# AutoBoots - Sistema RMM Nível 3 (HATEOAS)

Sistema de gestão AutoBoots implementando os **4 níveis Richardson Maturity Model (RMM)**.

## 🎯 Níveis RMM Implementados

- ✅ **Nível 0:** Protocolo HTTP
- ✅ **Nível 1:** Recursos únicos (`/api/clientes`, `/api/clientes/{id}`)
- ✅ **Nível 2:** Métodos HTTP (POST, GET, PUT, DELETE) + Status corretos
- ✅ **Nível 3:** HATEOAS - Links hipermídia nas respostas

## 🚀 Como Executar

```bash



# 2. Compilar e executar
mvn clean install
mvn spring-boot:run
```

Aguarde: `Started AutoBootsApplication`

## 🧪 Testar

### Criar Cliente (POST)
```bash
curl -X POST http://localhost:8080/api/clientes \
-H "Content-Type: application/json" \
-d '{
  "nome": "Maria Santos",
  "nomeSocial": "Maria",
  "dataNascimento": "1985-03-20"
}'
```

**Resposta (201 Created):**
```json
{
  "id": 1,
  "nome": "Maria Santos",
  "_links": {
    "self": {"href": "http://localhost:8080/api/clientes/1"},
    "all-clientes": {"href": "http://localhost:8080/api/clientes"},
    "update": {"href": "http://localhost:8080/api/clientes/1"},
    "delete": {"href": "http://localhost:8080/api/clientes/1"}
  }
}
```

### Listar Todos (GET)
```bash
curl http://localhost:8080/api/clientes
```

### Buscar por ID (GET)
```bash
curl http://localhost:8080/api/clientes/1
```

### Atualizar (PUT)
```bash
curl -X PUT http://localhost:8080/api/clientes/1 \
-H "Content-Type: application/json" \
-d '{"nome": "Maria Silva", "nomeSocial": "Maria"}'
```

### Deletar (DELETE)
```bash
curl -X DELETE http://localhost:8080/api/clientes/1
```

## 🔍 Banco H2

Acesse: http://localhost:8080/h2-console

- **JDBC URL:** `jdbc:h2:mem:autoboots`
- **User:** `sa`
- **Password:** (vazio)

## 📊 O que é HATEOAS?

**HATEOAS** = Hypermedia As The Engine Of Application State

A API retorna **links** que dizem **o que você pode fazer**:

```json
{
  "id": 1,
  "nome": "Maria",
  "_links": {
    "self": "...",      // Ver este recurso
    "update": "...",    // Atualizar
    "delete": "...",    // Deletar
    "all-clientes": "..." // Ver todos
  }
}
```

**Benefícios:**
- ✅ Cliente não precisa saber URLs
- ✅ API auto-documentada
- ✅ Mudanças de URL não quebram clientes
- ✅ Descoberta dinâmica de ações

## 🎓 Diferencial

**Nível 2 (Comum):**
```json
{"id": 1, "nome": "Maria"}
```

**Nível 3 (HATEOAS - Completo):**
```json
{
  "id": 1,
  "nome": "Maria",
  "_links": {
    "self": "http://localhost:8080/api/clientes/1",
    "update": "http://localhost:8080/api/clientes/1"
  }
}
```

## 🛠️ Tecnologias

- Java 17+
- Spring Boot 3.2.0
- Spring HATEOAS
- Spring Data JPA
- H2 Database

---

✅ **Sistema 100% RESTful com Richardson Maturity Model Nível 3 implementado!**
