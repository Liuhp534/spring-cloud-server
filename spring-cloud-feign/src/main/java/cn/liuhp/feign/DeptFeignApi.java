package cn.liuhp.feign;

import cn.liuhp.entity.Dept;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * @description:
 * @author: liuhp534
 * @create: 2020-06-06 21:52
 */
@FeignClient(name = "spring-cloud-provider",path = "/dept")
public interface DeptFeignApi {


    @RequestMapping("/searchById")
    Dept searchById(@RequestParam("id") Integer id) ;

}
