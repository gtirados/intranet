<?php


$titulo = 'Maestro de Usuarios';
require '../vistas/parte_superior.php';
?>

<!--INICIO del cont principal-->
<div class="container-fluid">
<h1><?= $titulo ?></h1>
    
    
    


<div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">            
            <button id="btnNuevo" type="button" class="btn btn-success" data-toggle="modal">Nuevo</button>    
            </div>    
        </div>    
    </div>    
    <br>  

        <div class="row">
                <div class="col-lg-12">
                    <div class="table-responsive">        
                        <table id="tblUsuarios" class="table table-striped table-bordered table-condensed" style="width:100%">
                        <thead class="text-center">
                            <tr>
                                <th>Id</th>
                                <th>Ruc</th>
                                <th>Usuario</th>                                
                                <th>Activo</th>                                
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                              
                        </tbody>        
                       </table>                    
                    </div>
                </div>
        </div>  
 
      
<!--Modal para CRUD-->
<div class="modal fade" id="modalCRUD" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header" id="modalHeader">
                <h5 class="modal-title" id="modalTitle"></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                </button>
            </div>
        <form id="formUsuario">    
        <input type="hidden" id="hIDusuario" value="">
            <div class="modal-body">
                <div class="form-group">
                <label for="txtRuc" class="col-form-label">Ruc:</label>
                <input type="text" class="form-control" id="txtRuc">
                </div>
                <div class="form-group">
                <label for="txtUsuario" class="col-form-label">Usuario:</label>
                <input type="text" class="form-control" id="txtUsuario">
                </div>    
                <!-- Nuevo campo para ingresar clave -->
                <div class="form-group">
                        <label for="txtClave" class="col-form-label">Clave:</label>
                        <input type="password" class="form-control" id="txtClave">
                    </div>
                    <!-- Nuevo campo para confirmar clave -->
                    <div class="form-group">
                        <label for="txtConfirmarClave" class="col-form-label">Confirmar Clave:</label>
                        <input type="password" class="form-control" id="txtConfirmarClave">
                    </div>                       
                <div class="form-group">
                        <label for="cboActivo" class="col-form-label">Activo:</label>
                        <select class="form-control" id="cboActivo">
                            <option value="1">Si</option>
                            <option value="0">No</option>
                        </select>
                    </div>    
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-light" data-dismiss="modal">Cancelar</button>
                <button type="button" id="btnGuardar" class="btn btn-dark">Guardar</button>
            </div>
        </form>    
        </div>
    </div>
</div>  
      
    
    
</div>
<!--FIN del cont principal-->
<?php include_once '../vistas/parte_inferior.php'; ?>
<script src="<?php echo BASE_URL; ?>js/usuario.js"></script>

<script type="text/javascript">
    cargarUsuarios();
</script>