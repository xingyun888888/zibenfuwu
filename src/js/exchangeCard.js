/**
 * Created by gaochao on 8/28/17.
 */
$(".myPhoto").click(function(e){
   $("#photo").click()
})

$("#photo").on("change",function(e){
    let file = e.target.files[0];
    if(!file)return;
    var reader = new FileReader();
    reader.onload=function(res){
       $(".myPhoto>img").attr("src",res.target.result)
    }
    reader.readAsDataURL(file)
})