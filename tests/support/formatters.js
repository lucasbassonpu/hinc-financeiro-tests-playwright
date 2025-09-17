// Funções utilitárias para tratar valores monetários exibidos na UI

// Extrai o primeiro valor monetário no formato pt-BR (ex: 1.234,56), com opcional de sinal negativo
export const extractFirstMoney = (text) => {
    const cleaned = String(text || '').replace(/\s/g, '')
    const match = cleaned.match(/-?\d{1,3}(?:\.\d{3})*,\d{2}/)
    return match ? match[0] : ''
  }
  
  // Normaliza um texto removendo símbolo de moeda e espaços, e garante que apenas o primeiro valor seja considerado
  export const normalizeMoney = (text) => {
    const first = extractFirstMoney(text)
    return first
  }
  
  // Força o valor monetário a ser negativo (com sinal "-")
  export const normalizeNegativeMoney = (text) => {
    const first = extractFirstMoney(text)
    if (!first) return ''
    return '-' + first.replace(/^-/, '')
  }
  
  // Converte string de dinheiro pt-BR (ex: 1.234,56) para número JS (1234.56)
  export const moneyStringToNumber = (text) => {
    const s = normalizeMoney(text)
    if (!s) return 0
    // Remove pontos (separadores de milhares) e substitui vírgula por ponto (decimal)
    const normalized = s.replace(/\./g, '').replace(',', '.')
    const num = parseFloat(normalized)
    return Number.isFinite(num) ? num : 0
  }
  
  // Converte string de porcentagem pt-BR (ex: 53,79%) para número JS (53.79)
  export const percentageStringToNumber = (text) => {
    const cleaned = String(text || '')
      .trim()
      .replace(/[%\s]/g, '')
      .replace(',', '.')
    const num = parseFloat(cleaned)
    return Number.isFinite(num) ? num : 0
  }
  
  // Converte valores monetários ou numéricos para número (mais flexível que percentageStringToNumber)
  export const flexibleNumberToNumber = (text) => {
    const cleaned = String(text || '')
      .trim()
      .replace(/[R$\s%]/g, '') // Remove R$, espaços e %
      .replace(/\./g, '') // Remove pontos (separadores de milhares)
      .replace(',', '.') // Substitui vírgula por ponto (decimal)
    const num = parseFloat(cleaned)
    return Number.isFinite(num) ? num : 0
  }
  