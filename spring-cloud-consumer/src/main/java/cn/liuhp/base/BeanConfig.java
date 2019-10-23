package cn.liuhp.base;

import com.netflix.loadbalancer.IRule;
import com.netflix.loadbalancer.RoundRobinRule;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class BeanConfig {

    /*
    * 为系统创建一个http请求工具模板
    * */
    @Bean
    @LoadBalanced
    public RestTemplate createRestTemplate() {
        return new RestTemplate();
    }

    @Bean
    public IRule createRule() {
        //其他算法，参考百度
        return new RoundRobinRule();//轮训算法
    }

}
