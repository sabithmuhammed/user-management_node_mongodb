const isLogin=async (req,res,next)=>{
    try {
        if(req.session.user){
            next();
        }else{
            res.redirect('/');
        }
    } catch (error) {
        console.log(error.message);
        
    }
};

const isLogout=async(req,res,next)=>{
     try {
        if(req.session.user){
          return  res.redirect('/home');
        }
        next();
        
     } catch (error) {
        console.log(error.message);
     }
};

const validateForm =(req,res,next)=>{
    try {
        const {password, confPassword,email,name}=req.body;
        let regexName=/\d/;
        let regexEmail = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
        if(regexName.test(name)){
           return res.render('user/signup',{message:"Name shouldn't contain digits",color:"red"});
        }
        if(!regexEmail.test(email)){
            console.log("hereonly");
           return res.render('user/signup',{message:"Invalid email address",color:"red"});

        }
        if(password!==confPassword){
           return res.render('user/signup',{message:"Passwords doesn't match",color:"red"})

        }
        next();
    } catch (error) {
      console.log(error);  
    }
    
}

module.exports={
    isLogin,
    isLogout,
    validateForm
};