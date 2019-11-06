package cn.liuhp.util;

import net.coobird.thumbnailator.Thumbnails;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

public class ImageUtils {

    private static Logger logger = LoggerFactory.getLogger(ImageUtils.class);

    public static final String TYPE_JPG = "jpg";
    public static final String TYPE_GIF = "gif";
    public static final String TYPE_PNG = "png";
    public static final String TYPE_BMP = "bmp";

    private static final double Scale = 0.5d;//压缩比例，原始是1

    private static final double Quality = 0.4d;//压缩质量，原始是1

    /*
     * 压缩图片
     * */
    public static File compressImage(MultipartFile uploadFile) {
        if (!isImage(uploadFile)) {
            return null;
        }
        File file = null;
        String tempPath = "";
        try {
            tempPath = System.getProperty("java.io.tmpdir") + uploadFile.getOriginalFilename();
            file = new File(tempPath);
            logger.info("压缩图片,存放路径tempPath {}", tempPath);
            Thumbnails.of(uploadFile.getInputStream()).scale(Scale).outputQuality(Quality).toFile(file);
        } catch (IOException e) {
            logger.error("压缩图片异常,存放路径tempPath {}", tempPath, e);
        }
        return file;
    }


    public static boolean isImage(MultipartFile uploadFile) {
        if (null == uploadFile) {
            return Boolean.FALSE;
        }
        String imageType = null;
        //读取文件的前几个字节来判断图片格式
        byte[] b = new byte[4];
        try {
            uploadFile.getInputStream().read(b, 0, b.length);
            String type = bytesToHexString(b).toUpperCase();
            if (type.contains("FFD8FF")) {
                imageType = TYPE_JPG;
            } else if (type.contains("89504E47")) {
                imageType = TYPE_PNG;
            } else if (type.contains("47494638")) {
                imageType = TYPE_GIF;
            } else if (type.contains("424D")) {
                imageType = TYPE_BMP;
            } else {
                imageType = null;
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        if (null != imageType) {
            return Boolean.TRUE;
        }
        return Boolean.FALSE;
    }

    /**
     * byte数组转换成16进制字符串
     *
     * @param src
     * @return
     */
    public static String bytesToHexString(byte[] src) {
        StringBuilder stringBuilder = new StringBuilder();
        if (src == null || src.length <= 0) {
            return null;
        }
        for (int i = 0; i < src.length; i++) {
            int v = src[i] & 0xFF;
            String hv = Integer.toHexString(v);
            if (hv.length() < 2) {
                stringBuilder.append(0);
            }
            stringBuilder.append(hv);
        }
        return stringBuilder.toString();
    }


}
