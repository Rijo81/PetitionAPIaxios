const resultOut = document.getElementById("result"),
    resultValidar = document.getElementById("resultValid"),
    resultMeta = document.getElementById("resultMeta");
const $fragment = document.createDocumentFragment();


let texto = "Hola Mundo";

//resultOut.innerHTML = texto;
//resultValidar.innerHTML = texto;

const btnCedula = document.getElementById("fuel-form");
//const $fragment = document.createDocumentFragment();
btnCedula.addEventListener("submit", e =>{
    e.preventDefault();
    const fechaCalendar = document.getElementById("fecha").value;
    console.log(fechaCalendar);
        axios.get(`https://api.digital.gob.do/v1/fuels?date=${fechaCalendar}`, 
            {
                headers: {
                    'accept': 'application/json'
                }
            })
            .then(resp => {
                // console.log(resp.data);
                // console.log(resp.data.meta);
                // console.log(resp.data.valid);
                const metadata = resp.data.meta;
                resultMeta.innerHTML = `<b style="color:#AC6401">Semanas: ${metadata.week} ---- Año: ${metadata.year}</b>`;
                // console.log(resp.data.data);
                const valor = resp.data.data;
                if (resp.data.valid) {
                    resultValidar.innerHTML = `<b style="color:#03781C">Data de API correctos</b>`;

                    valor.forEach((el) => {
                        const $li = document.createElement("li");
                        $li.innerHTML = `<b style="color:#0609D9">${el.name} ---- ${el.code} -----  ${el.currency} -----  ${el.price}</b>`;
                        $fragment.appendChild($li);
                   });
                }
                
                resultOut.appendChild($fragment);
            })
            .catch(err => {

                //let message = err.resp.statusText || "Ocurrio un error";
                resultOut.innerText = `Error ${err}: Ocurrio un error`;
            });
});