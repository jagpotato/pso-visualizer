function initTable() {
  u("#result-table").children("thead").remove();
  u("#result-table").children("tbody").remove();
  u("#result-table").attr({style: "display:block"});
  u("#result-table").append("<thead><tr><th>t</th><th>Fg</th><th>Xg</th></tr></thead>");
}

function appendTd(t, Fg, Xg) {
  u("#result-table").append("<td>" + t + "</td><td>" + Fg + "</td><td>[" + Xg + "]</td>");
}

function changeLastTrColor() {
  let lastTr = u("#result-table").children("tbody:last-child").children("tr");
  u(lastTr).addClass("last-tr");
}
