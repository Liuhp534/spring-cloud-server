package cn.liuhp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.feign.EnableFeignClients;

/**
 * @description:
 * @author: liuhp534
 * @create: 2020-06-06 21:39
 */
@SpringBootApplication
@EnableFeignClients
public class SpringCloudFeignApp {


    public static void main(String[] args) {

        SpringApplication.run(SpringCloudFeignApp.class, args);
    }

}
