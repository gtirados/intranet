<?php
include_once 'conexion.php';

try {
    $objeto = new Conexion();
    $conexion = $objeto->Conectar();

    // $fini = isset($_POST['fini']) ? $_POST['fini'] : '';
    // $ffin = isset($_POST['ffin']) ? $_POST['ffin'] : '';
    $ruc = isset($_POST['ruc']) ? $_POST['ruc'] : '';

    $sql = 'call usp_empresa_list(?);';
    $stmt = $conexion->prepare($sql);
    // $stmt->bindParam(1, $fini, PDO::PARAM_STR,8);
    // $stmt->bindParam(2, $ffin, PDO::PARAM_STR,8);
    $stmt->bindParam(1, $ruc, PDO::PARAM_STR,11);
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $result = ['codigo' => '0', 'mensaje' => '', 'datos' => $data];
    // $result = array('codigo'=>$ffin,'mensaje'=>$fini,'datos'=>$data);
} catch (PDOException $th) {
    $result = [
        'codigo' => $th->getCode(),
        'mensaje' => $th->getMessage(),
        'datos' => null,
    ];
    //throw $th;
} finally {
    // return $result;
    $conexion = null;
    $stmt = null;
}

// print json_encode($result,JSON_UNESCAPED_UNICODE);
echo json_encode($result, JSON_UNESCAPED_UNICODE);
die();
