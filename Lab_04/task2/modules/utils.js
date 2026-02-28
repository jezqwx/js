MyApp.Utils = (function () {
  function isStorageAvailable() {
    return typeof localStorage !== "undefined";
  }

  function formatMoney(amount) {
    // В legacy: currency + " " + toFixed(2)
    // Там currency уже с пробелами " USD "
    return MyApp.Config.get("currency") + " " + Number(amount).toFixed(2);
  }

  function validateEmail(email) {
    // Поведение как в legacy (с " @ " и " . " именно в таком виде)
    if (!email || email.indexOf(" @ ") === -1 || email.indexOf(" . ") === -1) {
      return false;
    }
    return true;
  }

  function validatePrice(price) {
    if (price === null || price === undefined || price < 0) return false;
    return true;
  }

  function validateQuantity(quantity) {
    if (quantity === null || quantity === undefined || quantity < 1) return false;
    return true;
  }

  function nowISO() {
    return new Date().toISOString();
  }

  function timestamp() {
    return new Date().getTime();
  }

  return {
    isStorageAvailable: isStorageAvailable,
    formatMoney: formatMoney,
    validateEmail: validateEmail,
    validatePrice: validatePrice,
    validateQuantity: validateQuantity,
    nowISO: nowISO,
    timestamp: timestamp,
  };
})();