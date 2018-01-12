$( document ).ready(function() {
    $('#btn_qr').click(function(){
        var text_data = {texto: $('#texto').val()}    
        $.ajax({
            url:"http://localhost:5000/generate-qr",
            type:"POST",
            data:JSON.stringify(text_data),
            contentType:"application/json; charset=utf-8",
            dataType:"json",
            success: function(data){
                d = new Date();
                $('#qrimage').attr("src",data.url+ "?"+d.getTime());
            },
            error: function(data){
                $('#result').text('Fallo al consultar la API');
            }
          })

    });
  });