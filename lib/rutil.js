module.exports = {
  removeDuplicates: removeDuplicates,
  same: same,
  sameArr: sameArr,
  leastKeys: leastKeys,
  countKeys: countKeys,
  containsKey: containsKey,
  mergeIfOneIsFunctional: mergeIfOneIsFunctional,
  rightIsFunc: rightIsFunc,
  leftIsFunc: leftIsFunc
};

function removeDuplicates (merged) {
var unique = [];
var i = merged.length;
for (; i--;) {
  var j = i;
  var thereIsTheSame = false;
  for (; j--;) {
    if (same(merged[i], merged[j])) {
      thereIsTheSame = true;
    }
  }
  if (!thereIsTheSame) {
    unique.push(merged[i]);
  }
}
return unique;
}

function same (rel1, rel2) {
  if (rel1.rel !== rel2.rel) {
    return false;
  } else if (rel1.kvf.length !== rel2.kvf.length) {
    return false;
  }          
  var r1 = rel1.kvf;
  var r2 = rel2.kvf;
  var i  = r1.length;
  for (; i--;) {    
    var exists = false;
    var j = r2.length;
    for (; j--;) {
      if (r1[i].k === r2[j].k && r1[i].v === r2[j].v && sameArr(r1[i].f, r2[j].f)) {
        exists = true;
        break;
      }
    }
    if (!exists) {
      return false;
    }
  }
  return true;
}

function sameArr (r1, r2) {
  if (r1) {
    if (r2) {
      if (r1.length === r2.length) {
        var i = r1.length;
        for (; i--;) {
          if (r1[i] !== r2[i]) {
            return false;
          }
        }
        return true;
      } else {
        return false;
      }             
    } else {
      return false;
    }
  } else {
    if (r2) {
      return false;
    } else {
      return true;
    }
  }
}

function leastKeys (cross) {
  var min = countKeys(cross[0]);
  cross.forEach(function(c){
    var count = countKeys(c);
      if(count < min){
      min = count;
    }
  });
  return min;
}

function countKeys (rel) {
  var count = 0;
  rel.kvf.forEach(function(kvf){
    count += kvf.k ? 1 : 0;
    count += kvf.v ? 1 : 0;
  });
  return count;
}

function containsKey (arr, key) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].k === key && ( !arr[i].v || arr.length > 1 )) {
      return true;
    }
  }
  return false;
}

function mergeIfOneIsFunctional (l, r) {
  return rightIsFunc(l, r) || leftIsFunc(l, r);
}

function rightIsFunc (l, r) {
  if(r.kvf.length === 1 && !r.kvf[0].k){
    if(!(l.kvf.length === 1 && !l.kvf[0].k)){
      var arr = [];
      l.kvf.forEach(function(e){
        arr.push({k: e.k, v: e.v, f: e.f});
      });
      var obj = {rel: l.rel, def: l.def || r.def, kvf: arr};
      for(var kv = obj.kvf.length - 1; kv >= 0; kv--){
        if(obj.kvf[kv].k){
          if(!obj.kvf[kv].f){
            obj.kvf[kv].f = [];
          }
          r.kvf[0].f.forEach(function(e){obj.kvf[kv].f.unshift(e)});
          return obj;
        }
      }
    }
  }
}

function leftIsFunc (l, r) {
  if(l.kvf.length === 1 && !l.kvf[0].k){
    if(!(r.kvf.length === 1 && !r.kvf[0].k)){
      var arr = [];
      r.kvf.forEach(function(e){       
        arr.push({k: e.k, v: e.v, f: e.f});
      });
      var obj = {rel: r.rel, def: r.def || l.def, kvf: arr};
      for(var kv in obj.kvf){
        if(obj.kvf[kv].k){		
          if(!obj.kvf[kv].f){
            obj.kvf[kv].f = [];
          }
          l.kvf[0].f.forEach(function(e){obj.kvf[kv].f.push(e)});
          return obj;
        }
      }
    }
  }
}
