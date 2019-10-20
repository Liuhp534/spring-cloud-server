package cn.liuhp.controller;


import cn.liuhp.constant.UrlConstants;
import cn.liuhp.entity.Dept;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/deptConsumer")
public class DeptConsumerController {

    private static final Logger logger = LoggerFactory.getLogger(DeptConsumerController.class);

    @Autowired
    private RestTemplate restTemplate;


    @RequestMapping("/searchById")
    public Dept searchById() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        MultiValueMap<String, String> map = new LinkedMultiValueMap<String, String>();
        map.add("id", "1");
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<MultiValueMap<String, String>>(map, headers);
        ResponseEntity<Dept> response = restTemplate.postForEntity(UrlConstants.Dept_Service_Provider, request, Dept.class);

        return response.getBody();
    }


}
