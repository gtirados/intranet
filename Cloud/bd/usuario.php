<?php
include_once 'conexion.php';

try {
    $objeto = new Conexion();
    $conexion = $objeto->Conectar();

     $user = isset($_POST['user']) ? $_POST['user'] : '';
    // $ffin = isset($_POST['ffin']) ? $_POST['ffin'] : '';

    $sql = 'call usp_usuario_fill(?);';
    $stmt = $conexion->prepare($sql);
    $stmt->bindParam(1, $user, PDO::PARAM_STR,20);
    // $stmt->bindParam(2, $ffin, PDO::PARAM_STR,8);
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
