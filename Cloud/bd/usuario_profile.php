<?php
include_once 'conexion.php';

try {
    $objeto = new Conexion();
    $conexion = $objeto->Conectar();

    $idusuario = isset($_POST['id']) ? $_POST['id'] : '';
    $clave = isset($_POST['pwd']) ? $_POST['pwd'] : '';

    $claveenc = md5($clave);

    $sql = "call usp_usuario_profileupdate(".$idusuario.", '".$claveenc."', @o_code, @o_message)";
    $stmt = $conexion->prepare($sql);
    $stmt->execute();
    $stmt->closeCursor();
    $output = $conexion->query('select @o_code ocode, @o_message omsn')->fetch(PDO::FETCH_ASSOC);
    $result = array('codigo' => $output['ocode'], 'mensaje' => $output['omsn']);
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
