export const userValidation = {
  fields: {
    email: {
      identifier: 'email',
      rules: [
        {
          type: 'empty',
          prompt: 'Bitte geben Sie eine E-Mailadresse an.'
        },
        {
          type: 'email',
          prompt: 'Bitte geben sie eine gültige E-Mailadresse an.'
        }
      ]
    },
    radius: {
      identifier: 'radius',
      rules: [
        {
          type: 'empty',
          prompt: 'Bitte geben sie einen Bewegungsradius ein.'
        },
        {
          type: 'integer',
          prompt: 'Bitte geben sie einen gültigen Bewegungsradius an'
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

