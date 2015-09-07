//注册弹出浮动窗口
$(document).ready(function(e) {
	$(".upload").nflow();
});
//全局中关闭浮动层的方法
function closeNsFlow()
{
	$(".nflow").nflow("close");
}