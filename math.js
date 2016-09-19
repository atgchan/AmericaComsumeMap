exports.absolute = function(number) {
  return number < 0 ? -number : number;
}

exports.power = function(root, power) {
  var ret = 1;
  for(var i = 0; i < power; ++i) {
    ret *= root;
  }
  return ret;
}
