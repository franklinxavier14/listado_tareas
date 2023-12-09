const tareas = [
    { id: 1, Tarea: "Descargar material de desafío", checkbox: false },
    { id: 2, Tarea: "Estudiar material", checkbox: false },
    { id: 3, Tarea: "Empezar a programar desafío", checkbox: false }
  ];
  
  const listaDeTareasContainer = document.querySelector(".container2");
  const nuevaTareaInput = document.querySelector("#nuevaTarea");
  const formulario = document.querySelector("form");
  const btnAgregar = document.querySelector("#agregarTarea");
  
  btnAgregar.addEventListener("click", agregarTarea);
  formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    agregarTarea();
  });
  
  //CONTADOR DE TAREAS 

  const contadorTemplate = `
    <article>
      <table class="contador">
        <tbody>
          <tr>
            <td class="align-baseline trtotal fw-bold">Total:</td>
            <td class="align-baseline sumatotal">  </td>
          </tr>
          <tr>
            <td class="align-baseline trrealizadas fw-bold">Realizadas:</td>
            <td class="align-baseline totalrealizadas">  </td>
          </tr>
        </tbody>
      </table>
    </article>
  `;
  
  console.log(tareas);
  actualizarInterfaz();
  actualizarContadorTareas();
  
  function obtenerProximoId() {
    const ultimaTarea = tareas[tareas.length - 1];
    return ultimaTarea ? ultimaTarea.id + 1 : 1;
  }
  
  function agregarTarea() {
    const nuevaTareaTexto = nuevaTareaInput.value.trim();
  
    if (nuevaTareaTexto !== "") {
      const nuevaTarea = {
        id: obtenerProximoId(),
        Tarea: nuevaTareaTexto,
        checkbox: false
      };
  
      tareas.push(nuevaTarea);
  
      const templateNuevaTarea = `
        <ul class="list-group col-5">
          <li class="list-group-item d-flex align-items-center ps-0">
            <div>
              <label class="form-check-label ms-3 me-4" id="label_${nuevaTarea.id}">${nuevaTarea.id}</label>
              <label class="form-check-label tarea-label" id="tarea_${nuevaTarea.id}" style="font-style: ${nuevaTarea.checkbox ? 'italic' : 'normal'}">${nuevaTareaTexto}</label>
            </div>
            <div class="ms-auto">
              <input class="form-check-input me-1" type="checkbox" value="" id="checkbox_${nuevaTarea.id}" onchange="marcarTarea(${nuevaTarea.id})"/>
              <button type="button" class="btn btn-danger btn-sm ms-5" onclick="eliminarTarea(${nuevaTarea.id})">
                Eliminar
              </button>
            </div>
          </li>
        </ul>
      `;
  
      listaDeTareasContainer.insertAdjacentHTML("beforeend", templateNuevaTarea);
      nuevaTareaInput.value = "";
  
        
  
      console.log(tareas);
      actualizarContadorTareas();
    }
  }
  
  function marcarTarea(id) {
    const checkbox = document.getElementById(`checkbox_${id}`);
    const tareaLabel = document.getElementById(`tarea_${id}`);
  
    const tareaIndex = tareas.findIndex(tarea => tarea.id === id);
  
    if (tareaIndex !== -1) {
      const tareaActual = tareas[tareaIndex];
      tareaActual.checkbox = checkbox.checked;
  
      tareaLabel.classList.toggle("cursiva", checkbox.checked);
  
      console.log(tareas);
      actualizarContadorTareas();

    }
  }
  
  function eliminarTarea(id) {
    const indice = tareas.findIndex(tarea => tarea.id === id);
  
    if (indice !== -1) {
    //   console.log("Eliminando tarea con ID:", id);
      tareas.splice(indice, 1);
  
  
      actualizarInterfaz();
      actualizarContadorTareas();
  
      console.log(tareas);
    }
  }
  
  function actualizarInterfaz() {
    // console.log("Actualizando la interfaz...");
    let htmlTareas = "";
  
    tareas.forEach(tarea => {
      const templateTarea = `
        <ul class="list-group col-10">
          <li class="list-group-item d-flex align-items-center ps-0">
            <div>
              <label class="form-check-label ms-3 me-4" id="label_${tarea.id}">${tarea.id}</label>
              <label class="form-check-label tarea-label" id="tarea_${tarea.id}" style="font-style: ${tarea.checkbox ? 'italic' : 'normal'}">${tarea.Tarea}</label>
            </div>
            <div class="ms-auto">
              <input class="form-check-input me-1" type="checkbox" value="" id="checkbox_${tarea.id}" onchange="marcarTarea(${tarea.id})" ${tarea.checkbox ? 'checked' : ''}/>
              <button type="button" class="btn btn-danger btn-sm ms-5" onclick="eliminarTarea(${tarea.id})">
                Eliminar
              </button>
            </div>
          </li>
        </ul>
      `;
      htmlTareas += templateTarea;
    });
  
    const htmlContador = contadorTemplate;
  

    listaDeTareasContainer.innerHTML = `
      <div class="row">
        <div class="col-6">${htmlTareas}</div>
        <div class="col-6">${htmlContador}</div>
      </div>
    `;
  }
  
  function actualizarContadorTareas() {
    const contadorTotal = document.querySelector(".sumatotal");
    const contadorRealizadas = document.querySelector(".totalrealizadas");
  
    contadorTotal.textContent = tareas.length.toString();
  
    const totalTareasRealizadas = tareas.filter(tarea => tarea.checkbox).length;
    contadorRealizadas.textContent = totalTareasRealizadas.toString();
  }
  