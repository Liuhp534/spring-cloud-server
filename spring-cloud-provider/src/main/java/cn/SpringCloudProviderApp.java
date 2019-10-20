package cn;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
@EnableDiscoveryClient//发现服务信息
public class SpringCloudProviderApp {

    public static void main(String[] args) {
        SpringApplication.run(SpringCloudProviderApp.class, args);
    }
}
