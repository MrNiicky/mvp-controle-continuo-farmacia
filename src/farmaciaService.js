function calcularDataTermino(dataInicioISO, duracaoDias) {
  const dias = Number(duracaoDias);
  if (!dataInicioISO || Number.isNaN(dias) || dias <= 0) {
    throw new Error("Data inicial válida e duração positiva em dias são obrigatórias.");
  }
  const data = new Date(`${dataInicioISO}T00:00:00`);
  if (Number.isNaN(data.getTime())) {
    throw new Error("Formato de data inválido. Utilize AAAA-MM-DD.");
  }
  data.setDate(data.getDate() + dias);
  return data.toISOString().split("T")[0];
}

function verificarAlertaVencimento(dataTerminoISO, dataReferenciaISO, diasAntecedencia = 5) {
  const termino = new Date(`${dataTerminoISO}T00:00:00`);
  const referencia = new Date(`${dataReferenciaISO}T00:00:00`);
  const diffMs = termino - referencia;
  const diffDias = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  return diffDias <= diasAntecedencia;
}

function gerarLinkWhatsApp(telefone, nomePaciente, medicamento) {
  const apenasNumeros = String(telefone || "").replace(/\D/g, "");
  if (apenasNumeros.length < 10 || apenasNumeros.length > 11) {
    throw new Error("Número de WhatsApp inválido. Informe DDD + número com 10 ou 11 dígitos.");
  }
  const nomeSanitizado = String(nomePaciente || "Paciente").trim();
  const medSanitizado = String(medicamento || "medicamento contínuo").trim();
  const mensagem = encodeURIComponent(
    `Olá, ${nomeSanitizado}! Aqui é da Drogaria São Lucas. Lembramos que seu medicamento contínuo (${medSanitizado}) ou sua receita está próximo do vencimento. Precisa que a gente separe para você?`
  );
  return `https://wa.me/55${apenasNumeros}?text=${mensagem}`;
}

module.exports = {
  calcularDataTermino,
  verificarAlertaVencimento,
  gerarLinkWhatsApp
};
