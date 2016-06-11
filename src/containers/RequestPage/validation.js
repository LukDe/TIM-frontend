export const offerValidation = {
  fields: {
    postalCode: {
      identifier: 'postalCode',
      rules: [
        {
          type: 'empty',
          prompt: 'Bitte geben sie eine Postleitzahl an.'
        },
        {
          type: 'integer',
          prompt: 'Bitte geben sie eine gültige Postleitzahl an.'
        },
        {
          type: 'length[5]',
          prompt: 'Bitte geben sie eine gültige Postleitzahl an.'
        }
      ]
    },
    quantity: {
      identifier: 'quantity',
      rules: [
        {
          type: 'empty',
          prompt: 'Bitte geben sie eine Anzahl an.'
        },
        {
          type: 'integer',
          prompt: 'Bitte geben sie eine gültige Anzahl an.'
        }
      ]
    },
    range: {
      identifier: 'range',
      rules: [
        {
          type: 'empty',
          prompt: 'Bitte geben sie eine Umkreis an.'
        },
        {
          type: 'integer',
          prompt: 'Bitte geben sie einen gültigen Umkreis an.'
        }
      ]
    },
    range: {
      identifier: 'range',
      rules: [
        {
          type: 'empty',
          prompt: 'Bitte geben sie eine Anzahl an.'
        },
        {
          type: 'integer',
          prompt: 'Bitte geben sie eine gültige Anzahl an.'
        }
      ]
    }
  }
}
