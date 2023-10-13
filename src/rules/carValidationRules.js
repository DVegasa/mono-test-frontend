import {validators} from '@/rules/validators';

export const carValidationRules = {
  brand: [
    {
      required: true,
      type: 'string',
      max: 255,
      message: 'До 255 символов',
      trigger: 'blur',
    }
  ],
  model: [
    {
      required: true,
      type: 'string',
      max: 255,
      message: 'До 255 символов',
      trigger: 'blur',
    }
  ],
  color: [
    {
      required: true,
      type: 'string',
      max: 255,
      message: 'До 255 символов',
      trigger: 'blur',
    }
  ],
  plate: [
    {
      required: true,
      type: 'string',
      max: 50,
      message: 'До 50 символов',
      trigger: 'blur',
    },
    {
      validator: validators.plate,
    }
  ],
  ownerId: [
    {
      required: true,
      type: 'integer',
      message: 'Обязательное поле',
    }
  ],
  isParked: [
    {
      type: 'boolean',
      trigger: 'blur',
      message: 'Обязательное поле',
    }
  ]
};
