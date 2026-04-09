export function renderHistory(historyList) {
  const listElement = document.getElementById("history-list");

  if (!historyList || historyList.length === 0) {
    listElement.innerHTML = `
      <li style="color: #888; font-style: italic;">
        История пуста. Выполните несколько операций, чтобы увидеть результаты здесь.
      </li>
    `;
    return;
  }

  const itemsHTML = historyList.slice(-10).reverse();

  listElement.innerHTML = lastItems
    .map((entry, idx) => {
      const number = historyList.length - idx;
      return `<li><strong>${number}.</strong> ${entry}</li>`;
    })
    .join("");
}