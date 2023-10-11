const validateForm =(req,res,next)=>{
    try {
        const {password, confPassword,email,name}=req.body;
        let regexName=/\d/;
        let regexEmail = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
        if(regexName.test(name)){
           return res.render('admin/signup',{message:"Name shouldn't contain digits",color:"red",});
        }
        if(!regexEmail.test(email)){
            console.log("hereonly");
          return  res.render('admin/signup',{message:"Invalid email address",color:"red"});

        }
        if(password!==confPassword){
          return  res.render('admin/signup',{message:"Passwords doesn't match",color:"red"})

        }
         next();
    } catch (error) {
      console.log(error);  
    }
    
}

const isLogin=async (req,res,next)=>{
  try {
      if(req.session.admin){
          next();
      }else{
          res.redirect('/admin');
      }
  } catch (error) {
      console.log(error.message);
      
  }
};

const isLogout=async(req,res,next)=>{
   try {
      if(req.session.admin){
         return res.redirect('/admin/dashboard');
      }
      next();
      
   } catch (error) {
      console.log(error.message);
   }
};

module.exports={
    validateForm,
    isLogin,
    isLogout,
    
}