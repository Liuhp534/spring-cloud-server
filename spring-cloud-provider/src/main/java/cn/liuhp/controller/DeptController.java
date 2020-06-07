package cn.liuhp.controller;


import cn.liuhp.entity.Dept;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.client.ServiceInstance;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/dept")
public class DeptController {

    private static final Logger logger = LoggerFactory.getLogger(DeptController.class);

    @Autowired
    private DiscoveryClient discoveryClient;

    @Value("${server.port}")
    private int port;

    @RequestMapping("/searchById")
    public Dept searchById(Integer id) {
        logger.info("DeptController.searchById {} port {}", id, port);
        Dept dept = new Dept();
        if (port == 8002) {
            throw new RuntimeException();
           /* try {
                Thread.sleep(3000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }*/
        }
        logger.info("return DeptController.searchById {} port {}", id, port);
        dept.setName("dept one " + port);
        return dept;
    }

    @RequestMapping("/searchByParam")
    public Dept searchByParam(@RequestBody Dept param) {
        logger.info("DeptController.searchByParam {} port {}", param, port);
        Dept dept = new Dept();
        if (port == 8002) {
            throw new RuntimeException();
           /* try {
                Thread.sleep(3000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }*/
        }
        logger.info("return DeptController.searchByParam {} port {}", param, port);
        dept.setName("dept one " + port);
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
