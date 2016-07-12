export const userValidation = {
  fields: {
    postalCode: {
      identifier: 'postalCode',
      rules: [
        {
          type: 'empty',
          prompt: 'Bitte geben Sie eine Postleitzahl an.'
        },
        {
          type: 'integer[1..99999]',
          prompt: 'Bitte geben Sie eine gültige Postleitzahl an.'
        }
      ]
    },
    mobile: {
      identifier: 'mobile',
      rules: [
        {
          type: 'regExp[/^\\+[0-9]{6,15}$/]',
          prompt: 'Bitte geben Sie eine gültige Handynummer an. Z.b.: +4901234567'
        }
      ]
    }
  }
}

