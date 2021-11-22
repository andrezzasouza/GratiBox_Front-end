const matchPasswords =
  'Os campos "Senha" e "Confirmação de senha" precisam ter os mesmos valores. Digite novamente, por favor.';

const signUpErr = (err) => {
  if (!err.response) {
    return 'Algo deu errado. Por favor, tente novamente.';
  }
  const { status } = err.response;
  const { message } = err.response.data;
  let serverMessage = '';
  let displayMessage = '';

  if (status === 400) {
    if (message.includes('email')) {
      displayMessage = 'E-mail inválido.';
    } else if (message.includes('repeatPassword')) {
      displayMessage = 'A confirmação da senha deve ser igual à senha.';
    } else if (message.includes('password')) {
      displayMessage = 'A senha deve ter pelo menos 6 caracteres.';
    } else if (message.includes('name')) {
      displayMessage = 'O nome deve conter pelo menos 2 letras.';
    }
    serverMessage = displayMessage;
  }
  if (status === 409 || status === 500) {
    serverMessage = message;
  }
  return serverMessage;
};

const loginErr = (err) => {
  if (!err.response) {
    return 'Algo deu errado. Por favor, tente novamente.';
  }
  const { status } = err.response;
  const { message } = err.response.data;
  let serverMessage = '';
  let displayMessage = '';

  if (status === 400) {
    if (message.includes('email')) {
      displayMessage =
        'E-mail inválido. Por favor, verifique e tente novamente';
    } else if (message.includes('password')) {
      displayMessage = 'A senha deve ter pelo menos 6 caracteres.';
    }
    serverMessage = displayMessage;
  }
  if (status === 404 || status === 401 || status === 500) {
    serverMessage = message;
  }
  return serverMessage;
};

export { signUpErr, matchPasswords, loginErr };
