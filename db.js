async function connect() {
    if (global.connection)
        return global.connection.connect();

    const { Pool } = require('pg');
    const pool = new Pool({
        connectionString: 'postgres://postgres:2707@localhost:5432/db_challenge'
    });

    //apenas testando a conexão
    const client = await pool.connect();
    console.log("Criou pool de conexões no PostgreSQL!");

    const res = await client.query('SELECT NOW()');
    console.log(res.rows[0]);
    client.release();

    //guardando para usar sempre o mesmo
    global.connection = pool;
    return pool.connect();
}

// outra parte, relacionada a SELECT
async function selectStudents() {
    const client = await connect();
    const res = await client.query('SELECT * FROM students');
    return res.rows;
}

// CREATE
async function insertStudent(student) {
    const client = await connect();
    const sql = 'INSERT INTO students(class_id,student_name) VALUES ($1,$2);';
    const values = [student.class_id, student.student_name];
    return await client.query(sql, values);
}

// UPDATE
async function updateStudentClass(student_id, class_id) {
    const client = await connect();
    const sql = 'UPDATE students SET class_id=$2 WHERE student_id=$1';
    const values = [student_id, class_id];
    return await client.query(sql, values);
}

async function updateStudentName(student) {
    const client = await connect();
    const sql = 'UPDATE students SET student_name=$2 WHERE student_id=$1';
    const values = [student.student_id, student.student_name];
    return await client.query(sql, values);
}

// DELETE
async function deleteStudent(student_id) {
    const client = await connect();
    const sql = 'DELETE FROM students where student_id=$1;';
    return await client.query(sql, [student_id]);
}

async function selectClasses() {
    const client = await connect();
    const res = await client.query('SELECT * FROM classes');
    return res.rows;
}

module.exports = { selectStudents, insertStudent, updateStudentClass, updateStudentName, deleteStudent, selectClasses }
