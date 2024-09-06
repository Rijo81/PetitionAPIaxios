const apiUrl = 'https://api.digital.gob.do/v1/territories';

document.addEventListener("DOMContentLoaded", () => {
    getRegions();

    document.getElementById('regions').addEventListener('change', getProvinces);
    document.getElementById('provinces').addEventListener('change', getMunicipalities);
    document.getElementById('municipalities').addEventListener('change', getDistricts);
    document.getElementById('districts').addEventListener('change', getSections);
    document.getElementById('sections').addEventListener('change', getNeighborhood);
});

const getRegions = () =>{
    axios.get(`${apiUrl}/regions`)
        .then(resp => {
            const regionsData = resp.data.data;
            console.log(regionsData);
            const regionsSelect = document.getElementById('regions');
            regionsData.forEach((el) => {
                let option = document.createElement('option');
                option.value = el.code;    
                option.text = el.name;
                regionsSelect.appendChild(option);
            });
        })
        .catch((err) => {
            console.error('Error al cargar las regiones: ', err);
        });
}

const getProvinces = () => {
    const regionID = document.getElementById('regions').value,
        provincesSelect = document.getElementById('provinces');
    provincesSelect.innerHTML = '<option value="">Seleccione una provincia</option>';
    document.getElementById('provinces').disabled = false;
    console.log(regionID);
    if (regionID) {
        axios.get(`${apiUrl}/provinces?regionCode=${regionID}`)//?regionCode=${regionID}
            .then(resp => {
                const provinces = resp.data.data;
                provinces.forEach(el => {
                    let option = document.createElement('option');
                    option.value = el.code;    
                    option.text = el.name;
                    provincesSelect.appendChild(option);
                })
                console.log(resp.data.data);
            })
            .catch(err => {
                console.error('Error al cargar las provincias: ', err);
            })
    }else{
        document.getElementById('provinces').disabled = true;
    }

}

const getMunicipalities = () => {
    const provincesID = document.getElementById('provinces').value, regionID = document.getElementById('regions').value,
        municipalitiesSelect = document.getElementById('municipalities');
    municipalitiesSelect.innerHTML = '<option value="">Seleccione un Municipio</option>';
    document.getElementById('municipalities').disabled = false;
    console.log(provincesID);
    if (provincesID) {
        axios.get(`${apiUrl}/municipalities?provinceCode=${provincesID}&regionCode=${regionID}`)//&regionCode=${regionID}
            .then(resp => {
                const municipalities = resp.data.data;
                municipalities.forEach(el => {
                    let option = document.createElement('option');
                    option.value = el.code;    
                    option.text = el.name;
                    municipalitiesSelect.appendChild(option);
                })
                console.log(resp.data.data);
            })
            .catch(err => {
                console.error('Error al cargar los municipios: ', err);
            })
    }else{
        document.getElementById('municipalities').disabled = true;
    }

}

const getDistricts = () => {
    const municipalitiesID = document.getElementById('municipalities').value, 
        regionID = document.getElementById('regions').value,
        provincesID = document.getElementById('provinces').value,
        districtsSelect = document.getElementById('districts');
    districtsSelect.innerHTML = '<option value="">Seleccione un Distrito</option>';
    document.getElementById('districts').disabled = false;
    console.log(municipalitiesID);
    if (municipalitiesID) {
        axios.get(`${apiUrl}/districts?municipalityCode=${municipalitiesID}&?provinceCode=${provincesID}&regionCode=${regionID}`)//&regionCode=${regionID}
            .then(resp => {
                const districts = resp.data.data;
                districts.forEach(el => {
                    let option = document.createElement('option');
                    option.value = el.code;    
                    option.text = el.name;
                    districtsSelect.appendChild(option);
                })
                console.log(resp.data.data);
            })
            .catch(err => {
                console.error('Error al cargar los distritos: ', err);
            })
    }else{
        document.getElementById('districts').disabled = true;
    }

}

const getSections = () => {
    const municipalitiesID = document.getElementById('municipalities').value, 
        regionID = document.getElementById('regions').value,
        provincesID = document.getElementById('provinces').value,
        districtsID = document.getElementById('districts').value,
        sectionsSelect = document.getElementById('sections');
    sectionsSelect.innerHTML = '<option value="">Seleccione una Seccion</option>';
    document.getElementById('sections').disabled = false;
    console.log(districtsID);
    if (districtsID) {
        axios.get(`${apiUrl}/sections?districtCode=${districtsID}&municipalityCode=${municipalitiesID}&?provinceCode=${provincesID}&regionCode=${regionID}`)//&regionCode=${regionID}
            .then(resp => {
                const sections = resp.data.data;
                sections.forEach(el => {
                    let option = document.createElement('option');
                    option.value = el.code;    
                    option.text = el.name;
                    sectionsSelect.appendChild(option);
                })
                console.log(resp.data.data);
            })
            .catch(err => {
                console.error('Error al cargar las Secciones: ', err);
            })
    }else{
        document.getElementById('sections').disabled = true;
    }

}

const getNeighborhood = () => {
    const municipalitiesID = document.getElementById('municipalities').value, 
        regionID = document.getElementById('regions').value,
        provincesID = document.getElementById('provinces').value,
        districtsID = document.getElementById('districts').value,
        sectionsID = document.getElementById('sections').value,
        neighborhoodSelect = document.getElementById('neighborhood');
    neighborhoodSelect.innerHTML = '<option value="">Seleccione el Barrio</option>';
    document.getElementById('neighborhood').disabled = false;
    console.log(sectionsID);
    if (sectionsID) {
        axios.get(`${apiUrl}/neighborhoods?sectionCode=${sectionsID}?districtCode=${districtsID}&municipalityCode=${municipalitiesID}&?provinceCode=${provincesID}&regionCode=${regionID}`)
            .then(resp => {
                const neighborhood = resp.data.data;
                neighborhood.forEach(el => {
                    let option = document.createElement('option');
                    option.value = el.code;    
                    option.text = el.name;
                    neighborhoodSelect.appendChild(option);
                })
                console.log(resp.data.data);
            })
            .catch(err => {
                console.error('Error al cargar los Barrios: ', err);
            })
    }else{
        document.getElementById('neighborhood').disabled = true;
    }

}