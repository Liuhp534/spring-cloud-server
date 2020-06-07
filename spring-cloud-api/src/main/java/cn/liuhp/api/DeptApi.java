package cn.liuhp.api;

import cn.liuhp.entity.Dept;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * @description:
 * @author: liuhp534
 * @create: 2020-06-06 21:52
 */
public interface DeptApi {


    @RequestMapping("/searchById")
    Dept searchById(@RequestParam("id") Integer id) ;

    @RequestMapping("/searchByParam")
    public Dept searchByParam(@RequestBody Dept param);
}
