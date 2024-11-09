package com.SportsPerformance.Athlete;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class AthleteApplication {

	public static void main(String[] args) {
		SpringApplication.run(AthleteApplication.class, args);
	}

}
