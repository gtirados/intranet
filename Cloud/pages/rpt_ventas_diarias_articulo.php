<?php
$titulo = 'Ventas Diarias por Artículo en Soles y Unidades';
require '../vistas/parte_superior.php';
?>

<!--INICIO del cont principal-->
<link rel="stylesheet" href="<?php echo BASE_URL; ?>vendor/datetimepicker/jquery.datetimepicker.min.css">
<input type="hidden" id="hLOAD" value="1">
<div class="container-fluid">
    <h1><?php echo $titulo ?></h1>
        <div class="row">
    <table border="0" cellspacing="5" cellpadding="5">
        <tbody>
            <tr>
            <td>Desde:</td>
            <!-- <td><input type="text" id="min" name="min"></td> -->
            <td><input type="text" class="form-control" id="dpDesde" placeholder="Fecha Inicial"></td>
            <td>Hasta:</td>
            <td><input type="text" class="form-control" id="dpHasta" placeholder="Fecha Final"></td>
            <td><button id="btnVentasDiariasArticulos" type="button" class="btn btn-primary">Consultar</button></td>
            <!-- <td><button id="loading" type="button" classs="btn btn-danger">loading</button></td> -->
        </tr>
    </tbody></table>
   
    </div>
    <div class="row">
        <div class="col-lg-12">
            <div class="table-responsive">
                <table id="tblVentasDiariasArticulos" class="table table-striped table-bordered" cellspacing="0" width="100%">
                </table>
            </div>        
            
        </div>
    </div>
    
</div>


<!--FIN del cont principal-->

<?php include_once '../vistas/parte_inferior.php'; ?>
<script src="<?php echo BASE_URL; ?>vendor/DataTables/RowGroup-1.2.0/js/dataTables.rowsGroup.js"></script>
<script src="<?php echo BASE_URL; ?>js/fechas.js"></script>
<script src="<?php echo BASE_URL; ?>js/reportes.js"></script>
<script type="text/javascript">
   VentasDiariasArticulo();
</script>