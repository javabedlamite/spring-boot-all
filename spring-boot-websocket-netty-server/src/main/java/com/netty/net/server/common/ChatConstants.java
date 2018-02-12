package com.netty.net.server.common;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.apache.commons.lang3.RandomUtils;
import org.apache.commons.lang3.StringUtils;

import com.netty.net.server.module.UserInfo;

import io.netty.util.AttributeKey;

public class ChatConstants {
	public static final AttributeKey<String> CHANNEL_TOKEN_KEY = AttributeKey.valueOf("netty.channel.token");
	/** 用来保存当前在线人员 */
	public static Map<String, UserInfo> onlines = new ConcurrentHashMap<>();

	public static void addOnlines(String sessionId, UserInfo val) {
		onlines.putIfAbsent(sessionId, val);
	}

	public static void removeOnlines(String sessionId) {
		if (StringUtils.isNotBlank(sessionId) && onlines.containsKey(sessionId)) {
			onlines.remove(sessionId);
		}
	}

	private static char[] prefix = { 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V',
	        'W', 'X', 'Y' };
	private static Map<String, String> headImgMaps = new HashMap<String, String>();

	static {
		headImgMaps.put("admin", "../img/head/1.jpg");
		headImgMaps.put("terry", "../img/head/2.jpg");
	}

	public static String headImg(String username) {
		return headImgMaps.get(username);
	}

	public static String code() {
		int index = RandomUtils.nextInt(0, prefix.length);
		char prf = prefix[index];
		String len = (onlines.size() + 1) + "";
		if (len.length() < 4) {
			len = StringUtils.leftPad(len, 4, '0');
		}
		return prf + len;
	}
}
