var airQdata = null;

function setup() {
  createCanvas(windowWidth, windowHeight);

  var url = 'http://openapi.seoul.go.kr:8088/736c6f75466a757339384265756342/json/ListAirQualityByDistrictService/1/25/';
  loadJSON(url, onAirQ);

  textSize(18);
  textAlign(LEFT, TOP);
  noStroke();
}

function draw() {
  background(0);
  if (airQdata==null) return;
  //console.log(airQdata);

  translate(width/2, height/2);
  var nDist = airQdata.list_total_count;
  var angStep = TWO_PI/ nDist

  var maxPM10 = 0, minPM10 = 200;
  for (var i=0; i< nDist; i++) {
    if (isNaN(airQdata.row[i].PM10)) continue;
    maxPM10 = max(airQdata.row[i].PM10, maxPM10);
    minPM10 = min(airQdata.row[i].PM10, minPM10);
  }
  
  var angOffset = map(mouseX, 0, width, 0, TWO_PI);
  var scaleSz = map(mouseY, 0, height, 1, 2);

  for (var i=0; i< nDist; i++) {
    push();
    rotate( angStep*i + angOffset);
    scale(scaleSz);
    if (isNaN(airQdata.row[i].PM10)) {
      fill(127);
      text("No Data", 80, 0);
      text(airQdata.row[i].MSRSTENAME, 200, 0);
    } else {

      var red = map(airQdata.row[i].PM10, minPM10, maxPM10, 0, 255);
      red = constrain(red, 0, 255);
      fill(red, 0, 0);
      rect(50, 0, airQdata.row[i].PM10 * 3, 15);
      text(airQdata.row[i].MSRSTENAME, airQdata.row[i].PM10 *3 +80, 0);
    }
    pop();
  }
}

function onAirQ( data ) {
  airQdata = data.ListAirQualityByDistrictService;
}
