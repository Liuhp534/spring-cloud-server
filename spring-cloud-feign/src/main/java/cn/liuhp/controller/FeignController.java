package cn.liuhp.controller;

import cn.liuhp.entity.Dept;
import cn.liuhp.feign.DeptFeignApi;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @description:
 * @author: liuhp534
 * @create: 2020-06-06 21:53
 */
@Controller
@RequestMapping("/feign")
@Slf4j
public class FeignController {

    @Autowired
    private DeptFeignApi deptFeignApi;

    @RequestMapping("/searchByFeign")
    @ResponseBody
    public Dept searchByFeign(Integer id) {
        log.info("cn.liuhp.controller.FeignController.searchByFeign {}", id);
        return deptFeignApi.searchById(id);
    }


















}
