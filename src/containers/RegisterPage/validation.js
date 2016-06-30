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
