const handleAlert = (type, msg) => {
  alertBox.innerHTML = `
    <div class="alert alert-primary" role="${type}">
        ${msg}
    </div>
  `;
};
