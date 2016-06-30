export const offerValidation = {
  fields: {
    location: {
      identifier: 'location',
      rules: [
        {
          type: 'empty',
          prompt: 'Bitte geben Sie eine gültige Adresse.'
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
          type: 'integer',
          prompt: 'Bitte geben sie einen gültigen Umkreis an.'
        }
      ]
    }
  }
}
