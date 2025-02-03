function getAll(cb) {
    const url = 'https://675ccd73fe09df667f64befc.mockapi.io/api/productos/';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            cb(data);
        })
        .catch(error => console.error('Error al obtener los productos:', error));
}

