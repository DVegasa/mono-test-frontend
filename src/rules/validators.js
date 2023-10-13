export const validators = {
  phone: (rule, value, callback) => {
    if (!value) return callback(new Error('Укажите значение'));
    if (!value?.startsWith('+')) return callback(new Error('Телефон должен начинаться с +'));
    callback();
  },

  plate: (rule, value, callback) => {
    if (!value) return callback(new Error('Укажите значение'));
    const russianCivilPlateRegex = /^[ABEKMHOPCTYX]\d{3}[ABEKMHOPCTYX][ABEKMHOPCTYX]\d{2,3}$/;
    if (!value.match(russianCivilPlateRegex)) return callback(new Error('Неправильный рег.знак'));
    callback();
  }
};
