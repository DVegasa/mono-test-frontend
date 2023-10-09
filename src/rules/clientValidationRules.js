export const clientValidationRules = {
  name: [
    {
      required: true,
      min: 3,
      max: 255,
      message: "От 3 до 255 символов",
      trigger: 'blur',
    },
  ],
  phone: [
    {
      required: true,
      type: 'string',
      trigger: 'blur',
    }
  ],
  sex: [
    {
      required: true,
      type: 'boolean',
      trigger: 'blur',
    },
  ],
  address: [
    {
      required: false,
      max: 255,
      message: "До 255 символов",
      trigger: 'blur',
    },
  ]
}
