# Testes Financeiro - Módulo ERP

Este projeto contém testes automatizados com Playwright para validar a consistência de dados no módulo financeiro da aplicação ERP.

## Estrutura dos Testes

### 📁 Organização

```
tests/
├── e2e/
│   ├── consistencia-interna.spec.js    # Testes de consistência dentro de cada seção
│   └── consistencia-externa.spec.js    # Testes de consistência entre seções
├── support/
│   ├── elements.js                     # Seletores dos elementos da página
│   ├── helpers.js                      # Funções auxiliares
│   └── formatters.js                   # Funções de formatação de valores
```

## Tipos de Testes

### 🔄 Testes de Consistência Interna

Verificam se os cálculos e totalizações estão corretos **dentro de cada seção**.

### 🔗 Testes de Consistência Externa

Verificam se os dados são consistentes **entre diferentes seções** da aplicação.

---

## Seções Testadas

### 1. 📊 Dashboard Geral

#### Testes de Consistência Interna:

- **Receitas**: `Total Recebido + Total a Receber = Comprometido`
- **Despesas**: `Total Pago + Total a Pagar = Comprometido`

### 2. 💰 Fluxo de Caixa

#### Testes de Consistência Interna:

- **Entradas**: `Realizado + A Realizar = Comprometido`
- **Saídas**: `Realizado + A Realizar = Comprometido`

#### Testes de Consistência Externa:

- Dashboard ↔ Fluxo de Caixa:
  - `Total Recebido (Dashboard) = Entradas Realizadas (Fluxo)`
  - `Total a Receber (Dashboard) = Entradas A Realizar (Fluxo)`
  - `Total Pago (Dashboard) = Saídas Realizadas (Fluxo)`
  - `Total a Pagar (Dashboard) = Saídas A Realizar (Fluxo)`
  - `Comprometido Receitas (Dashboard) = Comprometido Entradas (Fluxo)`
  - `Comprometido Despesas (Dashboard) = Comprometido Saídas (Fluxo)`

### 3. 📈 Resumos Financeiros

#### 3.1 Índice Receitas

**Testes de Consistência Interna - Resumo:**

- `Recebido + A Receber = Comprometido`
- `Porcentagem = (Recebido / Comprometido) × 100`

**Testes de Consistência Interna - Grid:**

- `Incorridos + A Incorrer = Comprometido`

**Testes de Consistência Externa:**

- Dashboard ↔ Índice Receitas:
  - `Comprometido (Dashboard) = Comprometido (Índice Receitas)`
- Fluxo de Caixa ↔ Índice Receitas:
  - `Recebido (Resumo) = Entradas Realizadas (Fluxo)`
  - `A Receber (Resumo) = Entradas A Realizar (Fluxo)`
  - `Projeção (Resumo) = Projeção Entradas (Fluxo)`
  - `Projeção + Comprometido (Resumo) = Projetado Entradas (Fluxo)`
- Grid ↔ Resumo:
  - `Total Grid = Total Resumo`

#### 3.2 Índice Despesas

**Testes de Consistência Interna - Resumo:**

- `Realizado + Realizar = Comprometido`
- `Porcentagem = (Realizado / Comprometido) × 100`

**Testes de Consistência Interna - Grid:**

- `Incorridos + A Incorrer = Comprometido`

**Testes de Consistência Externa:**

- Dashboard ↔ Índice Despesas:
  - `Comprometido (Dashboard) = Comprometido (Índice Despesas)`
- Fluxo de Caixa ↔ Índice Despesas:
  - `Realizado (Resumo) = Saídas Realizadas (Fluxo)`
  - `Realizar (Resumo) = Saídas A Realizar (Fluxo)`
  - `Projeção (Resumo) = Projeção Saídas (Fluxo)`
  - `Projeção + Comprometido (Resumo) = Projetado Saídas (Fluxo)`
- Grid ↔ Resumo:
  - `Total Grid = Total Resumo`

#### 3.3 Atrasos a Receber

**Testes de Consistência Interna:**

- `Últimos 30 dias + Entre 30 e 60 dias + Mais de 60 dias = Total`
- `Total Resumo = Total Grid`

