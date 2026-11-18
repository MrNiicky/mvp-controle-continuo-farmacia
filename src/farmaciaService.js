function calcularDataTermino(dataInicioISO, duracaoDias) {
  if (!dataInicioISO || duracaoDias <= 0) {
    throw new Error("Data inicial e duração em dias são obrigatórias.");
  }
  const data = new Date(dataInicioISO + "T00:00:00");
  data.setDate(data.getDate() + Number(duracaoDias));
  return data.toISOString().split("T")[0];
}

function verificarAlertaVencimento(dataTerminoISO, dataReferenciaISO, diasAntecedencia = 5) {
  const termino = new Date(dataTerminoISO + "T00:00:00");
  const referencia = new Date(dataReferenciaISO + "T00:00:00");
  const diffMs = termino - referencia;
  const diffDias = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  return diffDias <= diasAntecedencia;
}

function gerarLinkWhatsApp(telefone, nomePaciente, medicamento) {
  const apenasNumeros = String(telefone).replace(/\D/g, "");
  const mensagem = encodeURIComponent(
    `Olá, ${nomePaciente}! Aqui é da Drogaria São Lucas. Lembramos que seu medicamento contínuo (${medicamento}) ou sua receita está próximo do vencimento. Precisa que a gente separe para você?`
  );
  return `https://wa.me/55${apenasNumeros}?text=${mensagem}`;
}

module.exports = {
  calcularDataTermino,
  verificarAlertaVencimento,
  gerarLinkWhatsApp
};
