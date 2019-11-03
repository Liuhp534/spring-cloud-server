package cn.liuhp.core.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class EchartsDemoController {


    @RequestMapping("/helloWorld")
    public String helloWorld() {
        return "helloWorld";
    }

}
