package com.hk.hello;

import java.io.IOException;

import jakarta.servlet.FilterChain;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpFilter;

public class EncodeFilter extends HttpFilter{

	private String encode;
	
	@Override
	public void init(FilterConfig config) throws ServletException {
		encode=config.getInitParameter("encoding");
	}
	
	@Override
	public void doFilter(ServletRequest request, 
						 ServletResponse response, FilterChain chain)
			             throws IOException, ServletException {
		
		System.out.println("요청할때 실행할 코드");
		//인코딩처리하는 코드
		request.setCharacterEncoding(encode);
		response.setContentType("text/html;charset="+encode);
		
		//chain.doFilter 코드 실행 전 위치에 있는 코드--> 요청할때 실행될 코드
		chain.doFilter(request, response);
		
		//응답할때 실행될 코드
		System.out.println("응답할때 실행할 코드");
	}
}








