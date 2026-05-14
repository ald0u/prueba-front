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

// #region Variables globales
let currentPage = 1;
const itemsPerPage = 10;
let filteredRemesas= [];
let calculatorValue = "";
// #endregion

document.addEventListener('DOMContentLoaded', () => {
  renderRemesas();
});

// #region Funciones de remesas
/*
* funcion getFilteredAndSortedRemesas: Filtra las remesas cobradas y las ordena por fecha de cobro de forma descendente.
* Utiliza el método filter para obtener solo las remesas con estado "COBRADO" y luego ordena el resultado utilizando el método sort, comparando las fechas de cobro en formato ISO.
* Devuelve la lista de remesas filtradas y ordenadas.
*/
function getFilteredAndSortedRemesas() {
  let cobradas = remesas.filter(r => r.status === 'COBRADO');

  cobradas.sort((a, b) => {return b.charged_at.localeCompare(a.charged_at)});

  return cobradas;
}

/*
* funcion renderRemesas: Renderiza la tabla de remesas cobradas en la interfaz de usuario.
* Obtiene las remesas filtradas y ordenadas utilizando la función getFilteredAndSortedRemesas.
* Calcula el número total de páginas según la cantidad de remesas y los elementos por página.
* Si la página actual es mayor que el número total de páginas, ajusta la página actual al número total de páginas.
* Si no hay remesas para mostrar, establece la página actual en 1.
* Calcula los índices de inicio y fin para mostrar las remesas correspondientes a la página actual.
* Limpia el contenido del cuerpo de la tabla y agrega filas para cada remesa a mostrar.
* Si no hay remesas para mostrar, muestra un mensaje indicando que no se encontraron resultados.
* Finalmente, llama a la función renderPagination para mostrar los controles de paginación.
*/
function renderRemesas() {
  const sortedRemesas = getFilteredAndSortedRemesas();
  filteredRemesas = sortedRemesas;
  const totalPages = Math.ceil(filteredRemesas.length / itemsPerPage);

  if(currentPage > totalPages && totalPages > 0) currentPage = totalPages;

  if(totalPages === 0) currentPage = 1;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const remesasToShow = filteredRemesas.slice(startIndex, endIndex);

  const tbody = document.getElementById('remesasTableBody');
  tbody.innerHTML = "";

  if(remesasToShow.length === 0) {
    tbody.innerHTML = '<tr><td colspan="3" style="text-align: center; padding: 40px; color: #999;">No se encontraron resultados</td></tr>';
  }else {
    remesasToShow.forEach(remesa => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${remesa.id}</td>
        <td>${remesa.company}</td>
        <td>$${parseFloat(remesa.amount).toLocaleString('es-MX', { minimumFractionDigits: 2 })}</td>
      `;
      tbody.appendChild(row);
    });
  }

  renderPagination(totalPages);
}

/*
* funcion renderPagination: Renderiza los controles de paginación en la interfaz de usuario.
* Obtiene el elemento de paginación por su ID y limpia su contenido.
* Si el número total de páginas es menor o igual a 1, no muestra los controles de paginación.
* Crea un botón de "Anterior" y lo deshabilita si la página actual es la primera.
* Agrega un evento de clic al botón de "Anterior" para navegar a la página anterior si no se encuentra en la primera página.
* Crea botones para cada página y los marca como activos si corresponden a la página actual.
* Agrega eventos de clic a cada botón de página para navegar a la página correspondiente al hacer clic.
* Crea un botón de "Siguiente" y lo deshabilita si la página actual es la última.
* Agrega un evento de clic al botón de "Siguiente" para navegar a la página siguiente si no se encuentra en la última página.
*/
function renderPagination(totalPages) {
  const pagination = document.getElementById('pagination');
  pagination.innerHTML = "";

  if(totalPages <= 1) return;

  const prevButton = document.createElement('button');
  prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
  prevButton.disabled = currentPage === 1;
  prevButton.onclick = () => {
    if(currentPage > 1) {
      currentPage--;
      renderRemesas();
    }
  };
  pagination.appendChild(prevButton);

  for(let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.textContent = i;
    pageButton.className = i === currentPage ? 'active' : '';
    pageButton.onclick = () => {
      currentPage = i;
      renderRemesas();
    }
    pagination.appendChild(pageButton);
  }

  const nextButton = document.createElement('button');
  nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
  nextButton.disabled = currentPage === totalPages;
  nextButton.onclick = () => {
    if(currentPage < totalPages) {
      currentPage++;
      renderRemesas();
    }
  };
  pagination.appendChild(nextButton);
}
// #endregion

// #region Funciones de busqueda
/**
 * funcion filterRemesas: Filtra las remesas cobradas según el término de búsqueda ingresado por el usuario.
 * Obtiene el término de búsqueda del input, lo convierte a minúsculas y elimina espacios en blanco.
 * Si el término de búsqueda está vacío, renderiza todas las remesas y reinicia la página actual.
 */
function  filterRemesas() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();

  if(searchTerm === "") {
    currentPage = 1;
    renderRemesas(remesas);
    return;
  }

  const cobradas = remesas.filter(r => r.status ==='COBRADO');

  filteredRemesas = cobradas.filter(remesa => {
    const id = remesa.id.toLowerCase();
    const company = remesa.company.toLowerCase();
    const amount = remesa.amount.toLowerCase();
    
    return id.includes(searchTerm) || company.includes(searchTerm) || amount.includes(searchTerm);
  });

  filteredRemesas.sort((a, b) => b.charged_at.localeCompare(a.charged_at));

  currentPage = 1;

  const totalPages = Math.ceil(filteredRemesas.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const remesasToShow = filteredRemesas.slice(startIndex, endIndex);

  const tbody = document.getElementById('remesasTableBody');
  tbody.innerHTML = "";

  if(remesasToShow.length === 0) {
    tbody.innerHTML = '<tr><td colspan="3" style="text-align: center; padding: 40px; color: #999;">No se encontraron resultados</td></tr>';
  }else {
    remesasToShow.forEach(remesa => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${remesa.id}</td>
        <td>${remesa.company}</td>
        <td>$${parseFloat(remesa.amount).toLocaleString('es-MX', { minimumFractionDigits: 2 })}</td>
      `;
      tbody.appendChild(row);
    });
  }

  renderPagination(totalPages);
}

