class title {
   constructor(){
    this.title = createElement('h1');
   }

   setElementsStyle() {
    this.title.class("gameTitle");
  }

   hide(){
      this.title.hide();
   }
   display(){
    this.title.html("WELCOME TO THE GALAXY INVADERS!");
    this.title.position(400, 90);
    this.title.style.color= "white";
    this.setElementsStyle(); 
   }
}