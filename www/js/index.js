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
document.addEventListener('')

let selectAll = document.getElementById("selectAllCheckboxes");
let checkboxList = [];
let token = JSON.parse(localStorage.getItem("data"));

async function onDeviceReady() {
	await processUFs();

    // Control de seleccion de checkboxes.
    selectAll.onclick = function() {
        if (selectAll.checked || selectAll.checked == "checked") {
            selectAllCheckbox();
        } else {
            unselectAllCheckbox();
        }
    };

}

async function processUFs() {
    let query = "/api/db/cycles/read?filter={\"nom_cicle_formatiu\":\"" + token.cicle_formatiu + "\"}";
    $.ajax({
        method: "GET",
        url: "https://matriculat-ieti.herokuapp.com" + query,
        dataType: "json",
    }).done(function(cycle) {
        fillUfList(cycle);
    }).fail(function() {
		console.log("Fallo en la peticion HTTP GET");
        alert("No se ha podido conectar con la base de datos.");
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
            console.log(checkboxList[i]);
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
    $("#" + id).append('<p><label><input id="' + content + '" type="checkbox" class="filled-in waves-effect waves-grey grey darken-3 orange-text" checked="false"/><span>' + content + '</span></label></p>');
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