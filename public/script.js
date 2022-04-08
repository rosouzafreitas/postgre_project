const resultsTable = document.getElementById('stored')

function eraseData() {
    while (resultsTable.hasChildNodes()) {
        resultsTable.removeChild(resultsTable.lastChild)
    }
}

function createTableHeader() {
    const tableHeader = document.createElement('tr')
    tableHeader.innerHTML = `<td>Student ID</td><td>Class ID</td><td>Student Name</td><td>Class Name</td>`
    resultsTable.appendChild(tableHeader)
}

function writeData() {
    fetch(`http://localhost:8080/students/all`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            eraseData();
            createTableHeader();
            for (i = 0; i < data.length; i++) {
                const newData = document.createElement('tr')
                newData.innerHTML = `<td>${data[i].student_id}</td><td>${data[i].class_id}</td><td>${data[i].student_name}</td>`
                if(data[i].class_id == 1) {
                    newData.innerHTML += `<td>ENIAC</td>`
                } else {
                    newData.innerHTML += `<td>LOVELACE</td>`
                }
                resultsTable.appendChild(newData)
            }
        })
        .catch(err => {
            console.log("Error on fetching data")
        })
}

function timeOutSearch() {
    let myTimeout = setTimeout(function fetchData() {

        const search_value = document.getElementById('search_value').value;
        const search_type = document.getElementById('search_type').value;

        if (search_value.length >= 3 || (search_type == "id" & search_value.length > 0)) {
            let fetchTimeout = setTimeout(function () {
                fetch(`http://localhost:8080/students?${search_type}=${search_value}`)
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        console.log(data)
                        eraseData();
                        createTableHeader();

                        for (i = 0; i < data.length; i++) {
                            let newData = document.createElement('tr')
                            newData.innerHTML = `<td>${data[i].student_id}</td><td>${data[i].class_id}</td><td>${data[i].student_name}</td>`
                            if(data[i].class_id == 1) {
                                newData.innerHTML += `<td>ENIAC</td>`
                            } else {
                                newData.innerHTML += `<td>LOVELACE</td>`
                            }
                            resultsTable.appendChild(newData)
                        }
                    })
                    .catch(err => {
                        console.log("Error on fetching data");
                        clearTimeout(fetchTimeout);
                    })
            }, 1975)

        }
        else {
            clearTimeout(myTimeout)
            writeData();
        }
    }, 25)
}

function postUser() {
    const new_class = document.getElementById('new_class').value
    const new_name = document.getElementById('new_name').value

    fetch('http://localhost:8080/students', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ class: new_class, name: new_name})
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data)
            eraseData();
            createTableHeader();
            for (i = 0; i < data.length; i++) {
                let newData = document.createElement('tr')
                newData.innerHTML = `<td>${data[i].student_id}</td><td>${data[i].class_id}</td><td>${data[i].student_name}</td>`
                if(data[i].class_id == 1) {
                    newData.innerHTML += `<td>ENIAC</td>`
                } else {
                    newData.innerHTML += `<td>LOVELACE</td>`
                }
                resultsTable.appendChild(newData)
            }
        })
        .catch(err => {
            console.log("Error on fetching data");
        })
}

function deleteUser() {
    const del_id = document.getElementById('del_id').value;

    fetch(`http://localhost:8080/students/${del_id}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'DELETE'
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data)
            eraseData();
            createTableHeader();
            for (i = 0; i < data.length; i++) {
                let newData = document.createElement('tr')
                newData.innerHTML = `<td>${data[i].student_id}</td><td>${data[i].class_id}</td><td>${data[i].student_name}</td>`
                if(data[i].class_id == 1) {
                    newData.innerHTML += `<td>ENIAC</td>`
                } else {
                    newData.innerHTML += `<td>LOVELACE</td>`
                }
                resultsTable.appendChild(newData)
            }
        })
        .catch(err => {
            console.log("Error on fetching data");
        })
}

function updateUser() {
    const updt_id = document.getElementById('updt_id').value;
    const updt_class = document.getElementById('updt_class').value
    const updt_name = document.getElementById('updt_name').value

    fetch(`http://localhost:8080/students/${updt_id}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify({ class: updt_class, name: updt_name })
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data)
            eraseData();
            createTableHeader();
            for (i = 0; i < data.length; i++) {
                let newData = document.createElement('tr')
                newData.innerHTML = `<td>${data[i].student_id}</td><td>${data[i].class_id}</td><td>${data[i].student_name}</td>`
                if(data[i].class_id == 1) {
                    newData.innerHTML += `<td>ENIAC</td>`
                } else {
                    newData.innerHTML += `<td>LOVELACE</td>`
                }
                resultsTable.appendChild(newData)
            }
        })
        .catch(err => {
            console.log("Error on fetching data");
        })
}