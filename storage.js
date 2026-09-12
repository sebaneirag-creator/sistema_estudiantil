const CLAVE_ESTUDIANTES = "estudiantes"
function obtenerEstudiantes(){
    const datos = localStorage.getItem(CLAVE_ESTUDIANTES);
    if (datos === null) return [];
    return JSON.parse(datos);
}

function guardarEstudiantes(estudiantes){
    const estudiantesJSON = JSON.stringify(estudiantes);
    localStorage.setItem(CLAVE_ESTUDIANTES, estudiantesJSON);
}

function agregarEstudiante(estudiante){
    const estudiantes = obtenerEstudiantes();
    estudiantes.push(estudiante);
    guardarEstudiantes(estudiantes);
}
