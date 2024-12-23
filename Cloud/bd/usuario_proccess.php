<?php
include_once 'conexion.php';

try {
    $objeto = new Conexion();
    $conexion = $objeto->Conectar();

    $idusuario = isset($_POST['id']) ? $_POST['id'] : '';
    $ruc = isset($_POST['ruc']) ? $_POST['ruc'] : '';
    $usuario = isset($_POST['usuario']) ? $_POST['usuario'] : '';
    $clave = isset($_POST['clave']) ? $_POST['clave'] : '';
    $estado = isset($_POST['estado']) ? $_POST['estado'] : '';

    $claveenc = md5($clave);

    $sql = "call usp_usuario_proccess(".$idusuario.", '".$ruc."','".$usuario."','".$claveenc."',".$estado.", @o_code, @o_message, @o_salida)";
    $stmt = $conexion->prepare($sql);
    $stmt->execute();
    $stmt->closeCursor();
    $output = $conexion->query('select @o_code ocode, @o_message omsn, @o_salida osalida')->fetch(PDO::FETCH_ASSOC);
    $result = array('codigo' => $output['ocode'], 'mensaje' => $output['omsn'],'idsalida'=> $output['osalida']);
} catch (PDOException $th) {
    $result = [
        'codigo' => $th->getCode(),
        'mensaje' => $th->getMessage()
    ];
} finally {
    // return $result;
    $conexion = null;
    $stmt = null;
}
echo json_encode($result, JSON_UNESCAPED_UNICODE);
die();
