import { SETTINGS } from "./config.mjs";

export const formatPrice = (value) => 
  `${SETTINGS.currency} ${value.toFixed(2)}`;