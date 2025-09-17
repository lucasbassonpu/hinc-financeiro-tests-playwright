import { test, expect } from '@playwright/test';
import { elements } from '../support/elements.js';
import { readMoney, expectCloseTo } from '../support/helpers.js';

test.describe('Consistência inter-seções', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(process.env.BASE_URL);
        await page.setViewportSize({ 
            width: parseInt(process.env.VIEWPORT_WIDTH) || 1920, 
            height: parseInt(process.env.VIEWPORT_HEIGHT) || 1080 
        });
    });

    test.describe('Consistência Dashboard Geral x Fluxo de Caixa', () => {
        test('Verificar se Total Recebido Dashboard = Entradas Realizadas Fluxo de Caixa', async ({ page }) => {
            const dashboardRecebido = await readMoney(page, elements.dashboard.receitas.totalRecebido);
            await page.locator(elements.fluxoCaixa.botaoLista).click();
            const fluxoRealizado = await readMoney(page, elements.fluxoCaixa.entradas.realizado);
            
            expectCloseTo(dashboardRecebido, fluxoRealizado, 0.005);
        });
        
        test('Verificar se Total a receber Dashboard = Entradas a Realizar Fluxo de Caixa', async ({ page }) => {
            const dashboardAReceber = await readMoney(page, elements.dashboard.receitas.totalAReceber);
            await page.locator(elements.fluxoCaixa.botaoLista).click();
            const fluxoARealizar = await readMoney(page, elements.fluxoCaixa.entradas.aRealizar);
            
            expectCloseTo(dashboardAReceber, fluxoARealizar, 0.005);
        });
        
        test('Verificar se Total Pago Dashboard = Saídas realizado Fluxo de Caixa', async ({ page }) => {
            const dashboardPago = await readMoney(page, elements.dashboard.despesas.totalPago);
            await page.locator(elements.fluxoCaixa.botaoLista).click();
            const fluxoRealizado = await readMoney(page, elements.fluxoCaixa.saidas.realizado);
            
            expectCloseTo(dashboardPago, fluxoRealizado, 0.005);
        });
        
        test('Verificar se Total a Pagar Dashboard = Saídas A Realizar Fluxo de Caixa', async ({ page }) => {
            const dashboardAPagar = await readMoney(page, elements.dashboard.despesas.totalAPagar);
            await page.locator(elements.fluxoCaixa.botaoLista).click();
            const fluxoARealizar = await readMoney(page, elements.fluxoCaixa.saidas.aRealizar);
            
            expectCloseTo(dashboardAPagar, fluxoARealizar, 0.005);
        });
        
        test('Verificar se Comprometido Receitas Dashboard = Comprometido Entradas Fluxo de Caixa', async ({ page }) => {
            const dashboardComprometido = await readMoney(page, elements.dashboard.receitas.comprometido);
            await page.locator(elements.fluxoCaixa.botaoLista).click();
            const fluxoComprometido = await readMoney(page, elements.fluxoCaixa.entradas.comprometido);
            
            expectCloseTo(dashboardComprometido, fluxoComprometido, 0.005);
        });
        
        test('Verificar se Comprometido Despesas Dashboard = Comprometido Saidas Fluxo de Caixa', async ({ page }) => {
            const dashboardComprometido = await readMoney(page, elements.dashboard.despesas.comprometido);
            await page.locator(elements.fluxoCaixa.botaoLista).click();
            const fluxoComprometido = await readMoney(page, elements.fluxoCaixa.saidas.comprometido);
            
            expectCloseTo(dashboardComprometido, fluxoComprometido, 0.005);
        });
    });

    test.describe('Consistência Dashboard Geral x Resumos Financeiros', () => {
        test('Verificar se Comprometido Dashboard = Comprometido Índice Receitas', async ({ page }) => {
            const dashboardComprometido = await readMoney(page, elements.dashboard.receitas.comprometido);
            await page.locator(elements.resumosFinanceiros.indiceReceitas.resumo.botaoAbrir).click();
            const indiceComprometido = await readMoney(page, elements.resumosFinanceiros.indiceReceitas.resumo.comprometido);
            
            expectCloseTo(dashboardComprometido, indiceComprometido, 0.005);
        });
        
        test('Verificar se Comprometido Dashboard = Comprometido Índice Despesas', async ({ page }) => {
            const dashboardComprometido = await readMoney(page, elements.dashboard.despesas.comprometido);
            await page.locator(elements.resumosFinanceiros.indiceDespesas.resumo.botaoAbrir).click();
            const indiceComprometido = await readMoney(page, elements.resumosFinanceiros.indiceDespesas.resumo.comprometido);
            
            expectCloseTo(dashboardComprometido, indiceComprometido, 0.005);
        });
    });

    test.describe('Consistência Resumos Financeiros x Fluxo de Caixa', () => {
        test.describe('Entradas Fluxo x Índice Receitas', () => {
            test('Verificar se Recebido Resumos = Entradas Realizadas Fluxo', async ({ page }) => {
                await page.locator(elements.fluxoCaixa.botaoLista).click();
                const fluxoRealizado = await readMoney(page, elements.fluxoCaixa.entradas.realizado);
                const indiceRecebido = await readMoney(page, elements.resumosFinanceiros.indiceReceitas.resumo.recebido);
                
                expectCloseTo(fluxoRealizado, indiceRecebido, 0.005);
            });

            test('Verificar se A Receber Resumos = Entradas A Realizar Fluxo', async ({ page }) => {
                await page.locator(elements.fluxoCaixa.botaoLista).click();
                const fluxoARealizar = await readMoney(page, elements.fluxoCaixa.entradas.aRealizar);
                const indiceAReceber = await readMoney(page, elements.resumosFinanceiros.indiceReceitas.resumo.aReceber);
                
                console.log('Fluxo A Realizar:', fluxoARealizar);
                console.log('Índice A Receber:', indiceAReceber);
                expectCloseTo(fluxoARealizar, indiceAReceber, 0.005);
            });
            
            test('Verificar que projeção Receitas Resumos = Entradas Projeção Fluxo', async ({ page }) => {
                await page.locator(elements.fluxoCaixa.botaoLista).click();
                const fluxoProjecao = await readMoney(page, elements.fluxoCaixa.entradas.projecao);
                const indiceProjecao = await readMoney(page, elements.resumosFinanceiros.indiceReceitas.resumo.projecaoEntrada);
                
                expectCloseTo(fluxoProjecao, indiceProjecao, 0.005);
            });

            test('Verificar se projeção de entrada + comprometidoReceitas Resumos = Entradas Projetado Fluxo', async ({ page }) => {
                await page.locator(elements.fluxoCaixa.botaoLista).click();
                const fluxoProjetado = await readMoney(page, elements.fluxoCaixa.entradas.projetado);
                const indiceComprometido = await readMoney(page, elements.resumosFinanceiros.indiceReceitas.resumo.comprometido);
                const indiceProjecao = await readMoney(page, elements.resumosFinanceiros.indiceReceitas.resumo.projecaoEntrada);
                
                const soma = indiceComprometido + indiceProjecao;
                expectCloseTo(soma, fluxoProjetado, 0.005);
            });
        });

        test.describe('Saídas Fluxo x Índice Despesas', () => {
            test('Verificar se Realizado resumo = Saída Realizado Fluxo', async ({ page }) => {
                await page.locator(elements.fluxoCaixa.botaoLista).click();
                const fluxoRealizado = await readMoney(page, elements.fluxoCaixa.saidas.realizado);
                const indiceRealizado = await readMoney(page, elements.resumosFinanceiros.indiceDespesas.resumo.realizado);
                
                expectCloseTo(fluxoRealizado, indiceRealizado, 0.005);
            });

            test('Verificar se Realizar resumo = Saída A Realizar Fluxo', async ({ page }) => {
                await page.locator(elements.fluxoCaixa.botaoLista).click();
                const fluxoARealizar = await readMoney(page, elements.fluxoCaixa.saidas.aRealizar);
                const indiceARealizar = await readMoney(page, elements.resumosFinanceiros.indiceDespesas.resumo.realizar);
                
                expectCloseTo(fluxoARealizar, indiceARealizar, 0.005);
            });

            test('Verificar se Projeção de saída resumo = Saída Projeção Fluxo', async ({ page }) => {
                await page.locator(elements.fluxoCaixa.botaoLista).click();
                const fluxoProjecao = await readMoney(page, elements.fluxoCaixa.saidas.projecao);
                const indiceProjecao = await readMoney(page, elements.resumosFinanceiros.indiceDespesas.resumo.projecaoSaida);
                
                expectCloseTo(fluxoProjecao, indiceProjecao, 0.005);
            });

            test('Verificar se Projeção de saída resumo + comprometido despesas = Saída Projetado Fluxo', async ({ page }) => {
                await page.locator(elements.fluxoCaixa.botaoLista).click();
                const fluxoProjetado = await readMoney(page, elements.fluxoCaixa.saidas.projetado);
                const indiceComprometido = await readMoney(page, elements.resumosFinanceiros.indiceDespesas.resumo.totalComprometido);
                const indiceProjecao = await readMoney(page, elements.resumosFinanceiros.indiceDespesas.resumo.projecaoSaida);
                
                const soma = indiceComprometido + indiceProjecao;
                expectCloseTo(soma, fluxoProjetado, 0.005);
            });
        });
    });
});
