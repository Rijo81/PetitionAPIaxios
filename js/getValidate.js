const resultOut = document.getElementById("result");


let texto = "Hola Mundo";

//resultOut.innerHTML = texto;

const btnCedula = document.getElementById("cedula-form");
//const $fragment = document.createDocumentFragment();
btnCedula.addEventListener("submit", e =>{
    e.preventDefault();

    const cedula = document.getElementById("cedula").value;
    console.log(cedula);
    if (cedula.trim() === "" || cedula.length !== 11) {
        resultOut.innerHTML = "Ingrese un numero de cedula valido";
        return;
    }
        axios.get(`https://api.digital.gob.do/v3/cedulas/${cedula}/validate`, 
            {
                headers: {
                    'accept': 'application/json'
                }
            })
            .then(resp => {
                console.log(resp.data);

                if (resp.data.valid) {
                    console.log("La cédula es válida.");
                    resultOut.innerHTML = "La cédula es válida.";
                } else {
                    console.log("La cédula NO es válida.");
                    resultOut.innerHTML = "La cédula no es válida.";
                }
            })
            .catch(err => {

                let message = err.response.statusText || "Ocurrio un error";
                resultOut.innerText = `Error ${err.response.status}: ${message}`;
            });
});