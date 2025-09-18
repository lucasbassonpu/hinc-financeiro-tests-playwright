const elements = {
  dashboard: {
    receitas: {
      totalRecebido:
        ":nth-child(3) > :nth-child(1) > :nth-child(2) > ._value_q7biy_25",
      totalAReceber:
        ":nth-child(3) > :nth-child(2) > :nth-child(2) > ._value_q7biy_25",
      comprometido:
        ":nth-child(3) > :nth-child(3) > :nth-child(2) > ._value_q7biy_25",
    },
    despesas: {
      totalPago:
        ":nth-child(5) > :nth-child(1) > :nth-child(2) > ._value_q7biy_25",
      totalAPagar:
        ":nth-child(5) > :nth-child(2) > :nth-child(2) > ._value_q7biy_25",
      comprometido:
        ":nth-child(5) > :nth-child(3) > :nth-child(2) > ._value_q7biy_25",
    },
  },

  fluxoCaixa: {
    botaoLista:
      '[style="margin-bottom: 20px; display: flex; justify-content: flex-end;"] > :nth-child(3)',

    entradas: {
      realizado: '.ag-row-even > [col-id="realizado"]',
      aRealizar: '.ag-row-even > [col-id="realizar"]',
      comprometido: '.ag-row-even > [col-id="comprometido"]',
      projecao: '.ag-row-even > [col-id="projecao"]',
      projetado:
        '[style="height: 600px; width: 100%;"] > [style="height: 100%;"] > .ag-root-wrapper > .ag-root-wrapper-body > .ag-root > .ag-body > .ag-body-viewport > .ag-center-cols-viewport > .ag-center-cols-container > .ag-row-even > .ag-column-last',
    },

    saidas: {
      realizado: '.ag-row-odd > [col-id="realizado"]',
      aRealizar: '.ag-row-odd > [col-id="realizar"]',
      comprometido: '.ag-row-odd > [col-id="comprometido"]',
      projecao: '.ag-row-odd > [col-id="projecao"]',
      projetado:
        '[style="height: 600px; width: 100%;"] > [style="height: 100%;"] > .ag-root-wrapper > .ag-root-wrapper-body > .ag-root > .ag-body > .ag-body-viewport > .ag-center-cols-viewport > .ag-center-cols-container > .ag-row-odd > .ag-column-last',
    },
  },

  resumosFinanceiros: {
    indiceReceitas: {
      resumo: {
        porcentagem:
          ":nth-child(1) > ._card_content_ydohh_23 > ._main_value_ydohh_52",
        recebido:
          ":nth-child(1) > ._card_content_ydohh_23 > ._additional_info_ydohh_40 > :nth-child(1) > span",
        aReceber:
          ":nth-child(1) > ._card_content_ydohh_23 > ._additional_info_ydohh_40 > :nth-child(2) > span",
        projecaoDeEntrada:
          ":nth-child(1) > ._card_content_ydohh_23 > ._additional_info_ydohh_40 > :nth-child(3) > span",
        projecaoEntrada:
          ":nth-child(1) > ._card_content_ydohh_23 > ._additional_info_ydohh_40 > :nth-child(3) > span",
        comprometido:
          ":nth-child(1) > ._card_content_ydohh_23 > ._additional_info_ydohh_40 > :nth-child(4) > span",
        botaoAbrir: ":nth-child(1) > ._card_content_ydohh_23 button",
      },
      grid: {
        incorrido:
          '.ag-floating-bottom-container > .ag-row-even > [col-id="incorrido"]',
        aIncorrer:
          '.ag-floating-bottom-container > .ag-row-even > [col-id="a_incorrer"]',
        comprometido:
          ".ag-floating-bottom-container > .ag-row-even > .ag-column-last",
      },
    },
    indiceDespesas: {
      resumo: {
        porcentagem:
          ":nth-child(2) > ._card_content_ydohh_23 > ._main_value_ydohh_52",
        realizado:
          ":nth-child(2) > ._card_content_ydohh_23 > ._additional_info_ydohh_40 > :nth-child(1) > span",
        realizar:
          ":nth-child(2) > ._card_content_ydohh_23 > ._additional_info_ydohh_40 > :nth-child(2) > span",
        projecaoDeSaida:
          ":nth-child(2) > ._card_content_ydohh_23 > ._additional_info_ydohh_40 > :nth-child(3) > span",
        projecaoSaida:
          ":nth-child(2) > ._card_content_ydohh_23 > ._additional_info_ydohh_40 > :nth-child(3) > span",
        comprometido:
          ":nth-child(2) > ._card_content_ydohh_23 > ._additional_info_ydohh_40 > :nth-child(4) > span",
        totalComprometido:
          ":nth-child(2) > ._card_content_ydohh_23 > ._additional_info_ydohh_40 > :nth-child(4) > span",
        botaoAbrir: ":nth-child(2) > ._card_content_ydohh_23 button",
      },
      grid: {
        incorrido:
          '.ag-floating-bottom-container > .ag-row-even > [col-id="incorrido"]',
        aIncorrer:
          '.ag-floating-bottom-container > .ag-row-even > [col-id="a_incorrer"]',
        comprometido:
          ".ag-floating-bottom-container > .ag-row-even > .ag-column-last",
      },
    },
    atrasosAReceber: {
      resumo: {
        total: "._main_value_1cry8_52",
        valorTotal: "._main_value_1cry8_52",
        ultimos30Dias: "._additional_info_1cry8_40 > :nth-child(1) > span",
        entre30e60Dias: "._additional_info_1cry8_40 > :nth-child(2) > span",
        maisDe60Dias: "._additional_info_1cry8_40 > :nth-child(3) > span",
        botaoAbrir: "._toggle_button_1cry8_66",
      },
      grid: {
        total: ".ag-floating-bottom-container > .ag-row-even > .ag-column-last",
      },
    },
    saldo: {
      resumo: {
        valorTotal: "._main_value_xtye1_51",
        valorCaixa: "._additional_info_xtye1_39 > :nth-child(1) > span",
        valorBancario: "._additional_info_xtye1_39 > :nth-child(2) > span",
        valorInvestimento: "._additional_info_xtye1_39 > :nth-child(3) > span",
        botaoAbrir: "._toggle_button_xtye1_56",
      },
      grid: {
        saldoAtual:
          '.ag-floating-bottom-container > .ag-row-even > [col-id="saldo_atual"]',
        totalAReceber:
          '.ag-floating-bottom-container > .ag-row-even > [col-id="total_a_receber"]',
        totalAPagar:
          '.ag-floating-bottom-container > .ag-row-even > [col-id="total_a_pagar"]',
        projecaoEntradas:
          '.ag-floating-bottom-container > .ag-row-even > [col-id="projeção_entrada"]',
        projecaoSaidas:
          '.ag-floating-bottom-container > .ag-row-even > [col-id="projeção_saida"]',
        saldoRealizado:
          '.ag-floating-bottom-container > .ag-row-even > [col-id="saldo_realizado"]',
        saldoProjetado:
          ".ag-floating-bottom-container > .ag-row-even > .ag-column-last",
      },
    },
  },

  indicadoresFinanceiros: {
    externo: {
      empreendimento: "",
      tir: "",
      vpl: "",
      markup: "",
      lucratividade: "",
      roic: "",
    },
    interno: {
      titulo: "._title_module_1tmxl_33",
      empreendimentoNome: "._empreendimento_name_1tmxl_40",
      tir: ":nth-child(1) > .values-card > .value",
      vpl: ":nth-child(2) > .values-card > .value",
      markup: ":nth-child(3) > .values-card > .value",
      lucratividade: ":nth-child(4) > .values-card > .value",
      roic: ":nth-child(5) > .values-card > .value",
    },
  },
};

export { elements };
