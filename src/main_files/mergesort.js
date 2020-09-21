export function getmergesort(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}
function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  let x=0,f=0;
  let n=auxiliaryArray.length-1;
  let m=Math.floor(n/2);
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
//console.log(" i "+i+" n "+n+" m "+m+" j "+j+" f "+f);
if ((i===0)&&(j===(m+1))){
  f=1;
  break;
}
    animations.push([i, j]);
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
    animations.push([k, auxiliaryArray[i]]);
mainArray[k++] = auxiliaryArray[i++];
}
else {
animations.push([k, auxiliaryArray[j]]);
mainArray[k++] = auxiliaryArray[j++];
}

}if(f===0){
  while (i <= middleIdx) {

    animations.push([i, i]);

    animations.push([i, i]);

    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {

    animations.push([j, j]);

    animations.push([j, j]);

    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}
  if (f===1) {
    while((i<=m)&&(j<=n)){
      //console.log(" i "+i+" n "+n+" m "+m+" j "+j+" f "+f+" a[i ] "+auxiliaryArray[i]+" a[j] "+auxiliaryArray[j]);
    animations.push([i, j]);
    animations.push([i, j]);
            if (auxiliaryArray[i] > auxiliaryArray[j]) {
            animations.push([x, auxiliaryArray[j]]);
    auxiliaryArray.splice(j,1);
    auxiliaryArray.splice(x,0,auxiliaryArray[j]);
    j++;
    i++;
    m++;
    x++;
    }
    else {
      animations.push([x, auxiliaryArray[i]]);
      i++;
      x++;
    }
  }

  while (i <= m) {

    animations.push([i, i]);

    animations.push([i, i]);

    animations.push([x, auxiliaryArray[i]]);
    i++;
    x++;
  }
  while (j <= n) {

    animations.push([j, j]);

    animations.push([j, j]);

    animations.push([x, auxiliaryArray[j]]);
  j++;
  x++;
  }
}

}
