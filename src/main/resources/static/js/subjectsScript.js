const SUBJECTS_URL = "http://localhost:8080/take/deanoffice/subjects";
const GRADES_URL = "http://localhost:8080/take/deanoffice/grades";


function getAllSubjects(){
    const request = $.ajax({
        url: SUBJECTS_URL,
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
            '<th scope="col">Code</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>';
        $.each(data, function (id, element){
            result += createSubjectRow(element);
        })
        result += '</tbody></table>';
        $('#data').append(result);
    })
    request.fail(function (xhr, textStatus){
        alert(textStatus);
    })
}

function createSubjectRow(subject){
    let result;
    result = '<tr>' +
        '<th scope="row">' + subject.id + '</th>' +
        '<td><input id="' + subject.id + '-name" type="text" value="' + subject.name + '"></td>' +
        '<td><input id="' + subject.id + '-code" type="text" value="' + subject.code + '"></td>' +
        '<td><button class="btn btn-sm btn-danger rounded-3" onclick="removeSubject(' + subject.id + ')">remove subject</button></td>' +
        '<td><button class="btn btn-sm btn-info rounded-3" onclick="modifySubject(' + subject.id + ')">update info</button></td>' +
        '</tr>'
    return result;
}

function removeSubject(subjectId){
    const request = $.ajax({
        url: SUBJECTS_URL + "/" + subjectId,
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

function modifySubject(subjectId){
    let name = document.getElementById(subjectId.toString() + "-name").value;
    let code = document.getElementById(subjectId.toString() + "-code").value;

    const request = $.ajax({
        url: SUBJECTS_URL,
        type: 'PUT',
        crossOrigin: true,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            "id": subjectId,
            "name": name,
            "code": code,
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

function generateNewSubjectForm(){
    document.getElementById("data").innerHTML = "";
    let result;
    result = '<div align="center">' +
        '<form>' +
        '<div class="mb-3">' +
        '<label class="form-label">Name</label>' +
        '<input type="text" class="form-control" id="name">' +
        '</div>' +
        '<div class="mb-3">' +
        '<label class="form-label">Code</label>' +
        '<input type="text" class="form-control" id="code">' +
        '</div>' +
        '</form>' +
        '<button class="btn btn-primary" onclick="addNewSubject()">Add subject</button>' +
        '</div>'
    $('#data').append(result);
}

function addNewSubject(){
    let name = document.getElementById("name").value;
    let code = document.getElementById("code").value;

    if(name === "" || code === ""){
        alert("Missing name or code");
        return;
    }

    const request = $.ajax({
        url: SUBJECTS_URL,
        type: 'POST',
        crossOrigin: true,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            "name": name,
            "code": code,
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

function generateGetSubjectsTaughtByTeacherForm(){
    document.getElementById("data").innerHTML = "";
    let result;
    result = '<div align="center">' +
        '<form>' +
        '<div class="mb-3">' +
        '<label class="form-label">Teacher id</label>' +
        '<input type="number" min="1" class="form-control" id="teacherId">' +
        '</div>' +
        '</form>' +
        '<button class="btn btn-primary" onclick="getSubjectTaughtByTeacher()">Get subjects</button>' +
        '</div>'
    $('#data').append(result);
}

function getSubjectTaughtByTeacher(){
    let teacherId = document.getElementById("teacherId").value;

    const request = $.ajax({
        url: SUBJECTS_URL + "/subjectsTeachedByTeacher/" + teacherId,
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
            '<th scope="col">Code</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>';
        $.each(data, function (id, element){
            result += createSubjectRow(element);
        })
        result += '</tbody></table>';
        $('#data').append(result);
    })
    request.fail(function (xhr, textStatus){
        alert(textStatus);
    })
}

function generateGetGradesAverageFromSubjectsForm(){
    document.getElementById("data").innerHTML = "";
    let result;
    result = '<div align="center">' +
        '<form>' +
        '<div class="mb-3">' +
        '<label class="form-label">Subject id</label>' +
        '<input type="number" min="1" class="form-control" id="subjectId">' +
        '</div>' +
        '</form>' +
        '<button class="btn btn-primary" onclick="getGradesAverage()">Get grades average</button>' +
        '</div>'
    $('#data').append(result);
}
 function getGradesAverage(){
    let subjectId = document.getElementById("subjectId").value;

     const request = $.ajax({
         url: GRADES_URL + "/getGradesAverageFromSubject/" + subjectId,
         type: 'GET',
         dataType: 'json'
     })
     request.done(function(data){
         let result;
         document.getElementById("data").innerHTML = "";
         result = '<h3 align="center"></br>Grades average - '
                    + data +
                   '</h3>';
         $('#data').append(result);
     })
     request.fail(function (xhr, textStatus){
         alert(textStatus);
     })

 }