/**
* funcion toggleSearch: Alterna la visibilidad de la barra de búsqueda.
* Obtiene el elemento de la barra de búsqueda por su ID y le agrega o quita la clase 'hidden' para mostrar u ocultar la barra.  
* Si la barra de búsqueda se muestra, enfoca el input para que el usuario pueda comenzar a escribir de inmediato.
* Si la barra de búsqueda se oculta, limpia el valor del input y llama a clearSearch para mostrar todas las remesas nuevamente.
*/
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

/**
* funcion clearSearch: Limpia el valor del input de búsqueda y renderiza todas las remesas.
* Obtiene el elemento del input de búsqueda por su ID, establece su valor como una cadena vacía y llama a renderRemesas para mostrar todas las remesas nuevamente.
*/
function clearSearch() {
  const searchInput = document.getElementById('searchInput');
  searchInput.value = "";
  renderRemesas(remesas);
}
// #endregion

// #region Calculadora Remesas
/*
* funcion addNumber: Agrega un número a la cadena de valor de la calculadora.
* Verifica si la longitud de la cadena es menor a 8 dígitos antes de agregar el número.
* Si se alcanza el límite, muestra un mensaje de error y no agrega el número.
* Después de agregar el número, actualiza la pantalla de la calculadora.
*/
function addNumber(num) {
  if(calculatorValue.length >= 8) {
    showError("Máximo 8 dígitos");
    return;
  }

  calculatorValue += num;
  updateDisplay();
}

/*
* funcion clearDisplay: Limpia la cadena de valor de la calculadora y actualiza la pantalla.
* Establece la variable calculatorValue como una cadena vacía y llama a updateDisplay para reflejar el cambio en la pantalla.
*/
function clearDisplay() {
  calculatorValue = "";
  updateDisplay();
}

/*
* funcion updateDisplay: Actualiza el contenido de la pantalla de la calculadora.
* Obtiene el elemento de la pantalla por su ID y establece su texto como el valor actual de la calculadora.
* Si el valor de la calculadora es una cadena vacía, muestra "***" en la pantalla.
*/
function updateDisplay() {
  const display = document.getElementById('calculatorDisplay');
  display.textContent = calculatorValue || "***";
}

/*
* funcion processRemesa: Procesa la remesa ingresada en la calculadora.
* Verifica si el valor de la calculadora está vacío o tiene más de 8 dígitos, mostrando un mensaje de error en ambos casos.
* Busca la remesa correspondiente al número ingresado en la lista de remesas.
* Si la remesa no se encuentra, muestra un mensaje de error y limpia la pantalla.
* Si la remesa ya ha sido cobrada, muestra un mensaje de error indicando la fecha de cobro y limpia la pantalla.
* Si la remesa es válida y no ha sido cobrada, actualiza su estado a "COBRADO" y establece la fecha de cobro como la fecha actual.
* Finalmente, limpia la pantalla y muestra un mensaje de éxito indicando que la remesa ha sido cobrada exitosamente.
*/
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

/*
* funcion CloseError: Cierra la notificación de error después de mostrarla durante un tiempo determinado.
* Obtiene el elemento de notificación por su ID y le agrega la clase 'hidden' para ocultarlo.
*/
function closeError() { 
  const notification = document.getElementById('errorNotification');
  notification.classList.add('hidden');
}

/*
* funcion showError: Muestra una notificación de error con un mensaje específico.
* Obtiene el elemento de notificación y el span para el mensaje por sus IDs.
* Establece el texto del mensaje, muestra la notificación y cambia su color de fondo a rojo.
* Después de 3 segundos, llama a closeError para ocultar la notificación.
*/
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

/*
* funcion showSuccess: Muestra una notificación de éxito con un mensaje específico.
* Obtiene el elemento de notificación y el span para el mensaje por sus IDs.
* Establece el texto del mensaje, muestra la notificación y cambia su color de fondo a verde.
* Después de 3 segundos, llama a closeError para ocultar la notificación.
*/
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
