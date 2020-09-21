import React from 'react';
import {bubblesort} from './bubblesort.js'
import {getmergesort} from './mergesort.js'
import {quicksort} from './quicksort.js'
import './Sorting.css';

const PRIMARY_COLOR = 'GREEN';
const SECONDARY_COLOR ="orange";
const CHANGE_COLOR  ='red';
const END_COLOR='#639cd9';
const pivitcolor='red';
const HOLD_COLOR='blue';
let poles=70;
let wd=10;
let mr=3;
let speed=5;
export default class Sorting extends React.Component{
  constructor(props){
    super(props);
    this.state={
      array:[],
    };
    this.handleChangespeed=this.handleChangespeed.bind(this);
    this.handleChangepol=this.handleChangepol.bind(this);
  }
  handleChangepol(event){
    poles=event.target.value;
    //(poles+"||||");
    if(poles<20){
    wd=20;
    mr=3;
    }
    else if(poles<100){
      wd=10;
      mr=3;
    }
    else if(poles<150){
      wd=7;
      mr=3;
    }
    else if(poles<200){
      wd=5;
      mr=2;
    }
    else if(poles<250){
      wd=4;
      mr=2;
    }
    else if(poles<300){
      wd=3;
      mr=2;
    }
    else{
      wd=3;
      mr=1;
    }
    this.generateArray();
  //this.colourchange();
  }
  handleChangespeed(event){
    ////("0000 ----  "+event.target.value);
     speed=(102-event.target.value);
    //("++++--  "+speed);
  }
  componentDidMount(){
    this.generateArray();
  }
  generateArray(){
    const array=[];
    //const {poles}=this.state;
    //("generateArray    "+poles);
    for(let i=0;i<poles;i++){
      array.push(randomnum(10,650));
    }
    this.setState({array});
  }
  colourchange(){
    //const {poles}=this.state;
    //("=|=|=|=|  "+poles);
      this.generateArray();
    for(let i=0;i<poles;i++){
      //("--------------------- "+i+"-----------");
      const arrayBars = document.getElementsByClassName('bars');
      const arraystyle=arrayBars[i].style;
      arraystyle.backgroundColor=PRIMARY_COLOR;
    }

  }

