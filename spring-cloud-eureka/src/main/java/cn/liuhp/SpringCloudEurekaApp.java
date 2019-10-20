package cn.liuhp;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@SpringBootApplication
@EnableEurekaServer
public class SpringCloudEurekaApp {

    public static void main(String[] args) {
        SpringApplication.run(SpringCloudEurekaApp.class, args);
    }
}
