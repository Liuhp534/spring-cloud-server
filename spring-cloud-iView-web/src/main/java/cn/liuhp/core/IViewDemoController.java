package cn.liuhp.core;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class IViewDemoController {



    @RequestMapping("/helloWorld")
    public String  helloWorld() {
        return "helloWorld";
    }
}
