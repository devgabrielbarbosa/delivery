document.addEventListener('DOMContentLoaded', function () {
  const btnEye = document.getElementById('btn-eye');
  const senhaInput = document.getElementById('senha');

  if (btnEye && senhaInput) {
    btnEye.addEventListener('click', function () {
      if (senhaInput.type === 'password') {
        senhaInput.type = 'text';
        btnEye.textContent = 'Ocultar';
      } else {
        senhaInput.type = 'password';
        btnEye.textContent = 'Mostrar';
      }
    });
  }

  const form = document.getElementById('form-login');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
      }
      alert('Login realizado (demo). Substitua pelo backend.');
    });
  }
});
