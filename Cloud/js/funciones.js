function FechaMilitarActual() {
    var hoy = new Date()
    var dd = hoy.getDate().toString()
    var mm = hoy.getMonth() + 1
    var yyyy = hoy.getFullYear().toString()
  
    dd = addZero(dd)
    mm = addZero(mm)
  
    var fechafinal = yyyy + mm + dd
  
    return fechafinal
  }
  
  function addZero(i) {
    if (i < 10) {
      i = '0' + i
    }
    return i
  }
  
  function FechaMilitarSQL(cFecha) {
    var sfecha = cFecha.split('/')
    return sfecha[2] + sfecha[1] + sfecha[0]
  }