const TEACHERS_URL = "http://localhost:8080/take/deanoffice/teachers";

function getAllTeachers(){
    const request = $.ajax({
        url: TEACHERS_URL,
        type: 'GET',
        dataType: 'json'
    })
    request.done(function(data){
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

function createTeacherRow(element){
    result = '<tr>' +
        '<th scope="row">' + element.id + '</th>' +
        '<td>' + element.name + '</td>' +
        '<td>' + element.surname + '</td>' +
        '<td><button class="btn btn-sm btn-danger rounded-3" onclick="removeTeacher(' + element.id + ')">remove teacher</button></td>' +
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
    request.fail(function (xhr, textStatus){
        alert(xhr.responseText);
    })
}