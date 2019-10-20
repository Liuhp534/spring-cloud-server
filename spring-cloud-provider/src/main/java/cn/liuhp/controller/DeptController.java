package cn.liuhp.controller;


import cn.liuhp.entity.Dept;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dept")
public class DeptController {

    private static final Logger logger = LoggerFactory.getLogger(DeptController.class);


    @RequestMapping("/searchById")
    public Dept searchById(Integer id) {
        logger.info("DeptController.searchById {}", id);
        Dept dept = new Dept();
        dept.setName("dept one");
        return dept;
    }


}
