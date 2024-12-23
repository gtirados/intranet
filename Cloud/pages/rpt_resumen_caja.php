<?php
session_start();
$titulo = 'Resumen de Caja';
require '../vistas/parte_superior.php';
?>

<!--INICIO del cont principal-->
<link rel="stylesheet" href="<?php echo BASE_URL; ?>vendor/datetimepicker/jquery.datetimepicker.min.css">
<input type="hidden" id="hLOAD" value="1">
<input type="hidden" id="hRUC" value="<?php echo $_SESSION['s_ruc']; ?>">
<div class="container-fluid">
    <h1><?= $titulo ?></h1>
        <div class="row">
    <table border="0" cellspacing="5" cellpadding="5">
        <tbody>
            <tr>
            <td>Desde:</td>
            <!-- <td><input type="text" id="min" name="min"></td> -->
            <td><input type="text" class="form-control" id="dpDesde" placeholder="Fecha Inicial"></td>
            <td>Hasta:</td>
            <td><input type="text" class="form-control" id="dpHasta" placeholder="Fecha Final"></td>

            <td>Empresa:</td>
            <td>
                <select style="width:200px;" class="form-control" name="cbociaResumenCaja" id="cbociaResumenCaja" multiple="multiple">
                    <option value='-1' selected >.: Todos :.</option>
                    <!-- <option>1Elija una Empresa</option>
                    <option>2Elija una Empresa</option> -->
                </select>
            </td>
            <td><button id="btnResumenCaja" type="button" class="btn btn-primary">Consultar</button></td>
            <!-- <td><button id="loading" type="button" classs="btn btn-danger">loading</button></td> -->
        </tr>
    </tbody></table>
   
    </div>
    <div class="row">
        <div class="col-lg-12">
            <div class="table-responsive">
                <table id="tblResumenCaja" class="table table-striped table-bordered" cellspacing="0" width="100%">
                    <thead class="text-center">
                        <tr>
                            <th>Razón Social</th>
                            <th>Forma Pago</th>
                            <th>Fecha</th>
                            <th>Docto</th>
                            <!-- <th>dato</th> -->
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>

                </table>
            </div>        
            
        </div>
    </div>
    
</div>


<!--FIN del cont principal-->

<?php include_once '../vistas/parte_inferior.php'; ?>
<script src="<?php echo BASE_URL; ?>js/fechas.js"></script>
<script src="<?php echo BASE_URL; ?>js/funciones.js"></script>
<script src="<?php echo BASE_URL; ?>js/reportes.js"></script>
<script src="<?php echo BASE_URL; ?>js/empresa.js"></script>
<script>
    $('#cbociaResumenCaja').select2();
</script>
<script type="text/javascript">
    ResumenCaja();
</script>