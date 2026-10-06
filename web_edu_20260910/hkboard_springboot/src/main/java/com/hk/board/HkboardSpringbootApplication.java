package com.hk.board;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.hk.board.mapper")
public class HkboardSpringbootApplication {

	public static void main(String[] args) {
		SpringApplication.run(HkboardSpringbootApplication.class, args);
	}

}
