package cn.liuhp.core;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

@Controller
public class BootstrapController {


    @RequestMapping("/index")
    public String  index() {
        return "index/index";
    }

    @RequestMapping("/welcome")
    public String  welcome() {
        return "index/welcome";
    }

    @RequestMapping("/importExcel")
    public String importExcel() {
        return "annual/importExcel";
    }

    @RequestMapping("/home/GetMenu")
    @ResponseBody
    public List<MenuModelDTO> GetMenu() {
        List<MenuModelDTO> dtolist = new ArrayList<MenuModelDTO>();
        dtolist.add(createMenu("100", "续保处理", get700ChildMenus()));
        return dtolist;
    }

    private MenuModelDTO createMenu(String menuId, String menuName, List<MenuModelDTO> menuList) {
        MenuModelDTO menuModelDTO = new MenuModelDTO();
        menuModelDTO.setMenuid(menuId);
        menuModelDTO.setMenuname(menuName);
        menuModelDTO.setMenus(menuList);
        return menuModelDTO;
    }

    private MenuModelDTO createMenu(String menuId, String menuName, String url) {
        MenuModelDTO menuModelDTO = new MenuModelDTO();
        menuModelDTO.setMenuid(menuId);
        menuModelDTO.setMenuname(menuName);
        menuModelDTO.setUrl(url);
        menuModelDTO.setMenus(null);
        return menuModelDTO;
    }

    private List<MenuModelDTO> get700ChildMenus() {
        List<MenuModelDTO> childMenus = new ArrayList<MenuModelDTO>();
        childMenus.add(createMenu("101", "续保单明细", "annuity/toAnnuityApplyList"));
        childMenus.add(createMenu("102", "续保单导入", "importExcel"));
        return childMenus;
    }
}
