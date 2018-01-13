u("#pso-button").on('click', function(){
  u("#graph").remove();
  u("#pso-button").after("<div id='graph'></div>");
  // u("#pso-button").attr("disabled", "true");
  pso();
});
