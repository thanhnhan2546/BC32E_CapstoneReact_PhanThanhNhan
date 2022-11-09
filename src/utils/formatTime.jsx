import { format } from "date-fns";

export function fDate(date) {
  return format(new Date(date), "dd / MM / yyyy");
}

export function fTime(date) {
  return format(new Date(date), "HH:mm");
}
export function fDay(date) {
  return format(new Date(), "eeee");
}
