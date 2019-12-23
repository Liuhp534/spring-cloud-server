package cn.liuhp.core;

import java.util.List;

/**
 * Created by hz15111811 on 2017/2/14.
 */
public class MenuModelDTO {

    private String icon;

    private String menuid;

    private String menuname;

    private List<MenuModelDTO> menus;

    private String url;

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getMenuid() {
        return menuid;
    }

    public void setMenuid(String menuid) {
        this.menuid = menuid;
    }

    public String getMenuname() {
        return menuname;
    }

    public void setMenuname(String menuname) {
        this.menuname = menuname;
    }

    public List<MenuModelDTO> getMenus() {
        return menus;
    }

    public void setMenus(List<MenuModelDTO> menus) {
        this.menus = menus;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
