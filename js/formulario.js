 require( ["js/control"
        ,"js/clases/ajax"
        ,"js/clases/constantes"],
    function(control,ajax,constantes) {
        var JsonUniversidades;
    	var Validar=function(){
    		var txtFirstName=$("#txtFirstName");
    		var txtLastName=$("#txtLastName");
    		var txtPhone=$("#txtPhone");
    		var txtMobil=$("#txtMobil");
    		var txtmail=$("#txtmail");
    		var lstUniversidad=$("#lstUniversidad");
    		var txtPassword=$("#txtPassword");
    		var txtSecondPassword=$("#txtSecondPassword");
    		var lstConocioOrganizacion=$("#lstConocioOrganizacion");
            var lstCampos=$("#lstCampos");

    		if(txtFirstName.val()==""){
    			swal("Ingrese su nombre");
    			return false;
    		}else if(txtLastName.val()==""){
    			swal("Ingrese su apellido");
    			return false;
    		} 
    		else if(txtPhone.val()==""){
    			swal("Ingrese su numero de telefono");
    			return false;
    		} 
    		else if(txtMobil.val()==""){
    			swal("Ingrese su telefono celular");
    			return false;
    		} 
    		else if(txtmail.val()==""){
    			swal("Ingrese su email");
    			return false;
    		} 
    		else if(lstUniversidad.val()==null){
    			swal("Seleccione su universidad");
    			return false;
    		} else if(txtPassword.val()==""){
    			swal("Ingrese la clave");
    			return false;
    		} 
    		else if(txtSecondPassword.val()==""){
    			swal("Repita la clave");
    			return false;
    		} 
    		else if(lstConocioOrganizacion.val()==null){
    			swal("Seleccione como conocio la organización");
    			return false;
    		} else if(txtPassword.val()!=txtSecondPassword.val()){
    			swal("las contraseñas no coinciden");
    			return false;
    		}else if(lstCampos.val()==null){
                swal("Seleccione su área de preferencia");
                return false;
            }
            else if(!($("#rbAceptoTerminos").is(":checked"))){
                swal("Debe aceptar los términos y condiciones de privacidad");
            }
            else{
    			return true;
    		}

    	}

        var saveEndAjax=function(data){
            window.open("https://auth.aiesec.org/users/sign_in");
            swal({
              title: "Registro correcto!",
              text: " ",
              type: "success",
              showCancelButton: false,
              confirmButtonColor: "#DD6B55",
              confirmButtonText: "Aceptar",
              closeOnConfirm: false
            },
            function(){
               location.reload();
            });

        }

        var endLoadList=function(data){
            JsonUniversidades=data.alignments;
            $.each(data.alignments,function(index,value){
                $("#lstUniversidad").append('<option value="'+value.id+'">'+value.value+'</option>');
            });
            var list=$(".listas");
            control.loadList(list);
        }
        var ValidarClave=function(text){
            var pswd = text;
                //validate the length
                if ( pswd.length < 8 ) {
                   swal("La contraseña deben tener minimo 8 digitos");
                   return false;
                }
                else if (!( pswd.match(/[A-z]/)) ) {
                    swal("La contraseña debe tener mayusculas y minusculas");
                    return false;
                }else if (!( pswd.match(/\d/) )) {
                    swal("La contraseña deben tener numeros");
                    return false;
                }else{
                    return true;
                }
        };
    	var start=function(){
            $.each(constantes.actividades(),function(index, value){
                    $("#lstCampos").append('<option value="'+value.name+'">'+value.name+'</option>');

                });
    		$("#btnIngresar").click(function(){
                var universidadNombre;
                $.each(JsonUniversidades, function(vindex,value){
                    
                    if(value.id==$("#lstUniversidad").val()){
                        universidadNombre=value.value;
                    }
                });
                
    			if(Validar() && ValidarClave($("#txtPassword").val())){
                    var url="index.php?r=formulario/InserExpa";
                    var data={};                   
                    data["txtFirstName"]=$("#txtFirstName").val();
                    data["txtLastName"]=$("#txtLastName").val();
                    data["txtPhone"]=$("#txtPhone").val();
                    data["txtMobil"]=$("#txtMobil").val();
                    data["txtmail"]=$("#txtmail").val();
                    data["valUniversidad"]=$("#lstUniversidad").val();
                    data["nombreUniversidad"]=universidadNombre;
                    data["txtPassword"]=$("#txtPassword").val();
                    data["txtSecondPassword"]=$("#txtSecondPassword").val();
                    data["lstConocioOrganizacion"]=$("#lstConocioOrganizacion").val();
                    data["lstCampos"]=$("#lstCampos").val();
                    
    				ajax.ajaxSinJson(data,url,saveEndAjax);
                    $.blockUI({ 
                        message: $(' <div class="progress"><div class="indeterminate"></div></div>'), 
                        css: { top: '20%' } 
                    }); 
                }
    		});
            $("#btnTerminosCondiciones").click(function(e){
                e.preventDefault();
                window.open("https://opportunities.aiesec.org/assets/terms.pdf");
            });
            ajax.ajax({},"index.php?r=formulario/UniversidadesColombia",endLoadList);


    	};

        $(document).ready(start);
    }
  );