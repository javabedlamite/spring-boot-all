package com.netty.net.server.module;

import java.io.Serializable;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.netty.net.server.common.ChatConstants;

public class UserInfo implements Serializable {
	private static final long serialVersionUID = 3562768188264006800L;
	public static Map<String, UserInfo> map = new ConcurrentHashMap<>();

	private Long id;

	private String username;

	private String password;

	private String code;

	private String headImg;

	public UserInfo() {

	}

	public UserInfo(String username) {
		this.username = username;
		this.headImg = ChatConstants.headImg(username);
		this.code = ChatConstants.code();
		this.id = System.currentTimeMillis();
	}

	public String getHeadImg() {
		return headImg;
	}

	public void setHeadImg(String headImg) {
		this.headImg = headImg;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}
}
