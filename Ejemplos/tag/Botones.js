/* este archivo es para separar todas las funciones de los botones, para tener el codigo mas
organizado, todo lo que hay dentro de "click and hold" se reproduce continuamente mientras el 
boton este pulsado. Este codigo esta sacado de una libreria que encontre por internet al que
he metido mis funciones */


   $(document).ready(function () {
           
            $("#camaraZPlus").clickAndHold({
                onHold: function () {
                   trasladarNodo(camara[0], [0, 0, 1]); 
                }
            });
        });


   $(document).ready(function () {
           
            $("#camaraZMinus").clickAndHold({
                onHold: function () {
                   trasladarNodo(camara[0], [0, 0, -1]); 
                }
            });
        });


   $(document).ready(function () {
           
            $("#camaraXMinus").clickAndHold({
                onHold: function () {
                  trasladarNodo(camara[0], [0.5, 0, 0]); 
                }
            });
        });

   $(document).ready(function () {
           
            $("#camaraXPlus").clickAndHold({
                onHold: function () {
                  trasladarNodo(camara[0], [-0.5, 0, 0]); 
                }
            });
        });


   $(document).ready(function () {
           
            $("#camaraYPlus").clickAndHold({
                onHold: function () {
                   trasladarNodo(camara[0], [0, -0.5, 0]); 
                }
            });
        });

   $(document).ready(function () {
           
            $("#camaraYMinus").clickAndHold({
                onHold: function () {
                   trasladarNodo(camara[0], [0, 0.5, 0]); 
                }
            });
        });
   $(document).ready(function () {
           
            $("#camaraRXPlus").clickAndHold({
                onHold: function () {
                    rotarNodo(camara[0], [0 , -1 , 0]);
                },
            });
        });

   $(document).ready(function () {
           
            $("#camaraRXMinus").clickAndHold({
                onHold: function () {
                   rotarNodo(camara[0], [0 , 1 , 0]); 
                }
            });
        });

   $(document).ready(function () {
           
            $("#camaraRYPlus").clickAndHold({
                onHold: function () {
                   rotarNodo(camara[0], [-1 , 0 , 0]);
                }
            });
        });

   $(document).ready(function () {
           
            $("#camaraRYMinus").clickAndHold({
                onHold: function () {
                  rotarNodo(camara[0], [1 ,0 , 0]);
                }
            });
        });


    $(document).ready(function () {
         
          $("#RMXPlus").clickAndHold({
              onHold: function () {
                rotarNodo(objeto, [1, 0, 0]);
              }
          });
      });
      $(document).ready(function () {
         
          $("#RMXMinus").clickAndHold({
              onHold: function () {
                rotarNodo(objeto, [-1, 0, 0]);
              }
          });
      });

      $(document).ready(function () {
         
          $("#RMYPlus").clickAndHold({
              onHold: function () {
                rotarNodo(objeto, [0, 1, 0]);
              }
          });
      });
      $(document).ready(function () {
         
          $("#RMYMinus").clickAndHold({
              onHold: function () {
                rotarNodo(objeto, [0, -1, 0]);
              }
          });
      });

        $(document).ready(function () {
         
          $("#RMZPlus").clickAndHold({
              onHold: function () {
                rotarNodo(objeto, [0, 0, 1]);
              }
          });
      });
      $(document).ready(function () {
         
          $("#RMZMinus").clickAndHold({
              onHold: function () {
                rotarNodo(objeto, [0, 0, -1]);
              }
          });
      });

    $(document).ready(function () {
         
          $("#TMXPlus").clickAndHold({
              onHold: function () {
                trasladarNodo(objeto, [1, 0, 0]);
              }
          });
      });
      $(document).ready(function () {
         
          $("#TMXMinus").clickAndHold({
              onHold: function () {
                trasladarNodo(objeto, [-1, 0, 0]);
              }
          });
      });

      $(document).ready(function () {
         
          $("#TMYPlus").clickAndHold({
              onHold: function () {
                trasladarNodo(objeto, [0, 1, 0]);
              }
          });
      });
      $(document).ready(function () {
         
          $("#TMYMinus").clickAndHold({
              onHold: function () {
                trasladarNodo(objeto, [0, -1, 0]);
              }
          });
      });

        $(document).ready(function () {
         
          $("#TMZPlus").clickAndHold({
              onHold: function () {
                trasladarNodo(objeto, [0, 0, 1]);
              }
          });
      });
      $(document).ready(function () {
         
          $("#TMZMinus").clickAndHold({
              onHold: function () {
                trasladarNodo(objeto, [0, 0, -1]);
              }
          });
      });


    $(document).ready(function () {
         
          $("#luzXPlus").clickAndHold({
              onHold: function () {
                trasladarNodo(luces[0], [5, 0, 0]);
              }
          });
      });
    
      $(document).ready(function () {
         
          $("#luzXMinus").clickAndHold({
              onHold: function () {
                trasladarNodo(luces[0], [-5, 0, 0]);
              }
          });
      });

      $(document).ready(function () {
         
          $("#luzYPlus").clickAndHold({
              onHold: function () {
                trasladarNodo(luces[0], [0, 5, 0]);
              }
          });
      });
      $(document).ready(function () {
         
          $("#luzYMinus").clickAndHold({
              onHold: function () {
                trasladarNodo(luces[0], [0, -5, 0]);
              }
          });
      });

        $(document).ready(function () {
         
          $("#luzZPlus").clickAndHold({
              onHold: function () {
                trasladarNodo(luces[0], [0, 0, 5]);
              }
          });
      });
      $(document).ready(function () {
         
          $("#luzZMinus").clickAndHold({
              onHold: function () {
                trasladarNodo(luces[0], [0, 0, -5]);
              }
          });
      });













