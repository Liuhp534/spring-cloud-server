package cn.liuhp.hystrix;

import cn.liuhp.entity.Dept;
import cn.liuhp.feign.DeptFeignApi;
import feign.hystrix.FallbackFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
 * @description:
 * @author: liuhp534
 * @create: 2020-06-07 10:21
 */
@Component
public class HystrixFallbackFactory implements FallbackFactory<DeptFeignApi> {


    public DeptFeignApi create(Throwable throwable) {
        return new DeptFeignApiFallback();
    }

    private class DeptFeignApiFallback implements DeptFeignApi {

        private Logger logger = LoggerFactory.getLogger(DeptFeignApi.class);

        public Dept searchById(Integer id) {
            logger.error("cn.liuhp.feign.DeptApi.searchById 服务降级");
            return new Dept();
        }

        public Dept searchByParam(Dept param) {
            logger.error("cn.liuhp.feign.DeptApi.searchById 服务降级");
            return null;
        }
    }
}
