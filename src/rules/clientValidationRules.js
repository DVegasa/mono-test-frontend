import {validators} from '@/rules/validators';

export const clientValidationRules = {
  name: [
    {
      required: true,
      min: 3,
      max: 255,
      message: 'От 3 до 255 символов',
      trigger: 'blur',
    },
  ],
  phone: [
    {
      required: true,
      type: 'string',
      trigger: 'blur',
      message: 'Должен начинаться с + и быть до 15 символов',
    },
    {
      validator: validators.phone,
    }
  ],
  sex: [
    {
      type: 'boolean',
      trigger: 'blur',
      message: 'Обязательное поле'
    },
  ],
  address: [
    {
      required: false,
      max: 255,
      message: 'До 255 символов',
      trigger: 'blur',
    },
  ]
};
