// ===== helpers de interface e fluxo =====

// Monta lista clicável de especialidades; some após o clique.
export function renderEspecialidades(container, data, onSelect) {
  if (!container) return;
  container.innerHTML = "";
  const ul = document.createElement("ul");
  ul.style.listStyle = "none";
  ul.style.padding = "0";
  ul.style.margin = "0";
  data.forEach((esp) => {
    const li = document.createElement("li");
    li.style.margin = "8px 0";
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "esp-btn";
    btn.style.width = "100%";
    btn.style.textAlign = "left";
    btn.style.padding = "12px 14px";
    btn.style.borderRadius = "12px";
    btn.style.border = "1px solid #cbd5e1";
    btn.style.background = "#f8fafc";
    btn.style.cursor = "pointer";
    btn.onmouseenter = () => (btn.style.background = "#eef2f7");
    btn.onmouseleave = () => (btn.style.background = "#f8fafc");
    btn.innerHTML = `<div style="font-weight:600">${esp.nome}</div>
                     <div style="font-size:12px;color:#475569">${esp.descricao}</div>`;
    btn.addEventListener("click", () => {
      container.style.display = "none";        // some a lista
      onSelect && onSelect(esp);
    });
    li.appendChild(btn);
    ul.appendChild(li);
  });
  container.appendChild(ul);
}

// Indica que veio da recepção
export function setFromReception() {
  try { sessionStorage.setItem("fromReception","1"); } catch(e){}
}

// Garante que só entra na consulta vindo da recepção
export function guardReception(fallback="/receptionist.html") {
  try {
    const flag = sessionStorage.getItem("fromReception");
    if (!flag) location.replace(fallback);
  } catch(e) {
    location.replace(fallback);
  }
}

// Calcula tempos humanos de resposta: pensar + digitar
// Requisito: tempo mínimo de digitação = 10s; proporcional ao tamanho
export function humanDelays(textLength=80, role="medico") {
  const len = Math.max(0, textLength|0);
  const thinkMs = Math.max(2500, Math.min(7000, 1200 + 45*len)); // ~2.5s-7s
  const typeMs  = Math.max(10000, Math.min(45000, 60*len));      // >=10s
  return { thinkMs, typeMs };
}

// Texto da base legal de Telemedicina (atual)
export const baseLegalTele = `
<strong>Base legal da Telemedicina (Brasil)</strong><br/>
• <em>Lei nº 14.510/2022</em> — regulamenta a Telessaúde no país.<br/>
• <em>Resolução CFM nº 2.314/2022</em> — define diretrizes para a prática da Telemedicina.<br/>
• <em>Lei nº 13.709/2018 (LGPD)</em> — tratamento de dados pessoais em saúde.<br/>
`;
