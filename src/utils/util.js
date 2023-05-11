import moment from "moment";
import "moment/locale/id";

export const isObjectEmpty = (objectName) => {
  return Object.keys(objectName ?? {}).length === 0;
};

export const formatDate = (date) => {
  return moment(date).locale("id").format("DD MMMM YY");
};

export const formatTime = (date) => {
  return moment(date).format("HH:mm");
};
