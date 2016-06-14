export const loginValidation = {
  fields: {
    username: {
      identifier: 'username',
      rules: [
        {
          type: 'empty',
          prompt: 'Please enter your username'
        },
        {
          type: 'length[3]',
          prompt: 'Your username must have at least 3 characters'
        }
      ]
    },
    password: {
      identifier: 'password',
      rules: [
        {
          type: 'empty',
          prompt: 'Please enter your password'
        },
        {
          type: 'length[6]',
          prompt: 'Your password must have at least 6 characters'
        }
      ]
    }
  }
}
