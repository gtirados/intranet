
      </div>
      <!-- End of Main Content -->

      <!-- Footer -->
      <footer class="sticky-footer bg-white">
        <div class="container my-auto">
          <div class="copyright text-center my-auto">
            <span>Copyright &copy; Your Website 2022</span></br><?php echo TITLE; ?>
          </div>
        </div>
      </footer>
      <!-- End of Footer -->

    </div>
    <!-- End of Content Wrapper -->

  </div>
  <!-- End of Page Wrapper -->

  <!-- Scroll to Top Button-->
  <a class="scroll-to-top rounded" href="#page-top">
    <i class="fas fa-angle-up"></i>
  </a>

  <!-- Logout Modal-->
  <div class="modal fade" id="logoutModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel1" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel1">¿Listo para salir?</h5>
          <button class="close" type="button" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">Pulse a continuación "Salir" si está listo para finalizar su sesión actual.</div>
        <div class="modal-footer">
          <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancelar</button>
          <a class="btn btn-primary" href="../bd/logout.php">Salir</a>
        </div>
      </div>
    </div>
  </div>

  <!-- Bootstrap core JavaScript-->
  <script src="<?php  echo BASE_URL; ?>jquery/jquery-3.6.0.min.js"></script>
  
  <!-- <script src="<?php //echo BASE_URL; ?>vendor/jquery/jquery.min.js"></script> -->
  <script src="<?php echo BASE_URL; ?>vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

  <!-- Core plugin JavaScript-->
  <script src="<?php echo BASE_URL; ?>vendor/jquery-easing/jquery.easing.min.js"></script>

  <!-- Custom scripts for all pages-->
  <script src="<?php echo BASE_URL; ?>js/sb-admin-2.min.js"></script>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/js/all.min.js" integrity="sha512-naukR7I+Nk6gp7p5TMA4ycgfxaZBJ7MO5iC3Fp6ySQyKFHOGfpkSZkYVWV5R7u7cfAicxanwYQ5D1e17EfJcMA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
 

  
    <!-- datatables JS -->
    <script src="<?php echo BASE_URL; ?>vendor/DataTables/datatables.min.js"></script>
    <script src="https://cdn.datatables.net/plug-ins/1.12.1/api/sum().js"></script>
    <!--Obligatorio que la libreria datepicker este en el footer justo despues de los js de bootstrap para no causar conflicto-->
    <script src="<?php echo BASE_URL; ?>vendor/bootstrap-datepicker/js/bootstrap-datepicker.min.js"></script>
    <script src="<?php echo BASE_URL; ?>plugins/select2-4.0.13/js/select2.min.js"></script>
    <!-- <script src="libs/locales/bootstrap-datepicker.es.min.js"></script> -->
    <script src="<?php echo BASE_URL; ?>vendor/bootstrap-datepicker/locales/bootstrap-datepicker.es.min.js"></script>
    <script src="<?php echo BASE_URL; ?>vendor/datetimepicker/jquery.datetimepicker.min.js"></script>
    <script src="<?php echo BASE_URL; ?>vendor/datetimepicker/jquery.datetimepicker.full.min.js"></script>
    <script src="<?php echo BASE_URL; ?>plugins/sweetalert2/sweetalert2.all.min.js"></script>
    <script src="<?php echo BASE_URL; ?>vendor/DataTables/RowGroup-1.2.0/js/dataTables.rowGroup.js"></script>
    <script src="<?php echo BASE_URL; ?>js/custom_buttons.js"></script>
    
</body>

</html>
