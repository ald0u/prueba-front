// #region Datos de Remesas
let remesas = [
    { id: "12345678", company: "Western Union", amount: "15000", status: "COBRADO", created_at: "20231201", charged_at: "20231203" },
    { id: "87654321", company: "MoneyGram", amount: "8500", status: "COBRADO", created_at: "20231202", charged_at: "20231205" },
    { id: "11223344", company: "Ria", amount: "12000", status: "COBRADO", created_at: "20231203", charged_at: "20231207" },
    { id: "44332211", company: "Western Union", amount: "20000", status: "COBRADO", created_at: "20231204", charged_at: "20231208" },
    { id: "55667788", company: "Xoom", amount: "9500", status: "COBRADO", created_at: "20231205", charged_at: "20231210" },
    { id: "88776655", company: "MoneyGram", amount: "11000", status: "COBRADO", created_at: "20231206", charged_at: "20231212" },
    { id: "99887766", company: "Remitly", amount: "13500", status: "COBRADO", created_at: "20231207", charged_at: "20231215" },
    { id: "66778899", company: "Western Union", amount: "17000", status: "COBRADO", created_at: "20231208", charged_at: "20231218" },
    { id: "22334455", company: "Ria", amount: "14500", status: "COBRADO", created_at: "20231209", charged_at: "20231220" },
    { id: "55443322", company: "MoneyGram", amount: "10500", status: "COBRADO", created_at: "20231210", charged_at: "20231222" },
    { id: "33445566", company: "Xoom", amount: "16000", status: "NO_COBRADO", created_at: "20231211", charged_at: "" },
    { id: "66554433", company: "Remitly", amount: "18500", status: "NO_COBRADO", created_at: "20231212", charged_at: "" },
    { id: "77665544", company: "Western Union", amount: "19000", status: "NO_COBRADO", created_at: "20231213", charged_at: "" },
    { id: "44556677", company: "Ria", amount: "21000", status: "NO_COBRADO", created_at: "20231214", charged_at: "" },
    { id: "99001122", company: "MoneyGram", amount: "7500", status: "NO_COBRADO", created_at: "20231215", charged_at: "" }
];
// #endregion

// #region Funciones de busqueda
function toggleSearch() {
  const searchBar = document.getElementById('searchBar');
  searchBar.classList.toggle('hidden');
  
  if (!searchBar.classList.contains('hidden')) {
    document.getElementById('searchInput').focus();
  } else {
    document.getElementById('searchInput').value = "";
    clearSearch();
  }
}

function clearSearch() {
  const searchInput = document.getElementById('searchInput');
  searchInput.value = "";
  renderRemesas(remesas);
}

// #region Calculadora Remesas
function addNumber(num) {
  if(calculatorValue.length >= 8) {
    showError("Máximo 8 dígitos");
    return;
  }

  calculatorValue += num;
  updateDisplay();
}

function clearDisplay() {
  calculatorValue = "";
  updateDisplay();
}

function updateDisplay() {
  const display = document.getElementById('calculatorDisplay');
  display.textContent = calculatorValue || "***";
}

function processRemesa() {

  if(calculatorValue === "") {
    showError('Por favor, ingresa un número de remesa');
    return;
  }

  if(calculatorValue.length > 8){
    showError('El número no puede tener más de 8 dígitos');
    return;
  }

  const remesa = remesas.find(r => r.id === calculatorValue);

  if(!remesa){
    showError('Remesa no encontrada');
    clearDisplay();
    return;
  }

  if(remesa.status === "COBRADO"){
    showError(`Remesa ${remesa.id} ya ha sido cobrada el ${remesa.charged_at}`);
    clearDisplay();
    return;
  }

  remesa.status = "COBRADO";
  remesa.charged_at = new Date().toISOString().split('T')[0].replace(/-/g, '');

  clearDisplay();
  showSuccess(`Remesa ${remesa.id} cobrada exitosamente`);
}
// #endregion

// #region Notifiations
function closeError() { 
  const notification = document.getElementById('errorNotification');
  notification.classList.add('hidden');
}

function showError(message) {
  const notification = document.getElementById('errorNotification');
  const messageSpan = document.getElementById('errorMessage');

  messageSpan.textContent = message;
  notification.classList.remove('hidden');
  notification.style.backgroundColor = '#ff4757';

  setTimeout(() => {
    closeError();
    notification.classList.add('hidden');
  }, 3000);
}

function showSuccess(message){
  const notification = document.getElementById('errorNotification');
  const messageSpan = document.getElementById('errorMessage');

  messageSpan.textContent = message;
  notification.classList.remove('hidden');
  notification.style.backgroundColor = '#2ed573';

  setTimeout(() => {
    closeError();
    notification.classList.add('hidden');
  }, 3000);
}
// #endregion
