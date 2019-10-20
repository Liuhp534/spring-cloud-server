package cn.liuhp.controller;


import cn.liuhp.entity.Dept;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/dept")
public class DeptController {

    private static final Logger logger = LoggerFactory.getLogger(DeptController.class);

    @Autowired
    private DiscoveryClient discoveryClient;

    @RequestMapping("/searchById")
    public Dept searchById(Integer id) {
        logger.info("DeptController.searchById {}", id);
        Dept dept = new Dept();
        dept.setName("dept one");
        return dept;
    }


    @RequestMapping("/discovery")
    public Object discovery() {
        List<String> list = discoveryClient.getServices();
        logger.info("services {}", list);
        List<ServiceInstance> instances = discoveryClient.getInstances("spring-cloud-consumer");
        for (ServiceInstance serviceInstance : instances) {
            logger.info("instance {} {} {}", serviceInstance.getHost(), serviceInstance.getPort(), serviceInstance.getServiceId());
        }
        return discoveryClient;
    }


}
