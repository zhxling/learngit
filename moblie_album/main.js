$(document).ready(function(){
    var total=17;  //图片数量
    var bodyWidth=document.documentElement.clientWidth||document.body.clientWidth;
    render();
    
    var scrollWid=document.documentElement.scrollWidth||document.body.scrollWidth;
    

    // 如果出现滚动条，就重新渲染图片，因为此时页面可用宽度变小了；
   if(scrollWid>document.documentElement.clientWidth||document.body.clientWidth){
   	bodyWidth=document.documentElement.clientWidth||document.body.clientWidth;
   	 render();
   }

    // 渲染图片
    function render(){
    	var temp='';   //用于拼接每次要添加的HTML代码
        var padding=2;  //图片间距；
        var imgWidth=Math.floor((bodyWidth-3*padding)/4);

        for(var i=1;i<=total;i++){
            var p=padding;
		  	var imgUrl="img/"+i+".jpg";

		  	if(i%4==1){
        	   p=0;
            }
		  	temp=temp+'<li data-id="'+i+'" class="animated bounceIn" style="width:'+imgWidth+'px;height:'+imgWidth+'px;padding-top:'+padding+'px;padding-left:'+p+'px;"><canvas id="cav-'+i+'"></canvas></li>';
		  	
			var imagesObject=new Image();
	        imagesObject.index=i;
	        imagesObject.onload=function(){
	        	var cvs=$("#cav-"+this.index)[0].getContext('2d');
	        	this.width=imgWidth+"px";
	        	this.height=imgWidth+"px";
	        	cvs.width=this.width;
	        	cvs.heigh=this.height;
	        	cvs.drawImage(this,0,0);
	        }

	        imagesObject.src=imgUrl;
        }
        $("#container").html(temp);

   }

   var pic_id=0; //图片索引

    // 为li绑定事件委托
   $('#container').delegate('li','tap',function(){
   	    var _id=$(this).attr('data-id');
   	    pic_id=_id;
   	    loadImg(_id);
   });
   
   // 关闭弹出的放大图片
   $('#large').tap(function(){
   	$(this).hide();
   });
   
   // 左滑动事件
   $('#large').swipeLeft(function(){
	   	if(pic_id>=total){
	   		return;
	   	}
	   	pic_id++;
	   	loadImg(pic_id,function(){
	   		$('.largePic')[0].addEventListener('webkitAnimationEnd', function(){
	   			$('.largePic').removeClass('animated bounceInRight');
	   			$('.largePic')[0].removeEventListener('webkitAnimationEnd')
	   		},false);

	   		$('.largePic').addClass('animated bounceInRight');
	   	});
   })

    // 右滑动事件
    $('#large').swipeRight(function(){
	   	if(pic_id<=1){
	   		return;
	   	}
	   	pic_id--;
	   	loadImg(pic_id,function(){
	   		$('.largePic')[0].addEventListener('webkitAnimationEnd', function(){
	   			$('.largePic').removeClass('animated bounceInRight');
	   			$('.largePic')[0].removeEventListener('webkitAnimationEnd')
	   		},false);

	   		$('.largePic').addClass('animated bounceInRight');
	   	});
   })

  // 加载弹出图片
   function loadImg(id,callback){
   	$("#large").css({
   		"width":$(window).width()+"px",
   		"heigh":$(window).height()+"px",
   	}).show();

   	var imgsrc="img/"+id+".large.jpg";

   	var imagesObject=new Image();

   	imagesObject.onload=function(){
   		var w=this.width;
   		var h=this.height;
   		var winW=$(window).width();
   		var winH=$(window).height();

   		var scale=Math.min(winW/w,winH/h,1);

   		$(".largePic").attr("src",imgsrc).css({
   			"width":w*scale+"px",
   		    "heigh":h*scale+"px",
   		    "margin-top":(winH-h*scale)/2+"px"
   		});
   	}
   	imagesObject.src=imgsrc;

   	callback&&callback();
   }


     
});