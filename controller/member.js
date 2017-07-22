module.exports = function(request,response){
    this.request = request;
    this.response = response;
    
    this.index = function(){
        //this.response.send('memberController');
        this.response.render("member/index.html",{});
    }
    this.login = function(){
        this.response.send("member's login method is running");
    }
}