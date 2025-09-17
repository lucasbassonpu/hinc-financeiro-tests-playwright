import { test, expect } from '@playwright/test';
import { elements } from '../support/elements.js';
import { readMoney, readNumber, expectCloseTo } from '../support/helpers.js';


test.describe('Consistência Interna de cada seção da página', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(process.env.BASE_URL);
        await page.setViewportSize({ 
            width: parseInt(process.env.VIEWPORT_WIDTH) || 1920, 
            height: parseInt(process.env.VIEWPORT_HEIGHT) || 1080 
        });
    });

    test.describe('Receitas e Despesas dashboard geral', () => {
        test('Deve verificar se o valor total recebido + total a receber é igual ao valor total comprometido', async ({ page }) => {
            const rec = await readMoney(page, elements.dashboard.receitas.totalRecebido);
            const arec = await readMoney(page, elements.dashboard.receitas.totalAReceber);
            const comp = await readMoney(page, elements.dashboard.receitas.comprometido);
            
            const soma = rec + arec;
            expectCloseTo(soma, comp, 0.005);
        });

        test('Deve verificar se o total pago + total a pagar é igual ao comprometido de despesas', async ({ page }) => {
            const pago = await readMoney(page, elements.dashboard.despesas.totalPago);
            const apagar = await readMoney(page, elements.dashboard.despesas.totalAPagar);
            const compDesp = await readMoney(page, elements.dashboard.despesas.comprometido);
            
            const soma = pago + apagar;
            expectCloseTo(soma, compDesp, 0.005);
        });
    });

    test.describe('Fluxo de Caixa', () => {
        test('Verificar se soma das linhas de Entradas confere com totais apresentados', async ({ page }) => {
            await page.locator(elements.fluxoCaixa.botaoLista).click();
            const realizado = await readMoney(page, elements.fluxoCaixa.entradas.realizado);
            const arealizar = await readMoney(page, elements.fluxoCaixa.entradas.aRealizar);
            const comprometido = await readMoney(page, elements.fluxoCaixa.entradas.comprometido);
            
            const soma = realizado + arealizar;
            expectCloseTo(soma, comprometido, 0.005);
        });

        test('Verificar se soma das linhas de Saídas confere com totais apresentados', async ({ page }) => {
            await page.locator(elements.fluxoCaixa.botaoLista).click();
            const realizado = await readMoney(page, elements.fluxoCaixa.saidas.realizado);
            const arealizar = await readMoney(page, elements.fluxoCaixa.saidas.aRealizar);
            const comprometido = await readMoney(page, elements.fluxoCaixa.saidas.comprometido);
      
            const soma = realizado + arealizar;
            expectCloseTo(soma, comprometido, 0.005);
        });
    });

    test.describe('Resumos financeiros', () => {
        test.describe('Consistencia Interna', () => {
            test.describe('Indice Receitas', () => {
                test.describe('Grid consistência interna', () => {
                    test('Verificar se o valor Total de Comprometido é igual de Incorridos + A Incorrer', async ({ page }) => {
                        await page.locator(elements.resumosFinanceiros.indiceReceitas.resumo.botaoAbrir).click();
                        const incorridos = await readMoney(page, elements.resumosFinanceiros.indiceReceitas.grid.incorrido);
                        const aIncorrer = await readMoney(page, elements.resumosFinanceiros.indiceReceitas.grid.aIncorrer);
                        const comprometido = await readMoney(page, elements.resumosFinanceiros.indiceReceitas.grid.comprometido);
                        
                        const soma = incorridos + aIncorrer;
                        expectCloseTo(soma, comprometido, 0.005);
                    });
                });

                test.describe('Resumo consistencia interna', () => {
                    test('Verificar se o valor recebido é igual a A Receber + Comprometido', async ({ page }) => {
                        await page.locator(elements.resumosFinanceiros.indiceReceitas.resumo.botaoAbrir).click();
                        const recebido = await readMoney(page, elements.resumosFinanceiros.indiceReceitas.resumo.recebido);
                        const aReceber = await readMoney(page, elements.resumosFinanceiros.indiceReceitas.resumo.aReceber);
                        const comprometido = await readMoney(page, elements.resumosFinanceiros.indiceReceitas.resumo.comprometido);
                        
                        const soma = aReceber + recebido;
                        expectCloseTo(soma, comprometido, 0.005);
                    });

                    test('Verificar se a porcentagem do índice está correta - (Recebido / Comprometido) x 100 = Porcentagem', async ({ page }) => {
                        const porcentagem = await readNumber(page, elements.resumosFinanceiros.indiceReceitas.resumo.porcentagem);
                        const recebido = await readMoney(page, elements.resumosFinanceiros.indiceReceitas.resumo.recebido);
                        const projecao = await readNumber(page, elements.resumosFinanceiros.indiceReceitas.resumo.projecaoEntrada);
                        const comprometido = await readMoney(page, elements.resumosFinanceiros.indiceReceitas.resumo.comprometido);
                        
                        const soma = projecao + comprometido;
                        const calculo = (recebido / soma) * 100;
                        expectCloseTo(calculo, porcentagem, 0.1);
                    });
                });
            });

            test.describe('Indice Despesas', () => {
                test.describe('Grid consistência interna', () => {
                    test('Verificar se o valor Total de Comprometido é igual de Incorridos + A Incorrer', async ({ page }) => {
                        await page.locator(elements.resumosFinanceiros.indiceDespesas.resumo.botaoAbrir).click();
                        const incorridos = await readMoney(page, elements.resumosFinanceiros.indiceDespesas.grid.incorrido);
                        const aIncorrer = await readMoney(page, elements.resumosFinanceiros.indiceDespesas.grid.aIncorrer);
                        const comprometido = await readMoney(page, elements.resumosFinanceiros.indiceDespesas.grid.comprometido);
                        
                        const soma = incorridos + aIncorrer;
                        expectCloseTo(soma, comprometido, 0.005);
                    });
                });

                test.describe('Resumo consistencia interna', () => {
                    test('Verificar se o valor Comprometido é igual a Realizar + Realizado', async ({ page }) => {
                        await page.locator(elements.resumosFinanceiros.indiceDespesas.resumo.botaoAbrir).click();
                        const realizado = await readMoney(page, elements.resumosFinanceiros.indiceDespesas.resumo.realizado);
                        const realizar = await readMoney(page, elements.resumosFinanceiros.indiceDespesas.resumo.realizar);
                        const comprometido = await readMoney(page, elements.resumosFinanceiros.indiceDespesas.resumo.comprometido);
                        
                        const soma = realizado + realizar;
                        expectCloseTo(soma, comprometido, 0.005);
                    });

                    test('Verificar se a porcentagem do índice está correta - (Realizado / Comprometido) x 100 = Porcentagem', async ({ page }) => {
                        const realizado = await readMoney(page, elements.resumosFinanceiros.indiceDespesas.resumo.realizado);
                        const comprometido = await readMoney(page, elements.resumosFinanceiros.indiceDespesas.resumo.comprometido);
                        const porcentagem = await readNumber(page, elements.resumosFinanceiros.indiceDespesas.resumo.porcentagem);
                        
                        const calculo = (realizado / comprometido) * 100;
                        expectCloseTo(calculo, porcentagem, 0.1);
                    });
                });
            });

            test.describe('Atrasos a Receber', () => {
                test('Verificar se total resumo é igual ao total grid', async ({ page }) => {
                    await page.locator(elements.resumosFinanceiros.atrasosAReceber.resumo.botaoAbrir).click();
                    const totalResumo = await readMoney(page, elements.resumosFinanceiros.atrasosAReceber.resumo.total);
                    const totalGrid = await readMoney(page, elements.resumosFinanceiros.atrasosAReceber.grid.total);
                    
                    expectCloseTo(totalResumo, totalGrid, 0.005);
                });

                test('Verificar se valores internos do resumo resultam no total', async ({ page }) => {
                    const totalResumo = await readMoney(page, elements.resumosFinanceiros.atrasosAReceber.resumo.total);
                    const ultimos30Dias = await readMoney(page, elements.resumosFinanceiros.atrasosAReceber.resumo.ultimos30Dias);
                    const entre30e60Dias = await readMoney(page, elements.resumosFinanceiros.atrasosAReceber.resumo.entre30e60Dias);
                    const maisDe60Dias = await readMoney(page, elements.resumosFinanceiros.atrasosAReceber.resumo.maisDe60Dias);
                    
                    const soma = ultimos30Dias + entre30e60Dias + maisDe60Dias;
                    expectCloseTo(soma, totalResumo, 0.005);
                });
            });

            test.describe('Saldo', () => {
                test('Verificar se o total resumo é igual ao saldo atual no grid', async ({ page }) => {
                    await page.locator(elements.resumosFinanceiros.saldo.resumo.botaoAbrir).click();
                    const valorTotal = await readMoney(page, elements.resumosFinanceiros.saldo.resumo.valorTotal);
                    const saldoAtual = await readMoney(page, elements.resumosFinanceiros.saldo.grid.saldoAtual);
                    
                    expectCloseTo(valorTotal, saldoAtual, 0.005);
                });

                test('Verificar se valores internos do resumo resultam no total', async ({ page }) => {
                    const valorTotal = await readMoney(page, elements.resumosFinanceiros.saldo.resumo.valorTotal);
                    const valorCaixa = await readMoney(page, elements.resumosFinanceiros.saldo.resumo.valorCaixa);
                    const valorBancario = await readMoney(page, elements.resumosFinanceiros.saldo.resumo.valorBancario);
                    const valorInvestimento = await readMoney(page, elements.resumosFinanceiros.saldo.resumo.valorInvestimento);
                    
                    const soma = valorCaixa + valorBancario + valorInvestimento;
                    expectCloseTo(soma, valorTotal, 0.005);
                });
            });
        });
    });
});
