package com.SportsPerformance.batch3;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class Batch3Application {

	public static void main(String[] args) {
		SpringApplication.run(Batch3Application.class, args);
	}

}
