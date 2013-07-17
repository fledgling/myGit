//判断浏览器类型
function getOs() {  
	var OsObject = "";  
	if(navigator.userAgent.indexOf("MSIE")>0) {  
		return "MSIE";  
	}  
	if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){  
		return "Firefox";  
	}  
	if(isSafari=navigator.userAgent.indexOf("Safari")>0) {  
		return "Safari";  
	}   
	if(isCamino=navigator.userAgent.indexOf("Camino")>0){  
		return "Camino";  
	}  
	if(isMozilla=navigator.userAgent.indexOf("Gecko/")>0){  
	     return "Gecko";  
	}  
}  
function goToTop() {
	$('body,html').animate({
		scrollTop : 0
	}, 1000);
}

//用户相关
function userLogin(){
	var email = $("#txtEmailLogin").val();
	var pass = $("#txtPasswordLogin").val();
	//非空验证
	if (email == "") {
		showErrorMsg("邮箱不能为空！");
		return;
	}
	if (pass == "") {
		showErrorMsg("密码不能为空！");
		return;
	}
	//验证邮箱格式
	var emailRegExp = new RegExp(
			"[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
	if (!emailRegExp.test(email) || email.indexOf('.') == -1) {
		showErrorMsg("您输入的邮箱格式不正确！");
		return;
	}
	//异步登录
	$.ajax({
		type : "POST",
		url : "/action/user/login",
		data : {
			email : email,
			pass : pass
		},
		dataType : "text",
		success : function(msg) {
			if("email_error" == msg) {
				showErrorMsg("帐号不存在！");
				return;
			}else if ("success" == msg) {
				parent.location.reload();
				return;
			} else {
				showErrorMsg("对不起，登录失败：系统正在维护~");
			}
		}
	});
	
}

function userRegist() {
	var email = $.trim($("#txtEmailAddressRegist").val());
	var name = $.trim($("#txtNameRegist").val());
	var pass = $.trim($("#txtPasswordRegist").val());
	var pass_con = $.trim($("#txtPasswordCon").val());
	//非空验证
	if (email == "") {
		showErrorMsg("邮箱不能为空！");
		return;
	}
	if (name == "") {
		showErrorMsg("昵称不能为空！");
		return;
	}
	if (pass == "") {
		showErrorMsg("密码不能为空！");
		return;
	}
	if (pass_con == "") {
		showErrorMsg("确认密码不能为空！");
		return;
	}
	//验证邮箱格式
	var emailRegExp = new RegExp(
			"[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
	if (!emailRegExp.test(email) || email.indexOf('.') == -1) {
		showErrorMsg("您输入的邮箱格式不正确！");
		return;
	}
	//验证密码
	if (pass != pass_con) {
		showErrorMsg("密码不一致！");
		return;
	}
	$
			.ajax({
				type : "POST",
				url : "/action/user/regist",
				data : {
					email : email,
					pass : pass,
					name : name
				},
				dataType : "text",
				success : function(msg) {
					if ("email_error" == msg) {
						showErrorMsg("邮箱已经被注册！");
						return;
					} else {
						if ("success" == msg) {
							showSuccessMsg("恭喜您，注册成功!");
							
						} else {
							showErrorMsg("对不起，注册失败:系统正在维护中~");
						}
					}
				}
			});
}

function showErrorMsg(msg) {
	var msgD = $.globalMessenger().post({
		message : msg,
		type : 'error'
	});
}
function showSuccessMsg(msg) {
	var msgD = $.globalMessenger().post({
		message : msg,
		type : 'success'
	});
}
