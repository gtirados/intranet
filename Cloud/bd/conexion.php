<?php
 require_once '../config/config.php';
class Conexion
{
    public static function Conectar()
    {
        $opciones = [PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'];
        try {
            $conexion = new PDO(
                'mysql:host=' . HOST . '; dbname=' . DBNAME,
                USER,
                PASS,
                $opciones
            );
            return $conexion;
        } catch (Exception $e) {
            die('El error de Conexión es: ' . $e->getMessage());
        }
    }
}
