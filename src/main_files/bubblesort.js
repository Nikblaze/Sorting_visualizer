export function bubblesort(array){
  const ani=[];
  if (array.length<=1) return array;
  sortingFunction(array,array.length-1,ani);

  return ani;
}
function sortingFunction(main,end,ani){

  for (var i = 0; i <= end ; i++) {

    for (var j = 0; j < end-i ; j++) {
        ani.push([j,j+1]);
        ani.push([j,j+1,main[j],main[j+1]]);
        ani.push([j,j+1]);
        if (main[j]>main[j+1]) {
            ani.push([j,j+1,main[j+1],main[j]]);
              var t=main[j];
              main[j]=main[j+1];
              main[j+1]=t;
        }
      else {
        ani.push([j,j+1,main[j],main[j+1]]);
      }

  }
}
}
