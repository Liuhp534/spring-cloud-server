package cn.liuhp.util;

import java.util.Date;

/*
* 日期计算工具
* */
public class CalculateDateUtils {


    /*
    * 计算两个时间的差的文案信息，减去节假日
    * */
    private String dateDiff(Date startTime, Date endTime, int downDay) {
        // 按照传入的格式生成一个simpledateformate对象
        long nd = 1000 * 24 * 60 * 60;// 一天的毫秒数
        long nh = 1000 * 60 * 60;// 一小时的毫秒数
        long nm = 1000 * 60;// 一分钟的毫秒数
        long ns = 1000;// 一秒钟的毫秒数
        long diff;
        long day = 0;
        long hour = 0;
        long min = 0;
        long sec = 0;
        // 获得两个时间的毫秒时间差异
        diff = endTime.getTime() - startTime.getTime();
        day = diff / nd - downDay; // 计算差多少天
        hour = diff % nd / nh + day * 24;// 计算差多少小时
        min = diff % nd % nh / nm + day * 24 * 60;// 计算差多少分钟
        sec = diff % nd % nh % nm / ns;// 计算差多少秒
        // 输出结果
        return day + "天" + (hour - day * 24) + "小时"
                + (min - day * 24 * 60) + "分钟";
    }

    /*
    * 计算两个时间差的文案信息，精确到分钟
    * */
    private String dateDiffByTime(long time) {
        long nd = 1000 * 24 * 60 * 60;// 一天的毫秒数
        long nh = 1000 * 60 * 60;// 一小时的毫秒数
        long nm = 1000 * 60;// 一分钟的毫秒数

        long day = 0;
        long hour = 0;
        long min = 0;
        day = time / nd; // 计算差多少天
        hour = time % nd / nh + day * 24;// 计算差多少小时
        min = time % nd % nh / nm + day * 24 * 60;// 计算差多少分钟
        // 输出结果
        return day + "天" + (hour - day * 24) + "小时"
                + (min - day * 24 * 60) + "分钟";
    }
}
