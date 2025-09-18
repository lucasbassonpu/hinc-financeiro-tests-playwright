import { test, expect } from '@playwright/test';
import { elements } from '../support/elements.js';
import { readMoney, readNumber, expectCloseTo } from '../support/helpers.js';

test.describe.skip('Indicadores Financeiros', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(process.env.BASE_URL);
        await page.setViewportSize({
            width: parseInt(process.env.VIEWPORT_WIDTH) || 1920,
            height: parseInt(process.env.VIEWPORT_HEIGHT) || 1080
        });
    });

    test.describe('Consistência Interna - Página de Detalhes', () => {
        test('Verificar se dados do dashboard individual são consistentes', async ({ page }) => {
            // Navegar para página de detalhes de indicadores
            await page.goto(process.env.BASE_URL.replace('/financial', '/indicator'));

            // Obter valores dos indicadores
            const tirValue = await readNumber(page, elements.indicadoresFinanceiros.interno.tir);
            const vplValue = await readMoney(page, elements.indicadoresFinanceiros.interno.vpl);
            const markupValue = await readNumber(page, elements.indicadoresFinanceiros.interno.markup);
            const lucratividadeValue = await readNumber(page, elements.indicadoresFinanceiros.interno.lucratividade);
            const roicValue = await readNumber(page, elements.indicadoresFinanceiros.interno.roic);

            // Validações básicas de tipo
            expect(typeof tirValue).toBe('number');
            expect(typeof vplValue).toBe('number');
            expect(typeof markupValue).toBe('number');
            expect(typeof lucratividadeValue).toBe('number');
            expect(typeof roicValue).toBe('number');

            // Validações lógicas de negócio
            expect(lucratividadeValue).toBeGreaterThanOrEqual(-100); // Lucratividade >= -100%
            expect(lucratividadeValue).toBeLessThanOrEqual(1000);    // Lucratividade <= 1000%
            expect(markupValue).toBeGreaterThan(0);                  // Markup deve ser positivo
            expect(roicValue).toBeGreaterThanOrEqual(-100);          // ROIC >= -100%
        });
    });

    // ====================================================================================================
    // TESTES COMENTADOS - AGUARDANDO SELETORES DO GRID PRINCIPAL DOS INDICADORES FINANCEIROS
    // ====================================================================================================

    test.describe.skip('Consistência Externa - Grid Principal vs Detalhes', () => {
        test('Verificar se TIR do grid principal = TIR da página de detalhes', async ({ page }) => {
            // const tirGrid = await readNumber(page, elements.indicadoresFinanceiros.externo.tir);
            // await page.locator(elements.indicadoresFinanceiros.externo.empreendimento).first().click();
            // await page.waitForURL('**/indicator');
            //
            // const tirDetalhes = await readNumber(page, elements.indicadoresFinanceiros.interno.tir);
            // expectCloseTo(tirGrid, tirDetalhes, 0.01);
        });

        test('Verificar se VPL do grid principal = VPL da página de detalhes', async ({ page }) => {
            // const vplGrid = await readMoney(page, elements.indicadoresFinanceiros.externo.vpl);
            // await page.locator(elements.indicadoresFinanceiros.externo.empreendimento).first().click();
            // await page.waitForURL('**/indicator');
            //
            // const vplDetalhes = await readMoney(page, elements.indicadoresFinanceiros.interno.vpl);
            // expectCloseTo(vplGrid, vplDetalhes, 0.005);
        });

        test('Verificar se MARKUP do grid principal = MARKUP da página de detalhes', async ({ page }) => {
            // const markupGrid = await readNumber(page, elements.indicadoresFinanceiros.externo.markup);
            // await page.locator(elements.indicadoresFinanceiros.externo.empreendimento).first().click();
            // await page.waitForURL('**/indicator');
            //
            // const markupDetalhes = await readNumber(page, elements.indicadoresFinanceiros.interno.markup);
            // expectCloseTo(markupGrid, markupDetalhes, 0.01);
        });

        test('Verificar se LUCRATIVIDADE do grid principal = LUCRATIVIDADE da página de detalhes', async ({ page }) => {
            // const lucratividadeGrid = await readNumber(page, elements.indicadoresFinanceiros.externo.lucratividade);
            // await page.locator(elements.indicadoresFinanceiros.externo.empreendimento).first().click();
            // await page.waitForURL('**/indicator');
            //
            // const lucratividadeDetalhes = await readNumber(page, elements.indicadoresFinanceiros.interno.lucratividade);
            // expectCloseTo(lucratividadeGrid, lucratividadeDetalhes, 0.01);
        });

        test('Verificar se ROIC do grid principal = ROIC da página de detalhes', async ({ page }) => {
            // const roicGrid = await readNumber(page, elements.indicadoresFinanceiros.externo.roic);
            // await page.locator(elements.indicadoresFinanceiros.externo.empreendimento).first().click();
            // await page.waitForURL('**/indicator');
            //
            // const roicDetalhes = await readNumber(page, elements.indicadoresFinanceiros.interno.roic);
            // expectCloseTo(roicGrid, roicDetalhes, 0.01);
        });
    });

    test.describe.skip('Validações Dinâmicas - Múltiplos Empreendimentos', () => {
        test('Verificar consistência para todos os empreendimentos disponíveis', async ({ page }) => {
            // Contar quantos empreendimentos existem no grid
            // const numeroEmpreendimentos = await page.locator(elements.indicadoresFinanceiros.externo.empreendimento).count();
            //
            // for (let i = 0; i < numeroEmpreendimentos; i++) {
            //     // Obter dados do grid principal
            //     const nomeEmpresa = await page.locator(elements.indicadoresFinanceiros.externo.empreendimento).nth(i).textContent();
            //     const tirGrid = await readNumber(page, page.locator(elements.indicadoresFinanceiros.externo.tir).nth(i));
            //     const vplGrid = await readMoney(page, page.locator(elements.indicadoresFinanceiros.externo.vpl).nth(i));
            //
            //     // Navegar para página de detalhes
            //     await page.locator(elements.indicadoresFinanceiros.externo.empreendimento).nth(i).click();
            //     await page.waitForURL('**/indicator');
            //
            //     // Verificar nome da empresa na página de detalhes
            //     const nomeEmpresaDetalhes = await page.locator(elements.indicadoresFinanceiros.interno.empreendimentoNome).textContent();
            //     expect(nomeEmpresaDetalhes).toContain(nomeEmpresa);
            //
            //     // Obter dados da página de detalhes
            //     const tirDetalhes = await readNumber(page, elements.indicadoresFinanceiros.interno.tir);
            //     const vplDetalhes = await readMoney(page, elements.indicadoresFinanceiros.interno.vpl);
            //
            //     // Validar consistência
            //     expectCloseTo(tirGrid, tirDetalhes, 0.01);
            //     expectCloseTo(vplGrid, vplDetalhes, 0.005);
            //
            //     // Voltar para página principal
            //     await page.goto(process.env.BASE_URL);
            // }
        });

        test('Verificar se existem empreendimentos no grid', async ({ page }) => {
            // const contadorEmpreendimentos = await page.locator(elements.indicadoresFinanceiros.externo.empreendimento).count();
            // expect(contadorEmpreendimentos).toBeGreaterThan(0);
        });

        test('Verificar se todos os valores numéricos são válidos no grid', async ({ page }) => {
            // const numeroEmpreendimentos = await page.locator(elements.indicadoresFinanceiros.externo.empreendimento).count();
            //
            // for (let indice = 0; indice < numeroEmpreendimentos; indice++) {
            //     const tirGrid = await readNumber(page, page.locator(elements.indicadoresFinanceiros.externo.tir).nth(indice));
            //     const vplGrid = await readMoney(page, page.locator(elements.indicadoresFinanceiros.externo.vpl).nth(indice));
            //     const markupGrid = await readNumber(page, page.locator(elements.indicadoresFinanceiros.externo.markup).nth(indice));
            //     const lucratividadeGrid = await readNumber(page, page.locator(elements.indicadoresFinanceiros.externo.lucratividade).nth(indice));
            //     const roicGrid = await readNumber(page, page.locator(elements.indicadoresFinanceiros.externo.roic).nth(indice));
            //
            //     // Validações básicas de tipo
            //     expect(typeof tirGrid).toBe('number');
            //     expect(typeof vplGrid).toBe('number');
            //     expect(typeof markupGrid).toBe('number');
            //     expect(typeof lucratividadeGrid).toBe('number');
            //     expect(typeof roicGrid).toBe('number');
            //
            //     // Validações lógicas de negócio
            //     expect(lucratividadeGrid).toBeGreaterThanOrEqual(-100);
            //     expect(lucratividadeGrid).toBeLessThanOrEqual(1000);
            //     expect(roicGrid).toBeGreaterThanOrEqual(-100);
            // }
        });
    });
});
