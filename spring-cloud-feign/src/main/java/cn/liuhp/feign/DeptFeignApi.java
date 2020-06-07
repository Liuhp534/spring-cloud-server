package cn.liuhp.feign;

import cn.liuhp.api.DeptApi;
import cn.liuhp.hystrix.HystrixFallbackFactory;
import org.springframework.cloud.netflix.feign.FeignClient;

/**
 * @description:
 * @author: liuhp534
 * @create: 2020-06-06 21:52
 */
@FeignClient(name = "spring-cloud-provider",path = "/dept", fallbackFactory = HystrixFallbackFactory.class)
public interface DeptFeignApi extends DeptApi {




}