  quicksortpress(){

    //(speed+" quick");
    let i,x;
    const animate=quicksort(this.state.array);
    const arrayBars=document.getElementsByClassName('bars');
    const len=animate.length;
  //  //(animate);
    for(i=0;i<len;i++){
      ////(animate[i]);
      const [res,id]=animate[i];
      if(res===true){
        const pivitstyle=arrayBars[id].style;
        setTimeout(() => {
          pivitstyle.backgroundColor=END_COLOR;
        }, i * speed);
      }
      else{
      i++;
      const [st,end] = animate[i];
      ////(animate[i]);
      const pivitstyle=arrayBars[end].style;
      setTimeout(() => {
        pivitstyle.backgroundColor=pivitcolor;
      }, i * speed);
      let n=(end-st)*3;
      for(x=0;x<n;x++){
        i++;
        ////(i+" "+x);
        const change=x%3;
        if (change!==2) {
          const [barOneIdx,barTwoIdx]=animate[i];
        ////("=== "+barOneIdx+"   "+barTwoIdx);
          if(barOneIdx>(st-1)){
            const barOneStyle= arrayBars[barOneIdx].style;
            const barTwoStyle= arrayBars[barTwoIdx].style;
            if((change===0)){
                setTimeout(() => {
                  barOneStyle.backgroundColor=HOLD_COLOR;
                barTwoStyle.backgroundColor=SECONDARY_COLOR;
              }, i * speed);
            }
            else{
              setTimeout(() => {
                  barOneStyle.backgroundColor=PRIMARY_COLOR;
                barTwoStyle.backgroundColor=PRIMARY_COLOR;
                }, i * speed);
            }
          }
          else{
              const barTwoStyle= arrayBars[barTwoIdx].style;
            if((change===0)){
                setTimeout(() => {
                barTwoStyle.backgroundColor=SECONDARY_COLOR;
                }, i * speed);
              }

            else{
                setTimeout(() => {
                barTwoStyle.backgroundColor=PRIMARY_COLOR;
                }, i * speed);
            }
          }
        }
          else{
            const [barOneIdx,barTwoIdx,value1,value2]=animate[i];
          ////("=== "+barOneIdx+"   "+barTwoIdx+"   "+value1+"   "+value2);
            if(barOneIdx>(st-1)){
              const barOneStyle= arrayBars[barOneIdx].style;
              const barTwoStyle= arrayBars[barTwoIdx].style;
              if(value1!==0){
                setTimeout(() => {
                  barOneStyle.height=`${value1}px`;
                  barTwoStyle.height=`${value2}px`;
                }, i * speed);
          }
            }
          }
          ////(animate[i]);
        }
        i++;

        const [barOneIdx,barTwoIdx,value1,value2]=animate[i];

        const barOneStyle= arrayBars[barOneIdx].style;
        const barTwoStyle= arrayBars[barTwoIdx].style;

        setTimeout(() => {
          barTwoStyle.backgroundColor=PRIMARY_COLOR;
          barOneStyle.backgroundColor=END_COLOR;
         barOneStyle.height=`${value1}px`;
          barTwoStyle.height=`${value2}px`;
        }, i * speed);
////("-------------------------");
}
      }
    }
  mergesortpress(){
      //(speed+" merge");
      let n=this.state.array.length-1;
      let hook=Math.floor((n/2));
      let i;
      const animate = getmergesort(this.state.array);
      for ( i = 0; i < animate.length; i++) {
        const arrayBars = document.getElementsByClassName('bars');
        const isColorChange = i % 3 !== 2;
        if (isColorChange) {
          let color;
          const [barOneIdx, barTwoIdx] = animate[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;

          color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;

          setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * speed);
        } else {
          const [barOne, barTwo] = animate[i-1];
          if (((barOne>=0)&&(barOne<=hook))&&(barTwo>hook)) {
            break;
          }
          const [barOneIdx, newHeight] = animate[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          setTimeout(() => {
            barOneStyle.height = `${newHeight}px`;
          }, i * speed);

        }
        ////("i  "+i+" "+animate[i]);
      }

      const l=(animate.length)-1;
    //  //("i "+i+" l "+l);
      const arr=[];
      const main=[];
      for(let j=i-2;j<=l;j++){
        if ((j%3)!==2) {

          arr.push(animate[j]);
        }
        else{
          main.push(animate[j]);

        }
      }
    //  //((arr.length)+(main.length));
      let x=0,y=0;
      for(;(x+y)<((arr.length)+(main.length));){
        const arrayBars = document.getElementsByClassName('bars');
        if (((x+y)%3)!==2) {
          let color;

          const [barOneIdx, barTwoIdx] = arr[x];

          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          color = x % 2 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
          setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i* speed);
          x++;
        }
        else{
          const [barOneIdx, newHeight] = main[y];

          const barOneStyle = arrayBars[barOneIdx].style;
          setTimeout(() => {
            barOneStyle.height = `${newHeight}px`;
            barOneStyle.background=END_COLOR;
          }, i * speed);
          y++;

        }
        i++;
      }
    }
  bubbleSortpress(){
      //const speed=102-this.state.speed;
      //(speed+" bs");

      let n=this.state.array.length;

      let count=((n-1)*4)-1;//to get the index of last sorted element
      // Array that stores the animations indexe
      const animate = bubblesort(this.state.array);
      for(let i=0;i<animate.length;i++){
        const arraybar= document.getElementsByClassName("bars");
        const ischange= i%4;
        if ((ischange===0)||(ischange===2)) {
          const [barone,bartwo]=animate[i];

          const baronestyle=arraybar[barone].style;
          const bartwostyle=arraybar[bartwo].style;
          let color = i%4===0?SECONDARY_COLOR:PRIMARY_COLOR;
          setTimeout(()=>{
            baronestyle.backgroundColor=color;
            bartwostyle.backgroundColor=color;
          },i*speed);
        }
        else if (ischange===1) {
          const [barone,bartwo,ele1,ele2]=animate[i];
          if (ele1>ele2) {
            const color=CHANGE_COLOR;
            const baronestyle=arraybar[barone].style;
            const bartwostyle=arraybar[bartwo].style;
            setTimeout(()=>{
              baronestyle.backgroundColor=color;
              bartwostyle.backgroundColor=color;
            },i*speed);
          }

        }
        //Swapping of arrays if unequal
        else{
          const [barone,bartwo,pair1,pair2]=animate[i];
          let baronestyle=arraybar[barone].style;
          let bartwostyle=arraybar[bartwo].style;
          setTimeout(()=>{
            baronestyle.height=`${pair1}px`;
            bartwostyle.height=`${pair2}px`;
          },i*speed);

        }
        if (i===count) {
          const color=END_COLOR;
          const [barone,bartwo,,]=animate[i];
          const baronestyle=arraybar[barone].style;
          const bartwostyle=arraybar[bartwo].style;
          setTimeout(()=>{
            bartwostyle.backgroundColor=color;
          },i*speed);
          n--;
          count+=((n-1)*4);
          if (barone===0) {
            setTimeout(()=>{
              baronestyle.backgroundColor=color;
            },i*speed);
          }
        }
      }
    }


    render() {
      const {array} = this.state;

      return (
          <div className="form">
        <div className="array-box">
        {
          array.map((value, idx) => (
          <div
          className="bars"
          key={idx}
          style={{backgroundColor: PRIMARY_COLOR,height: `${value}px`,width:`${wd}px`,marginRight:`${mr}px`}}>
          </div>
        ))}
        </div>
        <div className="Tools">
        <div className="para"><p>Array Size</p> <input type="range" min="10" max="380" value={this.state.poles}
          onChange={this.handleChangepol} step="1" className="range1"/>
          <p>Speed</p>  <input type="range" min="1" max="100" value={this.state.speed}
          onChange={this.handleChangespeed} step="1" className="speed"/>
</div> <div className="buttonbox">
        <button onClick={() => this.colourchange()} className="button">New Array</button>
        <button onClick={() => this.mergesortpress()} className="button">Merge Sort</button>
        <button  onClick={() => this.quicksortpress()} className="button">Quick Sort</button>
        <button onClick={() => this.bubbleSortpress()} className="button">Bubble Sort</button>
        </div>
        </div>
        </div>
      );
    }
  }
  function randomnum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
