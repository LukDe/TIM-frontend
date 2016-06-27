export const registerValidation = {
  fields: {
    username: {
      identifier: 'username',
      rules: [
        {
          type: 'empty',
          prompt: 'Bitte geben sie einen Benutzernamen ein.'
        }
      ]
    },
    location: {
      identifier: 'location',
      rules: [
        {
          type: 'empty',
          prompt: 'Bitte geben sie eine Postleitzahl an.'
        },
        {
          type: 'integer[1..99999]',
          prompt: 'Bitte geben sie eine gültige Postleitzahl an.'
        }
      ]
    },
    password: {
      identifier: 'password',
      rules: [
        {
          type: 'empty',
          prompt: 'Bitte geben sie ein Passwort ein.'
        }
      ]
    },
    phoneNr: {
      identifier: 'phoneNr',
      rules: [
        {
          type: 'empty',
          prompt: 'Bitte geben sie eine Telfonnummer an.'
        },
        {
          type: 'integer',
          prompt: 'Bitte geben sie eine gültige Telfonnummer an.'
        }
      ]
    }
  }
}
