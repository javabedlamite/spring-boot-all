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
	@RequestMapping(value = { "","/","/login" }, method = RequestMethod.GET)
	public String login() {
		return "login.jsp";
	}

}