package mn.itzone.ntc.controller;

import java.util.Date; 
import java.util.List;

import javax.validation.Valid;

import mn.itzone.ntc.model.CResult;
import mn.itzone.ntc.model.Permission;
import mn.itzone.ntc.model.Role;
import mn.itzone.ntc.model.enums.ModulesEnum;
import mn.itzone.ntc.model.service.PermissionService;
import mn.itzone.ntc.model.service.RoleService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class PermissionController {

	@Autowired
	private PermissionService permissionService;
	
	@Autowired
	private RoleService roleService;
	
    @RequestMapping("/permissions")
    public String Index(Model model) {    	

    	List<Permission> permissions = permissionService.findAll();
    	
		model.addAttribute("permissions", permissions);
		model.addAttribute("modules", ModulesEnum.values());
		
        return "permission/list";
    }    
	
	@RequestMapping("/permission/{id}")
	public String GetPermission(@PathVariable Long id, Model model) {

    	Permission permission = permissionService.findOne(id);
    	
		model.addAttribute("permission", permission);
		model.addAttribute("modules", ModulesEnum.values());

		return "permission/index";
	}

	@ResponseBody
	@RequestMapping(value = "/permission/delete", method = RequestMethod.POST)
	public Object DeletePermission(Model model,
			@Valid @ModelAttribute("Permission") Permission permission, BindingResult result) {

		CResult cresult = new CResult();
		try {

			if (result.hasErrors()) {
				cresult.setSuccess(false);
				model.addAttribute("errors", result.getAllErrors());
				return "permission/list";
			}

			List<Role> roles = roleService.findRoleByPermissionId(permission.getId());
			
			if(roles != null && roles.size() > 0)
			{
				cresult.setSuccess(false);
				cresult.setMessage("Тухайн эрхийн мэдээлэл хэрэглэгчийн бүлгийн бүртгэлд ашиглагдсан тул устгах боломжгүй.");
				return cresult;	
			}
			
			permissionService.delete(permission.getId());

			cresult.setSuccess(true);

		} catch (Exception e) {
			cresult.setSuccess(false);
			cresult.setMessage(e.getMessage());
			model.addAttribute("error", e.getMessage());
		}

		return cresult;
	}

	@RequestMapping(value = "/permission", method = RequestMethod.GET)
	public String CreatePermission( Model model) {

		Permission permission = new Permission();

		model.addAttribute("permission", permission);
		model.addAttribute("modules", ModulesEnum.values());
		
		return "permission/index";
	}

	@RequestMapping(value = "/permission", method = RequestMethod.POST)
	public String SavePermission(
			@Valid @ModelAttribute("permission") Permission permission,
			BindingResult result, Model model) {

		try {						
			if (result.hasErrors()) {
				model.addAttribute("errors", result.getAllErrors());
				return "permission/index";
			}
			
			if(permission.getId() == null)
				permission.setCreatedDate(new Date());
			
			permissionService.save(permission);
		} catch (Exception e) {
			model.addAttribute("error", e.getMessage());
			return "permission/index";
		}
		return "redirect:/permissions";
	}
}
