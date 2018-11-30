function range(from,to){
  return from < to
    ? _range(from,to)
    : _range(to,from).reverse();
  function _range(from,to){
    var numbers = [];
    for(var n=from; n<=to; n++){
      numbers.push(n);
    }
    return numbers;
  }
}

function pairwise(array){
  if(!array || !array.length || array.length < 2){
    return [];
  }
  let pairs = [];
  let prev = array[0];
  for(var i=1; i<array.length; i++){
    let next = array[i];
    pairs.push([prev, next]);
    prev = next;
  }
  return pairs;
}

function zip(array1, array2){
  var pairs = [];
  for(var i=0; i<array1.length && i<array2.length; i++){
    pairs.push([array1[i], array2[i]])
  }
  return pairs;
}

function zipWith(array1, array2, fn){
  var pairs = [];
  for(var i=0; i<array1.length && i<array2.length; i++){
    pairs.push(fn(array1[i], array2[i]));
  }
  return pairs;
}

function prioritizedMap(){
  let _items = [];
  let _keyToItem = new Map();
  return {
    popTop: () => {
      let item = _items.shift();
      if(!!item){
        _keyToItem.delete(item.key);
      }
      return item;
    },
    has: key => _keyToItem.has(key),
    get: key => {
      if(!_keyToItem.has(key)){
        throw key.toString();
      }
      return _keyToItem.get(key).priority;
    },
    delete: key => {
      let item = _keyToItem.get(key);
      if(!item){
        return;
      }
      let index = _items.indexOf(item);
      if(index > -1){
        _items.splice(index,1);
      }
    },
    set: (key,priority) => {
      let item = _keyToItem.has(key) ? _keyToItem.get(key) : {key};
      item.priority = priority;
      let index = _items.indexOf(item);
      if(index > -1){
        _items.splice(index,1);
      }
      _keyToItem.set(key,item);
      _items.push(item);
      _items.sort((a,b) => a.priority - b.priority);
    }
  };
}

function concatAll(arrays){
  return Array.prototype.concat.apply([], arrays);
}