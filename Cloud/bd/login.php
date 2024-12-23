<?php
session_start();

include_once 'conexion.php';

try {
    $objeto = new Conexion();
    $conexion = $objeto->Conectar();

    //recepción de datos enviados mediante POST desde ajax
    $usuario = isset($_POST['usuario']) ? $_POST['usuario'] : '';
    $ruc = isset($_POST['ruc']) ? $_POST['ruc']: '';
    $password = isset($_POST['password']) ? $_POST['password'] : '';

    $pass = md5($password); //encripto la clave enviada por el usuario para compararla con la clava encriptada y almacenada en la BD

    // $consulta = "SELECT * FROM usuario WHERE user='$usuario'";
    $consulta = 'call usp_login(?,?)';
    $stmt = $conexion->prepare($consulta);
    $stmt->bindParam(1, $usuario, PDO::PARAM_STR, 25);
    $stmt->bindParam(2, $ruc, PDO::PARAM_STR, 11);
    $stmt->execute();
    $data = $stmt->fetch(PDO::FETCH_ASSOC);

    // echo json_encode($data, JSON_UNESCAPED_UNICODE);

    if ($data) {
        if ($data['pwd'] != $pass) {
            $_SESSION['s_usuario'] = null;
            $_SESSION['s_ruc'] = null;
            $salida = [
                'codigo' => '-2',
                'mensaje' => 'Contraseña Incorrecta.',
                'datos' => null,
            ];
        } elseif($data['activo'] == 0) {
            $_SESSION['s_usuario'] = null;
            $_SESSION['s_ruc'] = null;
            $salida = [
                'codigo' => '-3',
                'mensaje' => 'Usuario Inactivo.',
                'datos' => null,
            ];
        }else {
            $_SESSION['s_usuario'] = $usuario;
            $_SESSION['s_idusuario'] = $data['id'];
            $_SESSION['s_ruc'] = $data['ruc'];
            $salida = ['codigo' => '0', 'mensaje' => '', 'datos' => $data];
        }
        // print_r($data['usuario']);
        // return;
    } else {
        $_SESSION['s_usuario'] = null;
        $salida = [
            'codigo' => '-1',
            'mensaje' => 'Usuario y/o Ruc No Registrado',
            'datos' => null,
        ];
    }
} catch (PDOException $th) {
    $_SESSION['s_usuario'] = null;
    $_SESSION['s_ruc'] = null;
    $salida = [
        'codigo' => $th->getcode(),
        'mensaje' => $th->getMessage(),
        'datos' => null,
    ];
} finally{
    $conexion = null;
    $stmt = null;
}

echo json_encode($salida, JSON_UNESCAPED_UNICODE);
die();