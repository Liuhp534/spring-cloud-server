package cn.liuhp.base;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class BeanConfig {

    /*
    * 为系统创建一个http请求工具模板
    * */
    @Bean
    public RestTemplate createRestTemplate() {
        return new RestTemplate();
    }

}
