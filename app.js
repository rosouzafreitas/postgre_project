const express = require('express');
const app = express();
const cors = require('cors');
//const fs = require('fs');

const db = require("./db.js");
let students;

async function fetchStudents () {
    const db = require("./db");
    students = await db.selectStudents();
    console.log(students);
};

//index.js
async function postStudent (_class_id, _student_name) {
    const db = require("./db");
    const result = await db.insertStudent({ class_id: _class_id, student_name: _student_name});
    console.log(result.rowCount);

    fetchStudents();
};

async function deleteStudent (_student_id) {
    const db = require("./db");
    const result = await db.deleteStudent(_student_id);
    console.log(result.rowCount);

    fetchStudents();
};

async function updateStudentClass (_student_id, _class_id) {
    const db = require("./db");
    const result = await db.updateStudentClass(_student_id, _class_id);
    console.log(result);
    fetchStudents();
};

async function updateStudentName (_student_id, _student_name) {
    const db = require("./db");
    const result = await db.updateStudentName({student_id: _student_id, student_name: _student_name});
    console.log(result);
    fetchStudents();
};

/*
console.log('UPDATE STUDENTS');
const result2 = await db.updateStudent(1, { class_id: 1, student_name: "Layssa Lima" });
console.log(result2.rowCount);

console.log('DELETE FROM CLIENTES');
const result3 = await db.deleteStudent(1);
console.log(result3.rowCount);

module.exports = { selectCustomers, insertCustomer, updateCustomer, deleteCustomer }

//TUTORIAL



*/

app.use(express.json());
var corsOptions = {
    origin: 'https://localhost:8080/',
    optionsSuccessStatus: 200
};
app.use(cors());

app.get('/', function (req, res) {
    app.use(express.static('public'))
    res.redirect('/index.html')
    return false
});

// const database = fs.readFileSync('database.json', 'utf8');
// let students = JSON.parse(database);

app.route("/students")
    .get(function (req, res) {
        fetchStudents();
        const id = req.query.id;
        const _class = req.query.class;
        const name = req.query.name;
        let tempArray = []
        for (i = 0; i < students.length; i++) {
            if (id == students[i].student_id) {
                tempArray.push(students[i])
            }
            if (_class == students[i].class_id) {
                tempArray.push(students[i])
            }
            if (students[i].student_name.includes(name)) {
                tempArray.push(students[i])
            }
        };
        if (tempArray.length > 0) {
            tempArray.sort(function (a, b) {
                return a.id - b.id || a.student_name.localeCompare(b.student_name);
            });
            res.json(tempArray)
        } else {
            res.json(students);
        }
    })

    .post(function (req, res) {
        const _class = parseInt(req.body.class, 10);
        const name = req.body.name;

        postStudent(_class, name)

        res.json(students)
    })

app.get("/students/all", (req, res) => {
    fetchStudents();
    res.json(students)
})

// app.get("/students/:studentID", (req, res) => {
//     const id = req.params.studentID;
//     let tempArray = []
//     for (i = 0; i < students.length; i++) {
//         if (id == students[i].id) {
//             tempArray.push(students[i])
//             console.log(tempArray)
//         }
//     }
//     tempArray.sort(function (a, b) {
//         return a.id - b.id || a.name.localeCompare(b.name);
//     });
//     res.json(tempArray)
// })

app.delete("/students/:studentID", (req, res) => {
    const student_id = parseInt(req.params.studentID, 10);
    let isFound = false;

    for (i = 0; i < students.length; i++) {
        if (student_id == students[i].student_id) {
            isFound = true;
            deleteStudent(student_id)
        }
    }

    res.json(students)
    return isFound
})

app.put("/students/:studentID", (req, res) => {
    const id = parseInt(req.params.studentID, 10);
    const _class = parseInt(req.body.class, 10);
    const name = req.body.name;
    let isFound = false;

    for (i = 0; i < students.length; i++) {
        if (id == students[i].student_id) {
            isFound = true;
            if (_class) updateStudentClass({student_id: id, class_id: _class});
            //if (name) updateStudentName({student_id: id, student_name: name});
        }
    }

    res.json(students)
    return isFound
})

const hostname = "localhost";
const port = 8080;

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
});