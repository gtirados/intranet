<?php
$titulo = 'Registro de Ventas';
require '../vistas/parte_superior.php';
?>

<!--INICIO del cont principal-->
<link rel="stylesheet" href="<?php echo BASE_URL; ?>vendor/datetimepicker/jquery.datetimepicker.min.css">
<input type="hidden" id="hLOAD" value="1">
<input type="hidden" id="hRUC" value="<?php echo isset($_SESSION['s_ruc']) ? $_SESSION['s_ruc'] : ''; ?>">
<input type="hidden" id="hRUTAFILES" value="<?php echo BASE_FILES; ?>">
<div class="container-fluid">
    <h1><?= $titulo; ?></h1>
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
                <select style="width:200px;" class="form-control" name="cbociaRegistroVentas" id="cbociaRegistroVentas" multiple="multiple">
                    <option value='-1' selected >.: Todos :.</option>
                    <!-- <option>1Elija una Empresa</option>
                    <option>2Elija una Empresa</option> -->
                </select>
            </td>
            <td><button id="btnRegistroVentas" type="button" class="btn btn-primary">Consultar</button></td>
            <!-- <td><button id="loading" type="button" classs="btn btn-danger">loading</button></td> -->
        </tr>
    </tbody></table>
   
    </div>
    <div class="row">
        <div class="col-lg-12">
            <div class="table-responsive">
                <table id="tblRegistroVentas" class="table table-striped table-bordered" cellspacing="0" width="100%">
                    <thead class="text-center">
                        <tr>
                            <th>Orden</th>
                            <th>Fecha</th>
                            <th>Tipo Docto</th>
                            <th>Serie</th>
                            <th>Número</th>
                            <th>Tip. Docto Cliente</th>
                            <th>Num. Docto Cliente</th>
                            <th>Nombre Cliente</th>
                            <th>SubTotal</th>
                            <th>Igv</th>
                            <th>Total</th>
                            <th>Estado</th>
                            <th>Estado Sunat</th>
                            <th>Documentos</th> 
                            <!-- <th>codigoSunat</th>
                             <th>carpeta files</th> -->
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                    <tfoot>
            <tr>
                <th colspan="10" style="text-align:right">Total:</th>
                <th colspan="4"></th>
            </tr>
        </tfoot>
                </table>
            </div>        
            
        </div>
    </div>
    
</div>


<!--FIN del cont principal-->

<?php include_once '../vistas/parte_inferior.php'; ?>
<script src="<?php echo BASE_URL; ?>js/fechas.js"></script>
<script src="<?php echo BASE_URL; ?>js/funciones.js"></script>
<script src="<?php echo BASE_URL; ?>js/empresa.js"></script>
<script src="<?php echo BASE_URL; ?>js/regventas.js"></script>
<script>
    $('#cbociaRegistroVentas').select2();
</script>
<script type="text/javascript">
    RegistroVentas();
</script>