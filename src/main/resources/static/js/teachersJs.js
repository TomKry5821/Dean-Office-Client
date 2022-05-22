const TEACHERS_URL = "http://localhost:8080/take/deanoffice/teachers";

function getAllTeachers(){
    const request = $.ajax({
        url: TEACHERS_URL,
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
                '<th scope="col">Remove</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>';
        $.each(data, function (id, element){
            result += createTeacherRow(element);
        })
        result += '</tbody></table>';
        $('#data').append(result);
    })
    request.fail(function (xhr, textStatus){
        alert(textStatus);
    })
}

function createTeacherRow(teacher){
    let result;
    result = '<tr>' +
        '<th scope="row">' + teacher.id + '</th>' +
        '<td><input id="' + teacher.id + '-name" type="text" value="' + teacher.name + '"></td>' +
        '<td><input id="' + teacher.id + '-surname" type="text" value="' + teacher.surname + '"></td>' +
        '<td><button class="btn btn-sm btn-danger rounded-3" onclick="removeTeacher(' + teacher.id + ')">remove teacher</button></td>' +
        '<td><button class="btn btn-sm btn-info rounded-3" onclick="modifyTeacher(' + teacher.id + ')">update info</button></td>' +
    '</tr>'
    return result;
}

function removeTeacher(teacherId){
    const request = $.ajax({
        url: TEACHERS_URL + "/" + teacherId,
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

function modifyTeacher(teacherId){
    let name = document.getElementById(teacherId.toString() + "-name").value;
    let surname = document.getElementById(teacherId.toString() + "-surname").value;

    const request = $.ajax({
        url: TEACHERS_URL,
        type: 'PUT',
        crossOrigin: true,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            "id": teacherId,
            "name": name,
            "surname": surname,
            "subjects": []
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

function generateNewTeacherForm(){
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
    '</form>' +
    '<button class="btn btn-primary" onclick="addNewTeacher()">Add Teacher</button>' +
    '</div>'
    $('#data').append(result);
}

function addNewTeacher(){
    let name = document.getElementById("name").value;
    let surname = document.getElementById("surname").value;

    if(surname === "" || name === ""){
        alert("Missing credentials");
        return;
    }

    const request = $.ajax({
        url: TEACHERS_URL,
        type: 'POST',
        crossOrigin: true,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            "name": name,
            "surname": surname,
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