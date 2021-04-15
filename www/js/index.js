/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready

document.addEventListener('deviceready', onDeviceReady, false);

// Variables generales:
let body = document.getElementById("body");
let floatingBtn = document.getElementById("confirm-floating-btn");
let generalStatus = [false, false, false];

// Variables Dashboard:
let statusR = $("#statusR");   // Status Requeriments
let statusU = $("#statusU");   // Status UFs
let statusD = $("#statusD");   // Status Dades Personals

// Variables Requirements:
let dniAlumneAnvers = document.getElementById("dniAlumneAnvers").onclick = getPicture;
let dniAlumneRevers = document.getElementById("dniAlumneRevers").onclick = getPicture;
let sanitariaAlumne = document.getElementById("sanitariaAlumne").onclick = getPicture;
let dniRepresentantAnvers = document.getElementById("dniRepresentantAnvers").onclick = getPicture;
let dniRepresentantRevers = document.getElementById("dniRepresentantRevers").onclick = getPicture;
let monoparental = document.getElementById("monoparental").onclick = getPicture;
let familiaNumerosa = document.getElementById("familiaNombrosa").onclick = getPicture;

// Variables UFs:
let selectAll = document.getElementById("selectAllCheckboxes");
let saveUfs = document.getElementById("saveUfs");
let listUf = [];
let token = JSON.parse(localStorage.getItem("data"));

// Variables Dades personals:


// Funcion carga inicial:
async function onDeviceReady() {
	await processUfs();

    await getRequirementProfiles();
    disableAllButtons();
    
    $("#selectRequirementsProfile").on('change', function() {
        prepareProfile($(this).val());
    });

    setStatus(statusD, 2, 2);

    // Control de seleccion de checkboxes.
    selectAll.onclick = function() {
        if (selectAll.checked || selectAll.checked == "checked") {
            selectAllCheckbox();
        } else {
            unselectAllCheckbox();
        }
    };

    saveUfs.onclick = function () {
        listUf = getSelectedCheckbox();
        if (listUf.length > 0) {
            saveUfsList();
        } else {
            M.toast({html: 'Al menys, tens que seleccionar una UF.', displayLength: 2000, classes: 'rounded'});
            applyShakeEffect();
        }
    }
}

// Funciones Dashboard:
function setStatus(type, status, bool) {
    if (status == 0) {
        type.removeClass("orange-text");
        type.removeClass("green-text");
        type.addClass("red-text");
        
        generalStatus[bool] = false;
    } else if (status == 1) {
        type.removeClass("green-text");
        type.removeClass("red-text");
        type.addClass("orange-text");
        generalStatus[bool] = false;
    } else if (status == 2) {
        type.removeClass("orange-text");
        type.removeClass("red-text");
        type.addClass("green-text");
        generalStatus[bool] = true;
    }

    if (generalStatus[0] && generalStatus[1] &&generalStatus[2]) {
        applyPulseEffect();
    } else {
        removePulseEffect();
    }
}

// Funciones Requirements:
async function getRequirementProfiles() {
    let query = "/api/db/requirmentsprofile/read";

    $.ajax({
        method: "GET",
        url: "https://matriculat-ieti.herokuapp.com" + query,
        dataType: "json",
    }).done(function(options) {
        addOption("Perfil est\u00E0ndard");
        options.forEach(i => {
            addOption(i.profile_name);
        });
        $('select').formSelect();
    }).fail(function() {
        M.toast({html: "No s'ha pogut connectar amb la base de dades o la connexi\u00F3 ha fallat.", displayLength: 2000, classes: 'rounded'});
    });
}

function savePhoto(foto) {
    let query = "/api/db/student/upload?dni=" + token.dni;

    $.ajax({
        method: "POST",
        url: "https://matriculat-ieti.herokuapp.com" + query,
        dataType: "text",
        data: foto
    }).done(function() {
        M.toast({html: 'La image s\'ha guardat correctament.', displayLength: 2000, classes: 'rounded'});
        setStatus(statusR, 1, 0);
    }).fail(function(err) {
        M.toast({html: "No s'ha pogut connectar amb la base de dades o la connexi\u00F3 ha fallat.", displayLength: 2000, classes: 'rounded'});
    });
}

function addOption(option) {
    $("#selectRequirementsProfile").append('<option class="orange-text" value="' + option + '">' + option + '</option>');
}

function addSpanPhotoDone(button) {
    
}

function getPicture() {
    navigator.camera.getPicture(function(imageData) {
        savePhoto(imageData);
    }, function() {
        M.toast({html: "No s'ha pogut connectar amb la base de dades, <br/> la connexi\u00F3 ha fallat o la imatge no es v\u00E0lida", displayLength: 2000, classes: 'rounded'});
    }, {destinationType: Camera.DestinationType.DATA_URL, allowEdit: false, sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM});
}

function prepareProfile(profile) {
    switch (profile) {
        case "Perfil est\u00E0ndard":
            disableAllButtons();
            enableMinimButtons();
            enableRepresentantButtons();
            break;
        case "Monoparental":
            disableAllButtons();
            enableMinimButtons();
            enableRepresentantButtons();
            enableMonoparentalButton();
            break;
        case "Familia Nombrosa":
            disableAllButtons();
            enableMinimButtons();
            enableRepresentantButtons();
            enableFNButton();
            break;
        case "Majors de 28 anys":
            disableAllButtons();
            enableMinimButtons();
            break;
        case "Majors de 28 anys amb Monoparental":
            disableAllButtons();
            enableMinimButtons();
            enableMonoparentalButton();
            break;
        case "Majors de 28 anys amb Familia Nombrosa":
            disableAllButtons();
            enableMinimButtons();
            enableFNButton();
            break;
        default:
            disableAllButtons();
            break;
    }
}

