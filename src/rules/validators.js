export const validators = {
  phone: (rule, value, callback) => {
    if (!value) return callback(new Error('Укажите значение'))
    if (!value?.startsWith('+')) return callback(new Error('Телефон должен начинаться с +'))
    callback()
  }
}
