
  function maskCpf(value) {
    return value
      .replace(/\D/g, '') // Remove tudo o que não é dígito
      .slice(0, 11) // Limita a 11 dígitos
      .replace(/(\d{3})(\d)/, '$1.$2') // Coloca um ponto entre o terceiro e o quarto dígito
      .replace(/(\d{3})(\d)/, '$1.$2') // Coloca um ponto entre o sexto e o sétimo dígito
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Coloca um hífen entre o nono e o décimo dígito
  }
  
  function maskCep(value) {
    return value
      .replace(/\D/g, '') // Remove tudo o que não é dígito
      .slice(0, 8) // Limita a 8 dígitos
      .replace(/(\d{5})(\d)/, '$1-$2'); // Coloca um hífen entre o quinto e o sexto dígito
  }

function maskPhone(value) {
  return value
    .replace(/\D/g, '') // Remove tudo o que não é dígito
    .slice(0, 11) // Limita a 11 dígitos
    .replace(/(\d{2})(\d)/, '($1) $2') // Coloca parênteses em volta dos dois primeiros dígitos
    .replace(/(\d{5})(\d)/, '$1-$2'); // Coloca um hífen entre o quinto e o sexto dígito
}

  export {maskCpf, maskCep, maskPhone};