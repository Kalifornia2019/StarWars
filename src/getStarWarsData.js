export function sendRequest(url) {
    const request = fetch(url);
    return request
        .then(response => {
            return response.json()
        })
        .catch(e => {
            console.error(`Something is bad ---> ${e}`)
        });
}

export function getDataStarWars(dataContainer, pages) {
    sendRequest(`https://swapi.dev/api/planets/?page=${pages}`)
        .then(({ results }) => {
            console.log(results);
            results
                .map(({ name, residents }) => {
                    const planetName = name;
                    const resident = Promise
                        .all(residents.map(url => sendRequest(url)))
                        .then(residentsList => {
                            console.log(residentsList);
                            residentsList.forEach(({ name, species }) => {
                                const residentName = name;
                                if (species.length) {
                                    sendRequest(species)
                                        .then((speciesItem) => {
                                            const speciesName = speciesItem.name;

                                            const ulFilmDataList = document.createElement('tr');
                                            dataContainer.appendChild(ulFilmDataList);

                                            createCell(planetName, ulFilmDataList);
                                            createCell(residentName, ulFilmDataList);
                                            createCell(speciesName, ulFilmDataList);
                                        });
                                }
                            })
                        });
                })
        })
        .catch((e) => {
            console.error(`Error ---> ${e}`)
        });
}

function createCell(text, tr) {
    let td = document.createElement('td');
    td.innerHTML = text;
    tr.appendChild(td);
}