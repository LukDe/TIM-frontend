export const loginValidation = {
  fields: {
    mobile: {
      identifier: 'mobile',
      rules: [
        {
          type: 'empty',
          prompt: 'Please enter your mobile number'
        },
        {
          type: 'mobile',
          prompt: 'Please enter a valid mobile numper'
        }
      ]
    },
    postalCode: {
      identifier: 'postalCode',
      rules: [
        {
          type: 'empty',
          prompt: 'Please enter your postal code'
        },
        {
          type: 'length[5]',
          prompt: 'Your postal code must be at least 5 characters'
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
          prompt: 'Your password must be at least 6 characters'
        }
      ]
    }
  }
}
