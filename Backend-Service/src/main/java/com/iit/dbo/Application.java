package com.iit.dbo;

import org.springframework.boot.SpringApplication;

import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
@ComponentScan(basePackages = {"com.iit.dbo.*","com.iit.dbo.repository.*","com.iit.dbo.model.*"})
@EntityScan("com.iit.dbo.model")
public class Application {
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
}
