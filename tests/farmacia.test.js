const test = require("node:test");
const assert = require("node:assert");
const {
  calcularDataTermino,
  verificarAlertaVencimento,
  gerarLinkWhatsApp
} = require("../src/farmaciaService");

test("Unitário: deve calcular corretamente a data de término para caixa de 30 dias", () => {
  const resultado = calcularDataTermino("2026-11-01", 30);
  assert.strictEqual(resultado, "2026-12-01");
});

test("Unitário: deve acionar alerta quando faltam 5 dias ou menos para o término", () => {
  assert.strictEqual(verificarAlertaVencimento("2026-11-20", "2026-11-16", 5), true);
  assert.strictEqual(verificarAlertaVencimento("2026-11-30", "2026-11-16", 5), false);
});

test("Integração: fluxo completo de cálculo e geração de link de contato WhatsApp", () => {
  const termino = calcularDataTermino("2026-11-01", 20);
  const precisaAlertar = verificarAlertaVencimento(termino, "2026-11-17", 5);
  assert.strictEqual(precisaAlertar, true);
  const link = gerarLinkWhatsApp("(33) 99999-1234", "Maria Silva", "Losartana 50mg");
  assert.ok(link.startsWith("https://wa.me/5533999991234?text="));
});
