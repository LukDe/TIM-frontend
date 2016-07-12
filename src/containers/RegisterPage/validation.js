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
          type: 'regExp[/^\\+[0-9]{6,15}$/]',
          prompt: 'Bitte geben Sie eine gültige Telefonnummer an. Z.b.: +4901234567'
        }
      ]
    }
  }
}
