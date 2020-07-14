import { Component, OnInit } from '@angular/core';
import {IProducts } from '../products/products';
import { ProductsService } from '../products/products.service';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  dashboardData:IProducts[];
  private _unsubscribeAll: Subject<any>;
  sub:Subscription;
  popularInterests: any[] = [];
  popularSkills:any[] = [];
  graphsPoints:any;

  constructor(private _productsService :ProductsService ) { 
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.sub =  this._productsService.getProducts()
    .subscribe(nwdata => {
       this.dashboardData = nwdata;
        this.interestsHorizontalGraph();
        this.skillsVerticleGraph();
    })

    // this.graphsPoints = [
    //   {x1:40,y1:10, x2:65, y2:10,  x:50, y:10},
    //   {x2:150,y2:400, x:350, y:80},
    //   {x2:200,y2:450, x:350, y:80}
    // ]
  }

  interestsHorizontalGraph(){
    const interestNames:string[] = [];
    const allInterests:string[] = [];
    const allInterestPercentages = [];

    this.dashboardData.forEach( interests => {
      interests.interests.forEach(interest => { 
        //get list of all interest names
        allInterests.push(interest);
        //get unique interests, push into array 
        if(interestNames.indexOf(interest) == -1){
          interestNames.push(interest)
        }
      });
    })
    
     

    // make list of percentages
    for(let i=0; i< 6 ; i++){
      let randomIndex = Math.floor(Math.random() * interestNames.length);
      //loop through each interest, count how many have instance names appear in the list
      let count:number = allInterests.filter(x => x === interestNames[randomIndex]).length;
      //get total unique interest names
      const totalNames = interestNames.length;
      //make percent of the unique interest out of total
      const interestPercent:number = ((count/totalNames)* 100);
      var interestPercentIndexObj = {
        index:randomIndex,
        percent:interestPercent
      }
      //add to percent lists
      allInterestPercentages.push(interestPercentIndexObj);
     }

     //get the value of the highest percent
     let interestPercentMax = Math.max.apply(Math, allInterestPercentages.map(x => x.percent));

     for(let i=0; i< 6 ; i++){
      let randomindex = allInterestPercentages[i].index;
      let count:number = allInterests.filter(x => x === interestNames[randomindex]).length;
      let groupedinterestPercent = ((allInterestPercentages[i].percent/interestPercentMax) * 100)
      
      let interestObj = {
        name: interestNames[randomindex],
        count: groupedinterestPercent.toFixed(1) 
      }
      this.popularInterests.push(interestObj)
    }
     
    console.log(this.popularInterests)
  }

  skillsVerticleGraph(){
    const skillsNames:string[] = [];
    const allSkills:string[] = [];
    const allSkillsPercentages = [];

    this.dashboardData.forEach( skills => {
      skills.skills.forEach(skills => { 
        //get list of all interest names
        allSkills.push(skills);
        //get unique interests, push into array 
        if(skillsNames.indexOf(skills) == -1){
          skillsNames.push(skills)
        }
      });
    })
    
     

    // make list of percentages
    for(let i=0; i< 8 ; i++){
      let randomIndex = Math.floor(Math.random() * skillsNames.length);
      //loop through each interest, count how many have instance names appear in the list
      let count:number = allSkills.filter(x => x === skillsNames[randomIndex]).length;
      //get total unique interest names
      const totalNames = skillsNames.length;
      //make percent of the unique interest out of total
      const interestPercent:number = ((count/totalNames)* 100);
      var interestPercentIndexObj = {
        index:randomIndex,
        percent:interestPercent
      }
      //add to percent lists
      allSkillsPercentages.push(interestPercentIndexObj);
     }

     //get the value of the highest percent
     let interestPercentMax = Math.max.apply(Math, allSkillsPercentages.map(x => x.percent));

     for(let i=0; i< 8 ; i++){
      let randomindex = allSkillsPercentages[i].index;
      let count:number = allSkills.filter(x => x === skillsNames[randomindex]).length;
      let groupedinterestPercent = ((allSkillsPercentages[i].percent/interestPercentMax) * 100)
      
      let interestObj = {
        name: skillsNames[randomindex],
        count: groupedinterestPercent.toFixed(1) 
      }
      this.popularSkills.push(interestObj)
    }
     
    console.log(this.popularSkills)
  }

  ngOnDestroy(): void
  {
    this.sub.unsubscribe()
  }

  
  // getGradientPath(){
  //   let arr = [52.5,95]
  //   let curves = "";
  //   for(let y=0; y<arr.length; y++) {
  //     curves +=  arr[y] + " " +  (y*10) + " ,";
  //   }
  //   console.log(curves)
  //   return "M 30 50  " + curves + "T 180 80 z";
  // }

  // getCurvedPath(){
  //   let basis =  "M 10 30 C " + this.graphsPoints[0].x1 + " " + this.graphsPoints[0].y1  + " , " +
  //                   this.graphsPoints[0].x2 + " " + this.graphsPoints[0].y2 + " , " +
  //                   this.graphsPoints[0].x  + " "  + this.graphsPoints[0].y + " , "

  //   let assembleCurve = "";

  //   for(let y=0; y<this.graphsPoints.length; y++) {
  //     let s = " S "
  //     if(y > 0) {
  //       assembleCurve += s + this.graphsPoints[y].x2 + " "  + this.graphsPoints[y].y2 + "," + 
  //       this.graphsPoints[y].x +  " " + this.graphsPoints[y].y;
  //     }
  //   }

  //     return basis + assembleCurve  +  " v 35 25, H 10 10 z"
  //   console.log(this.graphsPoints)
  //   //40 10, 65 10, 95 80 S 150 150, 180 80";
  //   //return "M 10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80";
  // }

}
