package cn.liuhp.configuration;

import com.netflix.loadbalancer.IRule;
import com.netflix.loadbalancer.RoundRobinRule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @description:
 * @author: liuhp534
 * @create: 2020-06-07 10:32
 */
@Configuration
public class ServerConfiguration {


    @Bean
    public IRule rule() {
        return new RoundRobinRule();
    }

}
