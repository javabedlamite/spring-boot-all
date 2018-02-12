package com.netty.net.server.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/")
public class LoginController {

	/**
	 * 跳转登录页面
	 * 
	 * @return
	 */
<<<<<<< HEAD
	@RequestMapping(value = { "","/","/login" }, method = RequestMethod.GET)
	public String login() {
		return "login.jsp";
=======
	@RequestMapping(value = { "", "/", "login" }, method = RequestMethod.GET)
	public String index() {
		return "index.jsp";
>>>>>>> branch 'master' of https://github.com/javabedlamite/spring-boot-all
	}

<<<<<<< HEAD
=======
	/**
	 * 用户登录
	 * 
	 * @param user
	 * @return
	 */
	@RequestMapping(value = "home", method = RequestMethod.POST)
	public String doLogin(UserInfo user) {
		UserInfo.map.put(user.getPhone(), user);
		return "redirect:/chat/list?token=" + user.getPhone();
	}
>>>>>>> branch 'master' of https://github.com/javabedlamite/spring-boot-all
}