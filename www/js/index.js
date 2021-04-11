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

// Variables Dashboard:
var trafficLightMatricualtion = document.getElementById("trafficLightMatriculation");
var btMatriculation = document.getElementById("btMatriculation");
btMatriculation.onclick = changeColorMatriculation;

var dniInFront = document.getElementById("dniInFront");
var btMInFront = document.getElementById("btDniInFront");
btMInFront.onclick = changeColorDniInFront;

var dniBehind = document.getElementById("dniBehind");
var btDniBehind = document.getElementById("btDniBehind");
btDniBehind.onclick = changeColorDniBehind;

// Variables UFs:
let selectAll = document.getElementById("selectAllCheckboxes");
let saveUfs = document.getElementById("saveUfs");
let listUf = [];
let token = JSON.parse(localStorage.getItem("data"));
let body = document.getElementById("body");

async function onDeviceReady() {
	await processUfs();

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
function changeColorMatriculation() {
    trafficLightMatricualtion.className = "material-icons circle green-text darken-3";
}

function changeColorDniInFront() {
    dniInFront.className = "material-icons circle orange-text darken-3";
}

function changeColorDniBehind() {
    dniBehind.className = "material-icons circle red-text darken-3";
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

    console.log("https://matriculat-ieti.herokuapp.com" + query);
    $.ajax({
        method: "GET",
        url: "https://matriculat-ieti.herokuapp.com" + query,
        dataType: "text",
    }).done(function() {
        M.toast({html: 'UFs guardades satisfact\u00F2riament', displayLength: 2000, classes: 'rounded'});
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
    $("#collapsibleContainer").append('<li><div class="collapsible-header"><i class="material-icons">more_horiz</i>' + content + '</div><div id="' + id + '" class="collapsible-body"></div></li>');
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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function applyShakeEffect() {
    body.classList = [];
    await sleep(10);
    body.classList = ["shake-animation"];
}