<?php
$titulo = 'Home';
include_once '../vistas/parte_superior.php';
?>
<input type="hidden" id="idusuario" value="<?php echo $_SESSION['s_idusuario']; ?>">
<div class="container-fluid">
    <h1>Perfil</h1>
    <div class="row">
        <div class="col-xl-8">
            <div class="card mb-4">
                <div class="card-header">Detalles de la cuenta</div>
                <div class="card-body">
                    <form>
                        <!-- Form Group (username)-->
                        <div class="mb-3">
                            <label class="small mb-1" for="txtUserName">Username</label>
                            <input class="form-control" id="txtUserName" type="text" placeholder="Ingrese username" readonly >
                        </div>
                        <div class="mb-3">
                            <label class="small mb-1" for="txtUserName">Ruc</label>
                            <input class="form-control" id="txtRuc" type="text" placeholder="Ingrese Ruc" readonly >
                        </div>
                        <div class="row gx-3 mb-3">
                            <!-- Form Group (first name)-->
                            <div class="col-md-6">
                                <label class="small mb-1" for="txtPassword">Contraseña</label>
                                <input class="form-control" id="txtPassword" type="password" placeholder="ingresa su contraseña" >
                            </div>
                            <!-- Form Group (last name)-->
                            <div class="col-md-6">
                                <label class="small mb-1" for="txtPasswordConfirm">Confirmar Contraseña</label>
                                <input class="form-control" id="txtPasswordConfirm" type="password" placeholder="ingresa su contraseña">
                            </div>
                        </div>
                        <!-- Form Row-->
                        
                        <!-- Save changes button-->
                        <button class="btn btn-primary" type="button" id="btnSaveProfile">Guardar</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<?php require_once '../vistas/parte_inferior.php'; ?>
<script src="<?php echo BASE_URL; ?>js/profile.js"></script>