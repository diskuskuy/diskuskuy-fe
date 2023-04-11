import defaultMoment from 'moment/min/moment-with-locales';

export const isObjectEmpty = (objectName) => {
    return Object.keys(objectName).length === 0
  }

export const formatDate = (date) => {
    return defaultMoment(date).locale('id').format("DD MMMM YY");
}

export const formatTime = (date) => {
    return defaultMoment(date).format("HH:mm");
}