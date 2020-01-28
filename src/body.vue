<template>
<section class="container">
<div class="row" id="rowcards">
	<i class="fa fa-spinner fa-spin"></i>
</div>
	<button class="linkadd" title="Add a new link" id="linkadd" @click="start">
	<i class="fa fa-link mainicon"></i>


	</button>
	</section>
</template>
<script>
export default {
	data:function(){
	return{
	
    userlogged:false,
    email:null,
    username:null,
    password:null,
    link:'',
    linktitle:'',
    linkabt:'',
    links:'',
	}
	},
	mounted(){
	document.getElementById("rowcards").innerHTML="";
	var links = (localStorage.getItem("links")).split("|");
	var cl = links.filter(function () { return true });

	
	links = cl.join("|");
	localStorage.setItem('links',links);
	alert(cl)
	alert(links);
	this.loadlinks();
	},
	methods:{

	loadlinks:function(){
	document.getElementById("rowcards").innerHTML="";
	var links = localStorage.getItem("links");
	var n = links.split("|");
	
	this.links=n;
	var arr = n;
	arr.forEach((it,index)=>{
	if(it.trim()==""){
	//empty strings 
	}
	else {
	var item = JSON.parse(it);
	
	var ht = `<div class="card col-md-4 text-white" style="background:#111429;max-width: 18rem;" onclick="more(${index})">
	<img src="img/logo.png" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${item.linktitle}</h5>
      <p class="card-text">${item.linkabout}</p>

    </div>
    <div class="card-footer light-bg">
    <small class="text-muted light-bg smcl">
    <a class="linka" href="${item.link}" target="_blank">
    ${item.link}
    </a>
    <i class="fa fa-copy text-white" data-toggle="tooltip" data-placement="right" title="Copy link"></i>
    </small>
    </div>
    <div class="card-footer ">
      <small class="text-muted">${item.date}</small>
    </div>
  </div>`;
	var e = document.getElementById("rowcards").innerHTML;
	var v = e+ht;
	document.getElementById("rowcards").innerHTML=v;
	}
	});
	},
	
	start:function(){
	try{
    if(!this.userlogged){
   
    var logged = localStorage.getItem("logged");
    
    if(logged||logged=="true"){
    this.userlogged = true;
    let user = localStorage.getItem("user");
    let i = JSON.parse(user);
    this.username = i.username;
    this.password = i.password;
    this.email = i.email;
	this.savelink();
    }
    else {
    
      this.$swal({
      icon:"warning",
      text:"You are not signed In",
      confirmButtonText:"Sign In",
      showCancelButton:false,
      showCloseButton:true,
      confirmButtonColor:"#111429",
      allowOutsideClick:false,
      footer:"Sign In and save up your links for later",
      })
      .then((result)=>{
         
        if(result.value){
          this.$swal({
            icon:"question",
            text:"Enter your Email Address",
            input:"email",
            inputAttributes:{
            required:true,
            minLength:7,
            maxLength:30,
            },
            confirmButtonText:"Continue <i class='fa fa-arrow-right'></i>",
            showCancelButton:false,
            showCloseButton:false,
            allowOutsideClick:false,
            allowEnterKey:true,
            allowEscapeKey:false,
            confirmButtonColor:"#111429",
            validationMessage:"Enter a valid email address",
          })
          .then((data)=>{

          
          if(data.value){
          var email = data.value;
		if(email.trim()==""){
		this.$swal({
		icon:'error',
		text:'Please Enter a valid email and try again',
		});

          }
          else {
          this.email = email;
			this.$swal({
			icon:'question',
			text:'Choose a befitting username for yourself',
			input:"text",
			inputAttributes:{
			required:true,
			minLength:4,
			maxLength:12,
			placeholder:"Choose a username",
			},
			confirmButtonText:"Sign In",
            showCancelButton:false,
            showCloseButton:false,
            allowOutsideClick:false,
            allowEnterKey:true,
            allowEscapeKey:false,
            confirmButtonColor:"#111429",
            validationMessage:"Enter a valid email address",
			
			})
			.then((user)=>{
			if(user.value){
			var username = user.value;
			if(username.trim()==""){
				throw 'Invalid Username';
			}
			else {
			this.username = username;
			this.$swal({
			icon:'question',
			text:'Would you like to set up a password for LinkApp ?',
			confirmButtonText:"Yes ",
			cancelButtonText:"No ",
			showCancelButton:true,
            showCloseButton:false,
            allowOutsideClick:false,
            allowEnterKey:true,
            allowEscapeKey:false,
            confirmButtonColor:"#111429",
			})
			.then((decision)=>{
			if(decision.value){
			this.$swal({
			icon:'question',
			text:"Choose a password for LinkApp",
			input:'password',
			inputAttributes:{
			required:true,
			minLength:6,
			},
			validationMessage:"Enter a valid Password.Passwords must be more than five characters",
			})
			.then((pass)=>{
			if(pass.value){
				var password = pass.value;
				if(password.trim()==""){
					throw "Invalid Password";
				}
				else {
				this.password = btoa(password);
				if(email&&username){
			var o = JSON.stringify({username:this.username,email:this.email,password:this.password});
			localStorage.setItem('password',this.password);
			localStorage.setItem("user",o);
			localStorage.setItem("logged",true);
			this.userlogged = true;
			//proceed to link 
			this.savelink();
			}
			else {
			//alert("not");
			}
				}
			}

			});
			}
			else {
			this.password = btoa('');
			if(email&&username){
			var o = JSON.stringify({username:this.username,email:this.email,password:this.password});
			localStorage.setItem("user",o);
			localStorage.setItem('password',this.password);
			localStorage.setItem("logged",true);
			this.userlogged = true;
			//proceed to link 
			this.savelink();
			}
			else {
			//alert("not");
			}
			}

			//call the function for settings
			

			});
			}
			}
			
			});
          }
          }
          else {
		this.$swal({
		icon:'error',
		text:'Ooops,Error occured while processing your request',
		});
          }
          

          })
         
        }
      })
      .catch(()=>{
      this.$swal({
      icon:'error',
      text:'Ooops,Error occured while processing your request',
      });

      })
    }
    
    }
    else {
	//proceed to create link
	this.savelink();
    this.userlogged = true;
    var user = localStorage.getItem("user");
    var i = JSON.parse(user);
    this.username = i.username;
    this.password = i.password;
    this.email = i.email;
    

    }
   // alert(this.email);
    }
    catch(err){
	this.$swal({
      icon:'error',
      text:'Ooops,Error occured while processing your request '+err,
      });
      localStorage.removeItem("user");
      localStorage.removeItem("logged");
      this.userlogged = false;
    }
	},
	savelink:function(){
	try{
	this.$swal({
			icon:'question',
			text:'Enter Website Link',
			input:'text',
			inputAttributes:{
			required:true,
			minlength:5,
			placeholder:'Website Link',
			},
			confirmButtonText:'Save <i class="fa fa-save"></i>',
			cancelButtonText:"No ",
			showCancelButton:false,
            showCloseButton:true,
            allowOutsideClick:true,
            allowEnterKey:true,
            allowEscapeKey:true,
            backdrop:'#111415',
            confirmButtonColor:"#111429",
            validationMessage:"Invalid or Incorrect website link",
			})
			.then((result)=>{
				if(result.value){

				var link = result.value;
				var dot = link.indexOf(".");
				
				if(dot<0){
				let erro = "Invalid Website Link";
				this.$swal({
				icon:'error',
				text:erro,
				confirmButtonColor:"#111429",
				});
				}
				else{
				//everything went great
				this.link = link;
				this.$swal({
			icon:'question',
			html:'Save this link as ? <i class="fa fa-smile-wink"></i>',
			input:'text',
			inputAttributes:{
			required:true,
			minlength:5,
			placeholder:'Link Title or Name',
			},
			confirmButtonText:"Continue",
			cancelButtonText:'No,Just save it..<i class="fa fa-save"></i>',
			showCancelButton:true,
            showCloseButton:false,
            allowOutsideClick:false,
            allowEnterKey:true,
            allowEscapeKey:false,
            backdrop:'#111423',
            confirmButtonColor:"#111429",
            validationMessage:"Invalid or Incorrect Link Name",
			}).then((linkdeck)=>{
				if(linkdeck.value){
				var linkname = linkdeck.value;
				this.linktitle = linkname;
				this.$swal({
				icon:'question',
				html:'Would you love to leave a brief description of this link e.g Application deadline or debate topic etc <i class="fa fa-heart"></i>',
				confirmButtonText:"Yes,I'd love that",
			cancelButtonText:"No,Maybe Later",
			showCancelButton:true,
            showCloseButton:false,
            allowOutsideClick:false,
            allowEnterKey:true,
            allowEscapeKey:false,
            backdrop:'#111423',
            confirmButtonColor:"#111429",
				})
				.then((decision)=>{
				if(decision.value){
				this.$swal({
				icon:'question',
			text:'Enter a short description',
			input:'textarea',
			inputAttributes:{
			required:true,
			minlength:6,
			maxLength:15,
			placeholder:'Short description about the link',
			},
			confirmButtonText:'Save <i class="fa fa-save"></i>',
			cancelButtonText:"No ",
			showCancelButton:false,
            showCloseButton:false,
            allowOutsideClick:false,
            allowEnterKey:true,
            allowEscapeKey:false,
            backdrop:'#111415',
            confirmButtonColor:"#111429",
            validationMessage:"About text should not be empty,less than 6 characters or more than 15 characters <i class='fa fa-smile-beam'></i>",
				})
				.then((abt)=>{
				if(abt.value){
				this.linkabt = abt.value;
				//calls the full function
				this.save();
				}
				else {
				throw 'Incorrect Description';
				}
				})
				}
				else {
				//save link without about 
				this.linkabt = '';
				this.save();
				}
				})

				}
				else {
				//save link anyways 
				this.linkabt = '';
				var l = this.link;
				var lint = l.substr(0,10);
				this.linktitle = lint;
				//calls the full function
				this.save();
				}
			});
				}
				}	
				else {
				let erro = "Invalid Website Link";
				this.$swal({
				icon:'error',
				text:erro,
				confirmButtonColor:"#111429",
				});
				}
			});
			}
		catch(err){
		this.$swal({
		icon:'error',
		text:err,
		});
			}
	},
	save:function(){
	try{
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() +1;
	var minutes = date.getMinutes();
	var day = date.getDay();
	var hour = date.getHours();
	var time = hour+':'+minutes+'  '+day+'/'+month+'/'+year;
	var obj = JSON.stringify({link:this.link,linktitle:this.linktitle,linkabout:this.linkabt,date:time});
	var linkes = localStorage.getItem("links");
	var links;
	if(linkes==undefined||linkes==null||linkes==''){
	links = [];
	}
	else {
	links = linkes.split('|');
	}
	
	links.push(obj);
	var cl;
	cl = links.filter(function () { return true });

	
	links = cl.join("|");
	localStorage.setItem("links",links);
	this.loadlinks();
	this.links = localStorage.getItem("links");
	this.$swal({
	icon:'success',
	text:this.linktitle+' saved succesfully',
	timer:2000,
	confirmButtonColor:'#111429',
	confirmButtonText:'Great <i class-"fa fa-thumbs-up"></i>'
	})
	}
	catch(err){
	this.$swal({
	icon:'error',
	text:err,
	});
	}
	},
	}		
}
</script>
<style>
.mainicon{
	font-size:22px;
}
.linkadd{
	outline: none;
    border: 1px solid #ffffff;
    background: #111429;
    color: #ffffff;
    width: 60px;
    position:fixed;
    z-index:50;
    right:10%;
    height: 60px;
    border-radius: 50%;
    padding: 9px;
    top:70%;
    transition:all 0.7s;
}
.linkadd:hover {
	outline:none;
	border:1px solid #111429;
	background:#ffffff;
	color:#111429;

}
.smcl i{
	font-size:20px !important;
}
.linka{
	padding:5px;
	margin:5px;
	width:fit-content;
	height:30px;
}
.linka:hover{
	text-decoration:none;
}
.light-bg{
	font-family:Cursive,Lato !important;
	font-style:italic;
}
.card{
	transition:1s;
	cursor:pointer;
	border-radius:15px;
	overflow:hidden;
	margin:6px;
}
.card-deck{
	margin:49px !important;
}
.card:hover{
	background:#fff;
	color:#111429;
}
.card-title{
	font-family:Lato !important;

}
</style>
