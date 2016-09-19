$(function() {
  var _prevPath;
  var _prevColor;
  var isReset = false;

  var setInfo = function(aveType) {
    $.get('/info/' + aveType, function(res) {
      var result = JSON.parse(res);
      var gb = 0;
      var order = 1;
      $(".order").html('');
      for(var i=0, keys=Object.keys(result), l=keys.length; i<l; ++i)
      {
        var _obj = $("#US_States > path[state='" + result[i]._id + "']");

        if(_obj[0] == undefined) continue;

        var gb16 = gb.toString(16);
        if(gb16.length == 1) gb16 = "0" + gb16;
        d3.select(_obj[0]).style("fill", "#ff"+ gb16 + gb16);
        gb += 4;

        var name = d3.select(_obj[0]).attr("id");
        var addString = "<div>" + order + "위: " + name + "</div>";
        ++order;
        $(".order").append(addString);
      }
    });
    isReset = true;
  };

  $(".electDisplay").click(function(event) {
    setInfo("aveElect");
  });

  $(".rentDisplay").click(function(event) {
    setInfo("aveRent");
  });

  $(".incomeDisplay").click(function(event) {
    setInfo("aveIncome");
  });

  $("#US_States").click(function(event) {
    if(!isReset) {
      d3.select(_prevPath).style("fill", _prevColor);
    }
    var _path = event.target;
    _prevPath = _path;
    isReset = false;
    _prevColor = d3.select(_path).style("fill");
    d3.select(_path).style("fill", "darkblue");
    var _name = d3.select(_path).attr("id");
    var _state = d3.select(_path).attr("state");
    $(".state_name").text(_name);

    $.get('/info/aveElect/' + _state, function(res) {
      var result = JSON.parse(res);
      $(".electricity").text('$' + result[0].ave);
    });

    $.get('/info/aveRent/' + _state, function(res) {
      var result = JSON.parse(res);
      $(".rent").text('$' + result[0].ave);
    });

    $.get('/info/aveIncome/' + _state, function(res) {
      var result = JSON.parse(res);
      $(".income").text('$' + result[0].ave);
    });
  });
});
