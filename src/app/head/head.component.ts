import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { NgModule } from '@angular/core';
import { newArray } from '@angular/compiler/src/util';
declare var $:any;
@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})



export class HeadComponent implements OnInit {
  
  slideConfig={"slidesToShow": 4, "slidesToScroll": 4};

/*************search***********************/
getByWord = document.getElementById("getByWord");

onSearch(event){
    const searchVal= event.target.value;

    if(searchVal ==""){
this.trend();
    }
    else{
      
  this._Api.getByWord(searchVal).subscribe((x)=>{
  
    this.movieArray=x.results;
   
  },(err)=>{
    console.log(err)
  });

    }
}


/*****open & close => side bar******/


open(){
    
  $(".open-menu-con").css({
    transform: "translatex(0)"
});
$(".menu-con").css({
transform: "translatex(250px)"
});

$(".toggle-icon .open").hide(400,function(){
  
$(".toggle-icon .close").show(400);
})

$(".open-menu-con ul li").css({
transform: "translateY(0)"
})

}

close(){

  $(".open-menu-con").css({
    transform: "translatex(-250px)"
});

$(".menu-con").css({
    transform: "translatex(0)"
       });

       $(".toggle-icon .close").hide(400,function(){
          $(".toggle-icon .open").show(400)

       });

       $(".open-menu-con ul li").css({
        transform: "translateY(400px)"
        })
}



/*****get movies and select between categories******/
movieArray ;
term="now_playing";
imagePath:string="https://image.tmdb.org/t/p/w500";
arrNumOfPages;
numOfPages=16;





getArray(){
 this.arrNumOfPages= new Array (this.numOfPages);
}



selectMovies(event){
 
 
  this.term =event.target.id;

  this._Api.getMovie(this.term).subscribe((x)=>{
 

/******** */
console.log(x)
///////////////////////////this.numOfPages= x.total_pages;

 this.getArray();

// console.log(this.arrNumOfPages);






/******** */
    this.movieArray=x.results;
   
  },(err)=>{
    console.log(err)
  });
}


clickedLi(event){

// console.log(event.target.innerHTML);

this.getPageFun(event.target.innerHTML)
}

getPageFun(num){
this._Api.getPage(this.term,num).subscribe((p)=>{

  // console.log(p)
  this.movieArray = p.results;
},(err)=>{console.log(err)})
}

trend(){
  this._Api.getTrending().subscribe((y)=>{

    /************ */

    // console.log(y)
   /////////////////////////////////////////// this.numOfPages= y.total_pages;
   this.numOfPages = 20;
    this.getArray();
    
    // console.log(this.arrNumOfPages);
    
    /**************** */
    this.movieArray=y.results;
   
  },(err)=>{
    console.log(err)
  });

}





/*****contact btn********/
contact(){
  let id = $("#contact-h").offset().top;
  // console.log(id)

  $("body,html").animate({
    scrollTop:id
  },1000)
}

                                      /*****validate contact******/
 nameValid:boolean = false;
 emailValid:boolean = false;
 ageValid:boolean = false;
 passValid:boolean = false;
 rePassValid:boolean = false;
 phoneValid:boolean = false;
 pass;

  nameRegex:any = /^[A-Za-z ]{3,15}$/;
  phoneRegex = /^(011||012||010||015)[0-9]{8}$/;
  emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  ageRegex =/^([1-7][0-9]||80)$/;
  passRegex = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/;
 

 

  onKeyName(event) {

    const inputValue = event.target.value;
  
  if(this.nameRegex.test(inputValue)){
   $("#nameAlert").hide();

this.nameValid=true;
return true;
  }
  else{
    $("#nameAlert").show();
    this.nameValid = false
    return false;
  }
  }
  onKeyEmail(event) {

    const inputValue = event.target.value;

  if(this.emailRegex.test(inputValue)){
   $("#emailAlert").hide();
   this.emailValid = true
return true ;

  }
  else{
    $("#emailAlert").show();
    this.emailValid = false;
    return false;
  }
  }
  onKeyPhone(event) {

    const inputValue = event.target.value;

  if(this.phoneRegex.test(inputValue)){
   $("#phoneAlert").hide();
   this.phoneValid = true;
return true ;

  }
  else{
    $("#phoneAlert").show();
    this.phoneValid = false ;
    return false;
  }
  }
  onKeyAge(event) {

    const inputValue = event.target.value;

  if(this.ageRegex.test(inputValue)){
   $("#ageAlert").hide();
   this.ageValid = true ;
return true;

  }
  else{
    $("#ageAlert").show();
    this.ageValid = false
    return false ;
  }
  }
  
  onKeyPass(event) {

    const inputValue = event.target.value;
  this.pass = inputValue ;
  if(this.passRegex.test(inputValue)){
   $("#passAlert").hide();

this.passValid = true ;
return this.pass ;
  }
  else{
    $("#passAlert").show();
    this.passValid = false ;
    return false ;
  }
  }
  onKeyRePass(event) {

    const inputValue = event.target.value;



  if(inputValue != this.pass ){
   
   $("#rePassAlert").show();
this.rePassValid = false;
return false ;
  }

 else{
     $("#rePassAlert").hide();
     this.rePassValid = true ;
     return true ;
   }
  }
  

                                        /*****constructor******/


  constructor(private _Api:ApiService) { 
    // $(element).slick()
    
    _Api.getMovie(this.term).subscribe((x)=>{

      this.getArray()
      this.movieArray=x.results;
     
    },(err)=>{
      console.log(err)
    });

  }
valid:boolean= true;

  ngOnInit(): void {
    

    setInterval(()=>{
      if(this.nameValid
        &&this.emailValid 
        &&this.phoneValid 
        &&this.ageValid  
        &&this.passValid
        &&this.rePassValid ==true  ){
this.valid = false;

      }
      else{ 
        this.valid = true;
       
      }
    },1000)
   
  }



}





/******** zebala */



// pop(){


//   // console.log(e.target)
//   // this.term = $(this).attr("id");

//   // console.log($(this).attr("id"))


//   this.term = "popular"

//   this._Api.getMovie(this.term).subscribe((x)=>{

      
//     this.movieArray=x.results;
   
//   },(err)=>{
//     console.log(err)
//   });
// }
// top(){
  
//   this.term = "top_rated";

//   this._Api.getMovie(this.term).subscribe((x)=>{

      
//     this.movieArray=x.results;
   
//   },(err)=>{
//     console.log(err)
//   });
// }
// up(){
  
//   this.term = "upcoming";

//   this._Api.getMovie(this.term).subscribe((x)=>{

      
//     this.movieArray=x.results;
   
//   },(err)=>{
//     console.log(err)
//   });
// }
