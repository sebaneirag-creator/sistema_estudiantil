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
        const promedio = document.getElementById("promedio").valueAsNumber

        let estado = "Por definir"


        if (!nombre || !apellido || !promedio){
            return;
        }
        if (promedio < 1 || promedio > 7){
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
            promedio: promedio,
            estado: estado
        }

        agregarEstudiante(nuevoEstudiante);
        renderizarTabla();
        formulario.reset();

    })
    
})