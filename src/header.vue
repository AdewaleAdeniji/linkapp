<template>
	<nav class="navbar sticky fixed-top sticky-top navbar-expand-lg headernavbar" style="background:#111429;">
  <span class="navbar-brand" href="#"><i class="fa fa-link"></i> LinkApp</span>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarText">
    <ul class="navbar-nav ml-5">
     
      <li class="nav-item">
        <a class="nav-link" href="#" @click.prevent="features"><i class="fa fa-code-branch"></i> Features</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#" @click.prevent="pricing"><i class="fa fa-money-bill"></i> Pricing</a>
      </li>
    </ul>
   
  </div>
  <div class="form-inline">
    
    <button class="btn mybtn my-2 my-sm-0 fordesktop" @click="ki"><i class="fa fa-plus"></i> &nbsp;&nbsp;Save a new Link</button>
    &nbsp;&nbsp;&nbsp; 
    <button class="btn mybtn my-2 my-sm-0" @click="settings">
    <i class="fa fa-dot-circle"></i> 
    </button>
    
  </div>
</nav>
</template>
<script>
	export default {
   data: function() {
    return{
    user:null,
    userlogged:false,
    password:null,
    islocked:true,
    open:false,
    }
   },
   created(){
   var locked = localStorage.getItem("locked");
    if(locked){
    this.islocked= true;
    this.askforpassword();
    }

   },
   methods:{
   correct(){
   this.open=true;
   this.islocked=true;
   window.setTimeout(()=>{
    this.open=false;
    this.askforpassword();
   },1000000);
   },
   askforpassword:function(){
   if(this.open){
    //do nothing
   }
   else {
   this.$swal({
    icon:'question',
    text:'Enter Password to access LinkApp',
    input:'password',
    inputAttributes:{
    required:true,
    mainLength:5,
    placeholder:'Password....'
    },
    validationMessage:'Password must not be empty or less than 5 characters',
    allowOutsideClick:false,
    allowEscapeKey:false,
    showCancelButton:true,
    showCloseButton:false,
    reverseButtons:true,
    confirmButtonText:'Log In',
    cancelButtonText:'Forgot Password ?',
    confirmButtonColor:"#111529",
    grow:'fullscreen',
    backdrop:'#111429',
    })
    .then((result)=>{
     if(result.value){
     var pass = btoa(result.value);
     var password = localStorage.getItem("password");
     if(password===null||password==undefined||password==""){
     this.$swal({
     icon:'warning',
     text:'There seems to be an error,Please reset your password',
     confirmButtonText:'Okay',
     confirmButtonColor:'#111429',
     allowOutsideClick:false,
    allowEscapeKey:false,
    showCancelButton:true,
    showCloseButton:false,
     })
     .then(()=>{
      this.setupass();
     })
     }
     else {
      if(password.length==pass.length){
        if(password===pass){
          this.$swal({
          icon:'success',
          showConfirmButton:false,
          allowOutsideClick:true,
          showCloseButton:true,
          timer:1500,
          html:"You're In,Welcome <i class='fa fa-smile-beam'></i>",
          footer:'<i class="fa fa-smile-beam"></i>',
          })
          this.correct();
        }
        else {
        //password failed
        this.incorect();
        }
      }
      else {
        //password failed
        this.incorect();
      }
     }
     }
     else if (result.dismiss) {
                this.forgotpassword();
              }
     else {

     this.askforpassword();
     }
    })
    .catch((err)=>{
      this.$swal({
      icon:'error',
      text:'Error Occured while processing your request'+err,
      confirmButtonColor:'#111429',
      confirmButtonText:'Okay ',
      allowOutsideClick:false,
      backdrop:'#111429',
    allowEscapeKey:false,
    showCancelButton:true,
    showCloseButton:false,
      })
      .then(()=>{
        this.askforpassword();
      })
    });
    }
   },
   forgotpassword(){
    this.$swal({
    title:'Forgot Password',
    text:'Please enter your email address',
    input:'email',
    inputAttributes:{
    required:true,
    minLength:5,
    },
    validationMessage:'Invalid Email Address',
    allowOutsideClick:false,
    allowEnterKey:true,
    allowEscapeKey:true,
    showCloseButton:false,
    cancelButtonText:'Back',
    showCancelButton:true,
    confirmButtonColor:'#111429',
    backdrop:'#111429',
    confirmButtonText:'Confirm <i class="fa fa-check"></i>',
    })
    .then((result)=>{
      if(result.value){
        var email = result.value;
        var nmail,username;
        let user = localStorage.getItem("user");
        if(user==undefined||user==null||user==''){
        nmail='';
        username='';
        }
        else {
        let i = JSON.parse(user);
        username = i.username;
        nmail = i.email;
        }
        if(nmail==''||email==nmail){

          if(username!=""){
              this.$swal({
    icon:'question',
    text:'Please enter your username',
    input:'text',
    inputAttributes:{
    required:true,
    minLength:3,
    },
    validationMessage:'Invalid Username ',
    allowOutsideClick:false,
    allowEnterKey:true,
    allowEscapeKey:true,
    showCloseButton:false,
    
    showCancelButton:false,
    confirmButtonColor:'#111429',
    backdrop:'#111429',
    confirmButtonText:'Confirm <i class="fa fa-check"></i>',
    })
    .then((dt)=>{
    if(dt.value){
      var name = dt.value;
      if(name.length==username.length){
        if(name===username){
          //proceed to questions
          this.feedque();
        }
      }
      else {
        this.$swal({
        icon:'error',
        showConfirmButton:false,
        allowOutsideClick:false,
        text:'Incorrect Username',
        });
         this.forgotpassword();   
      }
    }
    else {
    this.forgotpassword();
    }
    })
          }
          else {
          //proceed to questions
          this.feedque();
          }
        }
        else {
        this.$swal({
        icon:'error',
        showConfirmButton:false,
        allowOutsideClick:false,

        });
        this.forgotpassword();
        }
      } 
      else {
      this.askforpassword();
      }
    });
   },
   feedque(){
   this.$swal({
   icon:'question',
   text:'Have you saved links before?',
   allowOutsideClick:false,
    allowEnterKey:true,
    showCancelButton:true,
    allowEscapeKey:true,
    showCloseButton:false,
    confirmButtonText:'Yes',
    cancelButtonText:'No...',
    
    confirmButtonColor:'#111429',
    backdrop:'#111429',
   })
   .then((result)=>{
       var a = (localStorage.getItem("links")).split("|");
       var h = a.filter(function () { return true });
      var l = h.length;
     
      
    if(result.value){
      
      if(l>0){
        //bring the setup pass menu
        localStorage.setItem("password",'');
        this.chooseyes();
        this.correct();
       // localStorage.setItem("password",'');
      }
      else {
      this.forgotpassword();

      }
    }
    else {
    if(l>0){
      //bring the setup pass menu
      localStorage.setItem("password",'');
      this.chooseyes();
      this.correct();
    }
    else {
    this.forgotpassword();
    }
    }
   })
   },
    ki:function(){
    document.getElementById("linkadd").click();
    },
    incorect:function(){
      this.$swal({
      icon:'error',
      text:'Incorrect Password,Please try again',
      confirmButtonColor:'#111429',
      confirmButtonText:"I'll try again",
      allowOutsideClick:false,
    allowEscapeKey:false,
    showCancelButton:true,
    showCloseButton:false,

      })
      .then(()=>{
        this.askforpassword();
      })
    },
    settings:function(){
    this.$swal({
    title:'Settings',
    
    html:`Always ask for password to access this App ?`,
    showCancelButton:true,
    cancelButtonText:'No',
    reverseButtons:true,
    confirmButtonText:'Yes.<i class="fa fa-check"></i>',
    confirmButtonColor:'#111429',
    footer:'There are other settings',
    })
    .then((result)=>{
    
    if(result.value){
    this.chooseyes();
    }
    else {
    //nextitem
      //backup my links and restore
      this.backupsettings();
    }
    })
    },
    backupsettings(){
      this.$swal({
      title:'Synchronization',
      text:'Do you want to backup and restore your links forever',
      footer:'Links synchronized can be accessed accrossed all devices if synchronization is turned on',
      confirmButtonText:"Yes,I'd love it",
      cancelButtonText:'No',
      showCancelButton:true,
      confirmButtonColor:'#111429',
      })
     .then((result)=>{
      if(result.value){
        //this definitely means the user allowed syncronization
        localStorage.setItem("sync",true);
        //call the sync fucntion
        this.sync();
      }
      else {
      //next item
      //probably change password and maybe darkmode 
        this.$swal({
         text:"We're working on more features in the settings",
         showConfirmButton:false,
         showCancelButton:true,
         timer:5000,
         cancelButtonText:'Okay then <i class="fa fa-hand-peace"></i>',
         footer:'Stay Tuned',
        })

      }
     })

    },
    sync(){
      this.$swal({
      allowOutsideClick:false,
      allowEscapeKey:false,
      allowEnterKey:true,
      showConfirmButton:false,
      showCancelButton:false,

      html:'<i class="fa fa-spinner fa-spin"></i>',
      footer:'Enabling Synchronization',
      })
      window.setTimeout(()=>{
        this.$swal({
      allowOutsideClick:true,
      allowEnterKey:true,
      showConfirmButton:true,
      showCancelButton:false,
      timer:2000,
      text:'Synchronization Turned On',
      html:'<i class="fa fa-spinner fa-spin"></i>',
      footer:'Enabled.',
      })
      },3000)
      //process
      //check server for this user
      //then send the links 
      //if user exist send links and join then fetches links down
      //if not save user and links and fetches links down
      //either way links will be coming down form the fetch request
      // then save links sent down and rerender them .............

    },
    setupass:function(){
     this.$swal({
            icon:'success',
            html:'Passwords will  always be required to startup linkapp<br>Did you really want to lock linkapp?',
            confirmButtonColor:'#111429',
            confirmButtonText:'Yes,Lock LinkApp',
              showCancelButton:true,
              cancelButtonText:"No,I'll do that later",
                            showCloseButton:false,
                            allowOutsideClick:false,
                            allowEnterKey:true,
                            allowEscapeKey:false,
                            backdrop:'#111423',

        })
        .then((dec)=>{
            if(dec.value){
                localStorage.setItem("locked",true);
                this.$swal({
                    icon:'success',
                    text:'Account Locked Successfully',
                    timer:2000,
                    showConfirmButton:false,
                });
                this.backupsettings();
            }
        })
        .catch(()=>{
           
        })
    },
    chooseyes:function(){
       var password = localStorage.getItem("password");
      
     if(password==""||password==undefined||password==null){
        this.$swal({
            icon:'question',
            text:'Choose a password',
            input:'password',
            inputAttributes:{
                required:true,
                minLength:5,
                placeholder:'Choose a password',
            },
            validationMessage:"Password must not be empty and must be more than 5 characters",
            allowEnterKey:true,
            confirmButtonColor:"#111429",
            backdrop:'#111429',
          })
        .then((result)=>{
            if(result.value){
                var p = btoa(result.value);
                localStorage.setItem('password',p);
                this.setupass();
            }
        })
        .catch(()=>{
           // console.log(err);
        });
     }
     else {
       // var p = atob(password);
        this.setupass();
     }
    },
    features:function(){
      this.$swal({
        icon:'info',
        title:'LinkApp Features',
        text:`LinkApp gives you the ability to  save up all your form and website links for later`,
        confirmButtonText:"Wow",
        allowOutsideClick:false,
        backdrop:'#111429',
        showCancelButton:false,
        showCloseButton:true,
        allowEnterKey:true,
        allowEscapeKey:false,
        confirmButtonColor:"#111429",
      })
    },
    pricing:function(){
      this.$swal({
      icon:'info',
      title:"Pricing : LinkApp ",
      html:"Here's the good news,LinkApp is free!!! <i class='fa fa-smile-beam'></i><i class='fa fa-smile-wink'></i>",
      confirmButtonText:'Great <i class="fa fa-thumbs-up"></i>',
      allowOutsideClick:false,
        backdrop:'#111429',
        showCancelButton:false,
        showCloseButton:true,
        allowEnterKey:true,
        allowEscapeKey:false,
        confirmButtonColor:"#111429",
      })
    } 
    
    

    },
  computed:{
  
  }
  }
</script>
<style>
  .headernavbar a , .linka{
  color:#ffffff;
   font-family:Lato,'sans-serif';
    margin:5px;
    border:1px solid #111429;
    border-radius:7px;
    transition:0.7s;
    color:#fff;
    }
    .navbar-brand{
    color:#fff;

    font-family:Lato,'sans-serif';
    font-size:25px;
    font-style:italic;
    font-weight:lighter;
    }
    
    .mybtn{
      background:#fff;
      color:#111429;
      border:1px solid #fff;
      font-family:Lato,'sans-serif';
      transition:0.7s;
      margin:5px;
    }
    .mybtn:hover{
      color:#ffffff;
   font-family:Lato,'sans-serif';
   
    background:#111429;
    border:1px solid #fff;
    border-radius:7px;
    }
    .headernavbar a:hover , .linka:hover{
      background:#fff;
      color:#111429;
      border:1px solid #fff;
      font-family:Lato,'sans-serif';
    }
    .swal2-styled.swal2-confirm{
    background:#1114429 !important;
    }
</style>
