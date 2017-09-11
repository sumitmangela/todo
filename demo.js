var myList = document.getElementById("list");
var doneList = document.getElementById("donelist");

var todo = [];
var todone = [];





var temp;
var count = 0, countDone = 0, x = 0, y = 0;
var flag= true;


function save_count() //for saving counts in local storage
{
  var localCount = count;
  var localCountDone = countDone;
  localStorage.setItem("count",localCount);
  localStorage.setItem("countDone",localCountDone);
}

function get_count() //for retreiving counts from local storage
{
  var localCount = localStorage.getItem("count");
  var localCountDone = localStorage.getItem("countDone");
  count = localCount;
  countDone = localCountDone;
  
  console.log(count);
  console.log(countDone);
}


function save_list() //for saving counts in local storage
{
  var str = JSON.stringify(todo);
  var str1 = JSON.stringify(todone);
  localStorage.setItem("todo",str);
  localStorage.setItem("todone",str1);
  
}

function get_list() //for retreiving counts from local storage
{
  var str = localStorage.getItem("todo");
  var str1 = localStorage.getItem("todone");
 
  todo = JSON.parse(str);
  todone = JSON.parse(str1);
  if(!todo){
    todo = [];
  }
  if(!todone){
    todone = [];
  }
 
  console.log(todo);
  console.log(todone);
  
}




get_count();  // getting count values from local storage

get_list(); //getting list values from local storage



var todoCount = count;
var todoneCount = countDone;


while(todoCount>0) //displaying todo list
{
additem_todo('todo');
todoCount--;
}

while(todoneCount>0) //displaying done list
{
additem_todo('todone');
todoneCount--;
}




//runs on input enter
function additem_whenenter(e){
        if(e.keyCode === 13){
            e.preventDefault(); 
            additem_todo('new');
          }

        }


//function to add a list item
function additem_todo(flag){
        
          //declaring new element

          var item     = document.createElement("li");
          var span    = document.createElement("span");
          var check   = document.createElement("input");
          var spanimg = document.createElement("span");
          item.appendChild(check);
          
          item.appendChild(spanimg);
          item.appendChild(span);

          check.setAttribute('type', 'checkbox');
          check.classList.add("check-item");
          span.classList.add("list-item");
          spanimg.classList.add("glyphicon");
          spanimg.classList.add("glyphicon-remove");

           //adding new element to todo from local storage
           if(flag == 'todo')
          {
            //console.log(x);
            var itemContent= todo[x];
            span.innerHTML = itemContent; 
            myList.appendChild(item);
            x++;
            document.getElementById("noitem").style.display="none";
         
           
          }
           //adding new element to donelist from local storage
           else if(flag == 'todone')
          {
            //console.log(y);
            check.checked = true;
            var itemContent= todone[y];
            span.innerHTML = itemContent; 
            doneList.appendChild(item);
            y++;
            document.getElementById("doneitem").style.display="none";

           
          }
               //adding new element to todo from user input
           else{ 
            var itemContent= document.getElementById("itemname");
            todo.push(itemContent.value);  
            save_list();
            span.innerHTML = itemContent.value; 
            myList.appendChild(item);
            itemContent.value = "";
            count++;
            save_count();
            display_title();
              }





    //checkbox done element
    check.addEventListener("change", function(){
        
     var doneItem = this.parentElement;
     temp = doneItem.childNodes[2].innerHTML;
         if(myList.id == this.parentElement.parentElement.id) // checking if  todolist or done list
         {
           myList.removeChild(doneItem);
           span.innerHTML = temp; 
           doneList.appendChild(item);
           count--;
           countDone++;
           todone.push(temp);
           for(var i=0;i<todo.length; i++)
           {
             if(temp == todo[i]) 
              todo.splice(i, 1);
          } 
        }
        else
        {
         doneList.removeChild(doneItem);
         span.innerHTML = temp; 
         myList.appendChild(item);
         count++;
         countDone--;
         todo.push(temp);
         for(var i=0;i<todone.length; i++)
         {
           if(temp == todone[i]) 
            todone.splice(i, 1);
        }
      }
       save_list();
       save_count();
       display_title(); // function for hiding or diplaying item titles
        });

   //delete element
    spanimg.addEventListener("click", function(){
         
         var removeItem = this.parentElement;
         temp = removeItem.childNodes[2].innerHTML;

         if(myList.id == this.parentElement.parentElement.id)
         {
           myList.removeChild(removeItem);
           count--;
           for(var i=0;i<todo.length; i++)
           {
             if(temp == todo[i]) 
              todo.splice(i, 1);
          }

        }
        else{
         doneList.removeChild(removeItem);

         countDone--;

         for(var i=0;i<todone.length; i++)
         {
           if(temp == todone[i]) 
            todone.splice(i, 1);
        }
      }     
         save_list();

         save_count();
         display_title();

        }); 

// change on double click function
   span.addEventListener("dblclick", function(){

      var data = this.innerHTML;
      var parent = this.parentElement;
      //parent.removeChild(this);
         span.innerHTML = "";


      var form = document.createElement("span");
      var text = document.createElement("input");
      var ok = document.createElement("button");
      var cancel = document.createElement("button");

      text.value = data;
      ok.innerHTML = "OK";
      cancel.innerHTML ="Cancel";



      form.appendChild(text);
      form.appendChild(ok);
      form.appendChild(cancel);


      //parent.appendChild(form);
      span.appendChild(form);

      ok.addEventListener("click", function(){
      //parent.removeChild(span);
      span.removeChild(form);

      for(var i=0;i<todo.length; i++)
           {
             if(data == todo[i]) 
             {
             todo[i] = text.value;
             }
        
          }

      for(var i=0;i<todone.length; i++)
         {
           if(data == todone[i]) 
           {
            todone[i] = text.value;
            }
        }
             save_list();
      data = text.value ;
      span.innerHTML = data;
      parent.appendChild(span);
        //alert("ok");

      });

      cancel.addEventListener("click", function(){
           // parent.removeChild(span);
      span.removeChild(form);
      span.innerHTML = data;
      parent.appendChild(span);
       // alert("cancel");

      });
     
  
     
    });

   

    }


function display_title(){   

			if(count==0)   // hiding or diplaying item titles
         	{
         		document.getElementById("noitem").style.display="block";
         	}
         	if(count==1)
         	{
         		document.getElementById("noitem").style.display="none";
         	}
         	if(countDone==0)
         	{
         		document.getElementById("doneitem").style.display="block";
         	}
         	if(countDone==1)
         	{
         		document.getElementById("doneitem").style.display="none";
         	}

}


function remove_list(id){


	var root= document.getElementById(id);

	while( root.firstChild )  // delete all li in ul pointed by id
	{
  		root.removeChild( root.firstChild );

		}
    
  
  if(myList.id == id)
  {
  todo = [];
	count = 0;
  }
  else{
  todone = [];
  countDone = 0;
  }
  save_list();
  save_count();
	display_title();

}

// function additem(){
	
// 	var item = document.createElement("li");
// 	item.innerHTML = "item " + count; 
// 	myList.appendChild(item);

// }	