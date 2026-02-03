(function () {
  const STORAGE_KEY = "closed_notice_seen_until";
  const SHOW_EVERY_HOURS = 24;

  // do kedy má popup existovať
  const noticeEnds = new Date(2026, 1, 6, 23, 59, 59); // 6.2.2026

  const now = new Date();
  if (now > noticeEnds) return;

  const seenUntil = parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);
  if (now.getTime() < seenUntil) return;

  // CSS
  const style = document.createElement("style");
  style.textContent = `
    .modal{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.6);z-index:9999}
    .modal-content{background:#fff;max-width:500px;width:90%;border-radius:14px;padding:20px;position:relative}
    .modal h3{margin-top:0}
    .modal button{background:#004080;color:#fff;border:none;padding:10px 16px;border-radius:10px;font-weight:bold;cursor:pointer}
    .modal-close{position:absolute;top:10px;right:14px;font-size:26px;background:none;color:#000;cursor:pointer}
  `;
  document.head.appendChild(style);

  // HTML
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
    <div class="modal-content">
      <button class="modal-close">×</button>
      <h3>Upozornenie</h3>
      <p>⛔ <strong>V piatok 6. 2. 2026 bude prevádzka ZATVORENÁ.</strong></p>
      <button class="modal-ok">Rozumiem</button>
    </div>
  `;
  document.body.appendChild(modal);
  document.body.style.overflow = "hidden";

  function closeModal() {
    modal.remove();
    document.body.style.overflow = "";
    localStorage.setItem(
      STORAGE_KEY,
      Date.now() + SHOW_EVERY_HOURS * 60 * 60 * 1000
    );
  }

  modal.querySelector(".modal-close").onclick = closeModal;
  modal.querySelector(".modal-ok").onclick = closeModal;
  modal.onclick = e => { if (e.target === modal) closeModal(); };
})();
