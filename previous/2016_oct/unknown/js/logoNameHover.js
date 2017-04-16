$(document).ready(
	function(){
		$('.logos').hover(function(){
				aaq=$(this).siblings().attr('id');
				var logoName=document.getElementById('logo_name');
				logoName.innerHTML=':'+aaq;
				},
				function(){
				aaq=$(this).siblings().attr('id');
				var logoName=document.getElementById('logo_name');
				logoName.innerHTML='(로고에 마우스를 올리면 조직 이름이 보입니다.)';
					}
);}




);