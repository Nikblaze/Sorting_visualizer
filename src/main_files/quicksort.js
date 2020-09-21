export function quicksort(array) {

  const ani = [];
  const n= array.length;
  if (array.length <= 1) return array;
  Qs(array,0,n-1,ani);
  return ani;
}
function parti( arr,st,end,ani){
 let piv=arr[end];
 ani.push([st,end]);
 let i=st-1,j,t;
for(j=st;j<end;j++){
  ani.push([i,j]);
  ani.push([i,j]);
  if(arr[j]<piv){
    i++;
    if(i===j) ani.push([i,j,0,0]);
    else ani.push([i,j,arr[j],arr[i]]);
    t=arr[j];
    arr[j]=arr[i];
    arr[i]=t;
  }
  else{
    ani.push([i,j,0,0]);
  }

}
ani.push([i+1,end,arr[end],arr[i+1]]);
t=arr[end];
arr[end]=arr[i+1];
arr[i+1]=t;
return i+1;
}
function Qs(arr,st,end,ani){
  if(st===end) ani.push([true,st]);
  else if(st<end){
    ani.push([false,st]);
  let pi=parti(arr,st,end,ani);
  Qs(arr,st,pi-1,ani);
  Qs(arr,pi+1,end,ani);
}
}