**Testes de Consistência Externa:**

- `Atrasos a Receber ≤ Total a Receber (Dashboard)` _(validação lógica)_

#### 3.4 Saldo

**Testes de Consistência Interna - Resumo:**

- `Caixa + Bancário + Investimento = Valor Total`
- `Valor Total (Resumo) = Saldo Atual (Grid)`

**Testes de Consistência Interna - Grid:**

- `Saldo Atual + Total a Receber - Total a Pagar = Saldo Realizado`
- `Saldo Realizado + Projeção Entradas - Projeção Saídas = Saldo Projetado`

**Testes de Consistência Externa:**

- Dashboard ↔ Saldo:
  - `Total a Receber (Saldo Grid) = Total a Receber (Dashboard)`
  - `Total a Pagar (Saldo Grid) = Total a Pagar (Dashboard)`
  - `Saldo Total = Total Recebido - Total Pago` _(aproximado)_
- Fluxo de Caixa ↔ Saldo:
  - `Projeção Entradas (Saldo) = Projeção Entradas (Fluxo)`
  - `Projeção Saídas (Saldo) = Projeção Saídas (Fluxo)`

### 4. 📊 Indicadores Financeiros

> **⚠️ PENDENTE**: Aguardando seletores dos elementos do grid principal dos Indicadores Financeiros para implementar os testes de:
>
> - Consistência entre dados do grid principal e página de detalhes
> - Validação dos cálculos de TIR, VPL, MARKUP, LUCRATIVIDADE, ROIC
> - Navegação entre páginas (financial → indicator)

**Elementos necessários:**

- Seletores do grid da página principal
- Seletores para cada coluna (Empreendimento, TIR, VPL, etc.)
- Seletores para navegação (clique nos empreendimentos)

---

## Como Executar

### Executar todos os testes:

```bash
npx playwright test
```

### Executar apenas testes de consistência interna:

```bash
npx playwright test consistencia-interna
```

### Executar apenas testes de consistência externa:

```bash
npx playwright test consistencia-externa
```

### Executar em modo debug:

```bash
npx playwright test --debug
```

### Gerar relatório:

```bash
npx playwright show-report
```

---

## Configuração

### Variáveis de Ambiente (.env)

- `BASE_URL`: URL da aplicação
- `VIEWPORT_WIDTH`: Largura da viewport (padrão: 1920)
- `VIEWPORT_HEIGHT`: Altura da viewport (padrão: 1080)

### Estrutura de Tolerância

- **Valores monetários**: Tolerância de 0.005 (0,5 centavos)
- **Porcentagens**: Tolerância de 0.1 (0,1%)
- **Validações aproximadas**: Tolerância de 0.05 (5 centavos)

---

## Status dos Testes

### ✅ Implementados e Funcionando

- Dashboard Geral (consistência interna)
- Fluxo de Caixa (consistência interna)
- Dashboard ↔ Fluxo de Caixa (consistência externa)
- Resumos Financeiros (consistências internas)
- Dashboard ↔ Resumos Financeiros (consistência externa)
- Fluxo de Caixa ↔ Resumos Financeiros (consistência externa)
- Validações cruzadas entre Resumos Financeiros

### ⚠️ Com Falhas Conhecidas

- Alguns testes de consistência externa podem estar falhando devido a bugs no código da aplicação

### 🔄 Pendentes de Implementação

- Indicadores Financeiros (aguardando seletores)
- Testes de navegação entre páginas
- Validações de gráficos AG-Charts

---

## Contribuindo

### Para adicionar novos testes:

1. Adicione os seletores necessários em `tests/support/elements.js`
2. Implemente os testes seguindo a estrutura existente
3. Use as funções auxiliares de `helpers.js` para leitura de valores
4. Mantenha a organização por seções e tipos de teste
5. Atualize esta documentação

### Padrões de Nomenclatura:

- **Testes**: Descrever claramente o que está sendo validado
- **Seletores**: Organizar por hierarquia (seção > subseção > elemento)
- **Funções**: Usar nomes descritivos e consistentes
