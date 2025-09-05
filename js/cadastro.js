// Início do JS Customizado

document.addEventListener('DOMContentLoaded', function () {
  // Toggle senha (usa FontAwesome)
  const btnEye = document.getElementById('btn-eye');
  const senhaInput = document.getElementById('senha');
  const eyeIcon = document.getElementById('eye-icon');

  if (btnEye) {
    btnEye.addEventListener('click', function () {
      if (senhaInput.type === 'password') {
        senhaInput.type = 'text';
        eyeIcon.classList.remove('fa-regular', 'fa-eye');
        eyeIcon.classList.add('fa-solid', 'fa-eye-slash');
      } else {
        senhaInput.type = 'password';
        eyeIcon.classList.remove('fa-solid', 'fa-eye-slash');
        eyeIcon.classList.add('fa-regular', 'fa-eye');
      }
    });
  }

  // Máscaras (jQuery.mask)
  if (window.jQuery && $.fn.mask) {
    $('#cpf').mask('000.000.000-00');
    $('#telefone').mask('(00) 00000-0000');
    $('#cep').mask('00000-000');
  }

  // Validação de formulário (Bootstrap)
  const form = document.getElementById('form-cadastro-cliente');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      e.stopPropagation();

      // validação nativa do bootstrap
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
      }

      // verifica se as senhas batem
      const senha = document.getElementById('senha').value;
      const confirma = document.getElementById('confirmaSenha').value;
      if (senha !== confirma) {
        alert('As senhas não coincidem.');
        return;
      }

      // se passou nas validações: constrói objeto cliente (exemplo)
      const cliente = {
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        cpf: document.getElementById('cpf').value,
        telefone: document.getElementById('telefone').value,
        dataNasc: document.getElementById('dataNasc').value,
        genero: document.getElementById('genero').value,
        cep: document.getElementById('cep').value,
        endereco: document.getElementById('endereco').value,
        numero: document.getElementById('numero').value,
        complemento: document.getElementById('complemento').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value,
        newsletter: document.getElementById('newsletter').checked
      };

      // aqui você pode fazer um fetch/post para sua API — por enquanto só log e alerta
      console.log('Cliente (pronto para envio):', cliente);
      alert('Cadastro realizado com sucesso (demo). Substitua o alert pelo envio real).');

      // opcional: limpar formulário
      form.reset();
      form.classList.remove('was-validated');
      // resetar ícone do olho se necessário
      if (eyeIcon) {
        eyeIcon.classList.remove('fa-solid','fa-eye-slash');
        eyeIcon.classList.add('fa-regular','fa-eye');
        if (senhaInput) senhaInput.type = 'password';
      }
    });
  }
});
// Fim do JS Customizado
