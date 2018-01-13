const { dialog } = require('electron').remote;
var http = require('http');
var fs = require('fs');

$(document).ready(function () {
    var url_qr = '';
    $('#btn_qr').click(function () {

        var text_data = { texto: $('#texto').val() }
        $.ajax({
            url: "http://localhost:5000/generate-qr",
            type: "POST",
            data: JSON.stringify(text_data),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                url_qr = data.url;
                d = new Date();
                $('#qrimage').attr("src", data.url + "?" + d.getTime());
            },
            error: function (data) {
                $('#result').text('Fallo al consultar la API');
            }
        })
    });

    $('#btn_save').click(function () {
        if(url_qr === ''){
            dialog.showMessageBox({title: 'Atención', message: 'Primero hay que generar el código'});
            return;
        }
        var fichero = dialog.showSaveDialog(
            {},
            function (filepath) {
                var file = fs.createWriteStream(filepath);
                var request = http.get(url_qr, function (response) {
                    response.pipe(file);
                    dialog.showMessageBox({title: 'Información', message: 'La imagen con el código QR ha sido guardada correctamente'});
                });
            }
        )
    });
});