let pacientes = []

let formulario;
let inputNombre;
let inputSexo;
let inputEdad;
let inputPeso;
let inputAltura;
let inputIMC;
let tabla;

class Pacientes {
    constructor(nombre, sexo, edad, peso, altura, imc) {
        this.name = nombre;
        this.sex = sexo;
        this.age = edad;
        this.weight = peso;
        this.height = altura;
        this.imc = Math.round(peso / (altura ** 2))

    }
}

function inicializarElementos() {
    formulario = document.getElementById("formulario")
    inputNombre = document.getElementById("inputNombre")
    inputSexo = document.getElementById("inputSexo")
    inputEdad = document.getElementById("inputEdad")
    inputPeso = document.getElementById("inputPeso")
    inputAltura = document.getElementById("inputAltura")
    tabla = document.getElementById("tablaPacientes")

}

function inicializarEventos() {
    formulario.onsubmit = (event) => validarFormulario(event)
}

function validarFormulario(event) {
    event.preventDefault();
    let nombre = inputNombre.value;
    let sexo = inputSexo.value;
    let edad = inputEdad.value;
    let peso = inputPeso.value;
    let altura = inputAltura.value;

    let paciente = new Pacientes(nombre, sexo, edad, peso, altura)

    pacientes.push(paciente)

    formulario.reset();
    limpiarTabla();
    agregarPacientesTabla();
    almacenarPacientesLocalStorage();



}



function agregarPacientesTabla() {
    pacientes.forEach((paciente) => {
        let filaTabla = document.createElement("tr");
        filaTabla.innerHTML = `
        <td>${paciente.name}</td>
        <td>${paciente.sex}</td>
        <td>${paciente.age}</td>
        <td>${paciente.height}</td>
        <td>${paciente.weight}</td>
        <td>${paciente.imc}</td>`;

        tabla.tBodies[0].append(filaTabla);


        if (paciente.imc <= 18.4) {
            Swal.fire({
                icon: 'info',
                title: 'Indice de Masa Corporal',
                text: `Estas muy bajo de peso`,
            })
        }
        else if (paciente.imc >= 18.5 && paciente.imc <= 24.9) {
            Swal.fire({
                icon: 'info',
                title: 'Indice de Masa Corporal',
                text: `¡Estas en peso optimo!`,
            })
        }
        else if (paciente.imc >= 30) {
            Swal.fire({
                icon: 'info',
                title: 'Indice de Masa Corporal',
                text: `¡Estas OBESO!`,
            })
        }

    })
}





function limpiarTabla() {
    while (tabla.rows.length > 1) {
        tabla.deleteRow(1)
    }
}

function almacenarPacientesLocalStorage() {
    localStorage.setItem("listaPacientes", JSON.stringify(pacientes))

    let boton = document.getElementById("btnClean")
    boton.addEventListener("click", respuestaClick)
    function respuestaClick() {
        localStorage.clear();
       
    }


}

function obtenerPacientesLocalStorage() {
    let pacientesAlmacenados = localStorage.getItem("listaPacientes")
    if (pacientesAlmacenados !== null) {
        pacientes = JSON.parse(pacientesAlmacenados)
    }
}

function main() {
    inicializarElementos()
    inicializarEventos()
    obtenerPacientesLocalStorage()
    agregarPacientesTabla();


}

main()





let boton = document.getElementById("btnClean")
boton.addEventListener("click", respuestaClick)
function respuestaClick() {
    localStorage.clear();
    location.reload();
}





function registrarPaciente(paciente) {
    fetch("https://62e87a29249bb1284eaf103a.mockapi.io//Pacientes", {
        mothod: "POST",
        body: JSON.stringify(producto),
        headers: {
            "Content-type": "application/json"
        }
    })
        .then((response) => response.json())
        .then((data) => console.log(data));
}

const pacienteARegistrar = {
    "Nombre": "Esteban",
    "Edad": 45,
    "Altura": 178,
    "Peso": 75,
};

registrarPaciente(pacienteARegistrar)