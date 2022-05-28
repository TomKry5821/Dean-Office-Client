const STUDENTS_URL = "http://localhost:8080/take/deanoffice/students";

function getAllStudents(){
    const request = $.ajax({
        url: STUDENTS_URL,
        type: 'GET',
        dataType: 'json'
    })
    request.done(function(data){
        let result;
        document.getElementById("data").innerHTML = "";
        result = '<table class="table table-borderless table-striped">' +
            '<thead>' +
            '<tr>' +
            '<th scope="col">#</th>' +
            '<th scope="col">Name</th>' +
            '<th scope="col">Surname</th>' +
            '<th scope="col">Birth date</th>' +
            '<th scope="col">Remove</th>' +
            '<th scope="col">Update</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>';
        $.each(data, function (id, element){
            result += createStudentRow(element);
        })
        result += '</tbody></table>';
        $('#data').append(result);
    })
    request.fail(function (xhr, textStatus){
        alert(textStatus);
    })
}

function createStudentRow(student){
    let result;
    result = '<tr>' +
        '<th scope="row">' + student.id + '</th>' +
        '<td><input id="' + student.id + '-name" type="text" value="' + student.name + '"></td>' +
        '<td><input id="' + student.id + '-surname" type="text" value="' + student.surname + '"></td>' +
        '<td> <input id="' + student.id + '-birthDate" type="text" value="' + student.birthDate.toString() + '"</td>' +
        '<td><button class="btn btn-sm btn-danger rounded-3" onclick="removeStudent(' + student.id + ')">remove student</button></td>' +
        '<td><button class="btn btn-sm btn-info rounded-3" onclick="modifyStudent(' + student.id + ')">update info</button></td>' +
        '</tr>'
    return result;
}

function removeStudent(studentId){
    const request = $.ajax({
        url: STUDENTS_URL + "/" + studentId,
        type: 'DELETE',
        crossOrigin: true
    })
    request.done(function (message){
        alert(message.responseText);
        window.location.reload();
    })
    request.fail(function (xhr){
        alert(xhr.responseText);
    })
}

function modifyStudent(studentId){
    let name = document.getElementById(studentId.toString() + "-name").value;
    let surname = document.getElementById(studentId.toString() + "-surname").value;
    let birthDate = document.getElementById(studentId.toString() + "-birthDate").value;

    const request = $.ajax({
        url: STUDENTS_URL,
        type: 'PUT',
        crossOrigin: true,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            "id": studentId,
            "name": name,
            "surname": surname,
            "birthDate": birthDate,
            "grades": []
        })
    })
    request.done(function(message){
        alert(message.responseText);
        window.location.reload();
    })
    request.fail(function(xhr){
        alert(xhr.responseText);
    })
}

function generateNewStudentForm(){
    document.getElementById("data").innerHTML = "";
    let result;
    result = '<div align="center">' +
        '<form>' +
        '<div class="mb-3">' +
        '<label class="form-label">Name</label>' +
        '<input type="text" class="form-control" id="name">' +
        '</div>' +
        '<div class="mb-3">' +
        '<label class="form-label">Surname</label>' +
        '<input type="text" class="form-control" id="surname">' +
        '</div>' +
        '<div class="mb-3">' +
        '<label class="form-label">Birth date</label>' +
        '<input type="date" class="form-control" id="birthDate">' +
        '</div>' +
        '</form>' +
        '<button class="btn btn-primary" onclick="addNewStudent()">Add student</button>' +
        '</div>'
    $('#data').append(result);
}

function addNewStudent(){
    let name = document.getElementById("name").value;
    let surname = document.getElementById("surname").value;
    let birthDate = document.getElementById("birthDate").value;

    if(surname === "" || name === "" || birthDate === ""){
        alert("Missing credentials");
        return;
    }

    const request = $.ajax({
        url: STUDENTS_URL,
        type: 'POST',
        crossOrigin: true,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            "name": name,
            "surname": surname,
            "birthDate": birthDate,
            "grades": []

        })
    })
    request.done(function(message){
        alert(message.responseText);
        window.location.reload();
    })
    request.fail(function(xhr){
        alert(xhr.responseText);
    })
}

function generateGetStudentsGradesFromSubjectForm(){
    document.getElementById("data").innerHTML = "";
    let result;
    result = '<div align="center">' +
        '<form>' +
        '<div class="mb-3">' +
        '<label class="form-label">Student id</label>' +
        '<input type="text" class="form-control" id="studentId">' +
        '</div>' +
        '<div class="mb-3">' +
        '<label class="form-label">Subject id</label>' +
        '<input type="text" class="form-control" id="subjectId">' +
        '</div>' +
        '</form>' +
        '<button class="btn btn-primary" onclick="getStudentsGradesFromSubject()">Get student grades</button>' +
        '</div>'
    $('#data').append(result);
}

function getStudentsGradesFromSubject(){
    let studentId = document.getElementById("studentId").value;
    let subjectId = document.getElementById("subjectId").value;

    const request = $.ajax({
        url: STUDENTS_URL + "/grades/" + subjectId,
        type: 'GET',
        dataType: 'json',
        headers: {"studentId": studentId}
    })
    request.done(function(data){
        let result;
        document.getElementById("data").innerHTML = "";
        result = '<table class="table table-borderless table-striped">' +
            '<thead>' +
            '<tr>' +
            '<th scope="col">Grade</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>';
        $.each(data, function (id, element){
            result += createGradeRow(element);
        })
        result += '</tbody></table>';
        $('#data').append(result);
    })
    request.fail(function (xhr, textStatus){
        alert(textStatus);
    })
}

function generateGetStudentsGradesAverageForm(){
    document.getElementById("data").innerHTML = "";
    let result;
    result = '<div align="center">' +
        '<form>' +
        '<div class="mb-3">' +
        '<label class="form-label">Student id</label>' +
        '<input type="text" class="form-control" id="studentId">' +
        '</div>' +
        '</form>' +
        '<button class="btn btn-primary" onclick="getStudentsGradesAverage()">Get student grades average</button>' +
        '</div>'
    $('#data').append(result);
}

function getStudentsGradesAverage(){
    let studentId = document.getElementById("studentId").value;

    const request = $.ajax({
        url: STUDENTS_URL + "/studentGradesAverage",
        type: 'GET',
        dataType: 'json',
        headers: {"studentId": studentId}
    })
    request.done(function(data){
        let result;
        document.getElementById("data").innerHTML = "";
        result = '<table class="table table-borderless table-striped">' +
            '<thead>' +
            '<tr>' +
            '<th scope="col">Grades average</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>';
            result += createGradeRow(data);
        result += '</tbody></table>';
        $('#data').append(result);
    })
    request.fail(function (xhr, textStatus){
        alert(textStatus);
    })
}

function createGradeRow(element){
    let result;
    result = '<tr>' +
        '<th scope="row">' + element + '</th>' +
        '</tr>'
    return result;
}