google.charts.load('current', {'packages':['gauge']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

    var data = google.visualization.arrayToDataTable([
		['Label', 'Value'],
        ['Sentiment', 1]
    ]);

    var options = {
        width: 335, height: 100,
		greenFrom:0, greenTo: 2,
		yellowFrom:2, yellowTo: 4,
        redFrom: 4, redTo: 6,
        minorTicks: 2,
		max: 6
    };

    var chart = new google.visualization.Gauge(document.getElementById('chart_div'));

    chart.draw(data, options);
}

/*
<html>
  <head>
   <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
   <script type="text/javascript">
      google.charts.load('current', {'packages':['gauge']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

        var data = google.visualization.arrayToDataTable([
          ['Label', 'Value'],
          ['Sentiment', 3]
        ]);

        var options = {
          width: 400, height: 120,
		  greenFrom:0, greenTo: 2,
		  yellowFrom:2, yellowTo: 4,
          redFrom: 4, redTo: 6,
          minorTicks: 2,
		  max: 6
        };

        var chart = new google.visualization.Gauge(document.getElementById('chart_div'));

        chart.draw(data, options);
      }
    </script>
  </head>
  <body>
    <div id="chart_div" style="width: 400px; height: 120px;"></div>
  </body>
</html>
*/