function disableAllButtons() {
    $('a[name="requerimentMinimButton"]').addClass("disabled");
    $('a[name="requerimentRepresentantButton"]').addClass("disabled");
    $('a[name="requerimentMonoparentalButton"]').addClass("disabled");
    $('a[name="requerimentFamiliaNombrosaButton"]').addClass("disabled");
}

function enableAllButtons() {
    $('a[name="requerimentMinimButton"]').removeClass("disabled");
    $('a[name="requerimentRepresentantButton"]').removeClass("disabled");
    $('a[name="requerimentMonoparentalButton"]').removeClass("disabled");
    $('a[name="requerimentFamiliaNombrosaButton"]').removeClass("disabled");
}

function enableMinimButtons() {
    $('a[name="requerimentMinimButton"]').removeClass("disabled");
}

function enableRepresentantButtons() {
    $('a[name="requerimentRepresentantButton"]').removeClass("disabled");
}

function enableMonoparentalButton() {
    $('a[name="requerimentMonoparentalButton"]').removeClass("disabled");
}

function enableFNButton() {
    $('a[name="requerimentFamiliaNombrosaButton"]').removeClass("disabled");
}

// Funciones UFs:
async function processUfs() {
    let query = "/api/db/cycles/read?filter={\"nom_cicle_formatiu\":\"" + token.cicle_formatiu + "\"}";
    $.ajax({
        method: "GET",
        url: "https://matriculat-ieti.herokuapp.com" + query,
        dataType: "json",
    }).done(function(cycle) {
        fillUfList(cycle);
    }).fail(function() {
        M.toast({html: "No s'ha pogut connectar amb la base de dades o la connexi\u00F3 ha fallat.", displayLength: 2000, classes: 'rounded'});
    });
}

function saveUfsList() {
    let query = "/api/db/student/import/ufs?email=" + token.email + "&json=" + listUf;

    $.ajax({
        method: "GET",
        url: "https://matriculat-ieti.herokuapp.com" + query,
        dataType: "text",
    }).done(function() {
        M.toast({html: 'UFs guardades satisfact\u00F2riament', displayLength: 2000, classes: 'rounded'});
        setStatus(statusU, 2, 1);
    }).fail(function() {
        M.toast({html: "No s'ha pogut connectar amb la base de dades o la connexi\u00F3 ha fallat.", displayLength: 2000, classes: 'rounded'});
    });
}

function fillUfList(cicle) {
	cicle[0].moduls.sort();
    cicle[0].moduls.forEach(m => {
        addCollapsibleLi(m.codi_modul, m.nom_modul);
        m.unitats.forEach(u => {
            addCheckbox(m.codi_modul, u.nom_unitat_formativa);
        });
    });

	checkboxList = $(".filled-in");

    checkboxList.click(function() {
        isChecked = false;
        for (let i = 1; i < checkboxList.length; i++) {
            if (checkboxList[i].checked) {
                isChecked = true;
            } else {
                isChecked = false;
                break;
            }
        }
        
        if (isChecked) {
            selectAll.checked = true;
        } else {
            selectAll.checked = false;
        }
    });
}

function addCollapsibleLi(id, content) {
    $("#collapsibleContainer").append('<li><div class="collapsible-header"><i class="material-icons">more_horiz</i>' + content + '</div><div id="' + id + '" class="collapsible-body custom-padding-top-bottom-1rem"></div></li>');
}

function addCheckbox(id, content) {
    $("#" + id).append('<p><label><input id="' + content + '" name="UF-chk" type="checkbox" class="filled-in waves-effect waves-grey grey darken-3 orange-text" checked="false"/><span>' + content + '</span></label></p>');
}

function toggleCheckbox(id) {
    document.getElementById(id).toggleAttribute("checked");
}

function selectAllCheckbox() {
    $(".filled-in").prop('checked', "checked");
}

function unselectAllCheckbox() {
    $(".filled-in").prop('checked', false);
}

function getSelectedCheckbox() {
    let checkedList = $('input[name="UF-chk"]:checked');
    let arrayUF = []
    
    if (checkedList.length > 0) {
        arrayUF = [];
        for (let i = 0; i < checkedList.length; i++) {
            arrayUF.push(checkedList[i].id.toString());
        }
        console.log(arrayUF);
        return JSON.stringify(arrayUF);
    }

    return [];
}

// Funciones generales:
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function applyShakeEffect() {
    body.classList = [];
    await sleep(10);
    body.classList = ["shake-animation"];
}

function applyPulseEffect() {
    $("#confirm-floating-btn").addClass("pulse");

    $("#confirm-floating-btn").removeClass("orange");
    $("#confirm-floating-btn").addClass("green");
}

function removePulseEffect() {
    $("#confirm-floating-btn").removeClass("pulse");

    $("#confirm-floating-btn").removeClass("green");
    $("#confirm-floating-btn").addClass("orange");
}