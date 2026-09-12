function renderizarTabla() {
    const tabla = document.getElementById("tablaEstudiantes");
    const estudiantes = obtenerEstudiantes();

    tabla.innerHTML = "";

    if (estudiantes.length === 0) {
        tabla.innerHTML = `
            <tr>
                <td colspan="4" class="empty-table">No hay estudiantes registrados</td>
            </tr>
        `;
        return;
    }

    estudiantes.forEach(function (estudiante) {
        const fila = document.createElement("tr");

        const claseBadge = estudiante.estado === "Aprobado" ? "aprobado" : "reprobado";

        fila.innerHTML = `
            <td>${estudiante.nombre}</td>
            <td>${estudiante.apellido}</td>
            <td>${estudiante.primeraNota}</td>
            <td>${estudiante.segundaNota}</td>
            <td>${estudiante.terceraNota}</td>
            <td>${estudiante.promedio}</td>
            <td><span class="${claseBadge}">${estudiante.estado}</span></td>
        `;

        tabla.appendChild(fila);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formEstudiante")

    renderizarTabla();

    formulario.addEventListener("submit", function(evento){
        evento.preventDefault()

        const nombre = document.getElementById("nombre").value
        const apellido = document.getElementById("apellido").value
        const primeraNota = document.getElementById("primeraNota").valueAsNumber
        const segundaNota = document.getElementById("segundaNota").valueAsNumber
        const terceraNota = document.getElementById("terceraNota").valueAsNumber

        let estado = "Por definir"

        const promedio = (primeraNota*0.3) + (segundaNota*0.4) + (terceraNota*0.3)


        if (!nombre || !apellido || !primeraNota || !segundaNota || !terceraNota){
            return;
        }
        if (primeraNota < 1 || primeraNota > 7){
            return
        }
        if (segundaNota < 1 || segundaNota > 7){
            return
        }
        if (terceraNota < 1 || terceraNota > 7){
            return
        }
        if (promedio < 4){
            estado = "Reprobado"
        }else{
            estado = "Aprobado"
        }

        const nuevoEstudiante = {
            id: crypto.randomUUID(),
            nombre: nombre,
            apellido: apellido,
            primeraNota: primeraNota,
            segundaNota: segundaNota,
            terceraNota, terceraNota,
            promedio: promedio.toFixed(1),
            estado: estado
        }

        agregarEstudiante(nuevoEstudiante);
        renderizarTabla();
        formulario.reset();

    })
    
})