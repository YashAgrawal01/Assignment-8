/*eslint-env browser*/

'use strict';

var emptyList;
var $ = function (id) {
        return document.getElementById(id);
};

window.addEventListener('load', initialize);

function initialize() {
    emptyList = [
        {name: "Sally Smith", title: "Quality Assurance", extension: 3423},
        {name: "Mark Martin", title: "VP Sales", extension: 3346},
        {name: "John Johnson", title: "Marketing", extension: 3232},
        {name: "Steven Jones", title: "Consultant", extension: 3489},
        {name: "Olivia Clarke", title: "Accountant", extension: 3539},];

    loadEmployees();
    var addButton = $('addEmployeeBtn');
    addButton.addEventListener('click', addEmployee);
}

function loadEmployees() {
    var table = $('employeesTable');
    var tbody = table.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';

    for (var i = 0; i < emptyList.length; i++) {
        var row = document.createElement('tr');

        row.insertCell(0).innerHTML = emptyList[i].name;
        row.insertCell(1).innerHTML = emptyList[i].title;
        row.insertCell(2).innerHTML = emptyList[i].extension;

        var deleteButton = document.createElement('button');
        deleteButton.setAttribute('id', emptyList[i].extension);
        deleteButton.innerHTML = "Delete";
        deleteButton.addEventListener('click', function(e) {
            var extension = e.currentTarget.id;
            deleteEmployee(extension);
        });

        row.insertCell(3).append(deleteButton);
        tbody.append(row);
    }

    var count = $('employeeCount');
    count.innerHTML = emptyList.length;
}

function addEmployee(event) {
    event.preventDefault();

    var errorFlag = false;
    var form = event.currentTarget.closest('form');
    var name = form.querySelector('input[name="name"]');
    var title = form.querySelector('input[name="title"]');
    var extension = form.querySelector('input[name="extension"]');
    var inputRequired = [name, title, extension];

    for (var i = 0; i < inputRequired.length; i++) {
        if (inputRequired[i].value === '') {
            displayErrorMessage(inputRequired[i]);
            errorFlag = true;
        }
    }

    if (errorFlag) {
        return false;
    }
    emptyList.push({
        name: name.value,
        title: title.value,
        extension: extension.value
    });

    loadEmployees();
    resetForm(form);
}

function displayErrorMessage(element) {
    var error = element.parentNode.querySelector('.error');
    error.innerHTML = " * input required";
    error.classList.remove('hide');
}

function resetForm(form) {
    form.reset();
    var errorNodes = form.querySelectorAll('.error');
    for (var i = 0; i < errorNodes.length; i++) {
        errorNodes[i].classList.add('hide');
    }
}

function deleteEmployee(extension) {
    emptyList = emptyList.filter(function(employee) {
        return employee.extension != extension;
    });

    loadEmployees();
}