package cn.liuhp.controller;

import cn.liuhp.entity.Dept;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/zuul")
public class ZuulController {

    private static final Logger logger = LoggerFactory.getLogger(ZuulController.class);

    @RequestMapping("/redirectSearchById")
    public String redirectSearchById(Integer id) {
        logger.info("ZuulController.redirectSearchById {}", id);
        int i = 1;
        if (i == 0) {
            return "redirect:/zuul/success";
        }
        if (i == 1) {
            return "forward:/zuul/success";
        }
        return "fail";
    }

    @RequestMapping("/success")
    public String success() {
        logger.info("ZuulController.success");
        return "success";
    }

}
