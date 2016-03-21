package mn.itzone.ntc.controller;

import java.util.Date;
import java.util.List;

import javax.validation.Valid;

import mn.itzone.ntc.model.CResult;
import mn.itzone.ntc.model.Permission;
import mn.itzone.ntc.model.Role;
import mn.itzone.ntc.model.service.PermissionService;
import mn.itzone.ntc.model.service.RoleService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@Secured({"ROLE_ADMIN"}) 
public class RoleController {	

	@Autowired
	private RoleService roleService;

	@Autowired
	private PermissionService permissionService;

    @RequestMapping("/roles")
    public String Index(Model model) {    	

    	List<Role> roles = roleService.findAll();
    	
		model.addAttribute("roles", roles);
		
        return "role/list";
    }    
	
	@RequestMapping("/role/{id}")
	public String GetRole(@PathVariable Long id, Model model) {

		List<Permission> permissions = permissionService.findAll();
    	Role role = roleService.findOne(id);
    	
		model.addAttribute("role", role);
		model.addAttribute("permissionAll", permissions);

		return "role/index";
	}
	
	@ResponseBody
	@RequestMapping(value = "/role/delete", method = RequestMethod.POST)
	public Object DeleteRole(Model model,
			@Valid @ModelAttribute("Role") Role role, BindingResult result) {

		CResult cresult = new CResult();
		try {

			if (result.hasErrors()) {
				cresult.setSuccess(false);
				model.addAttribute("errors", result.getAllErrors());
				return "role/list";
			}

			roleService.delete(role.getId());

			cresult.setSuccess(true);

		} catch (Exception e) {
			cresult.setSuccess(false);
			cresult.setMessage(e.getMessage());
			model.addAttribute("error", e.getMessage());
		}

		return cresult;
	}

	@RequestMapping(value = "/role", method = RequestMethod.GET)
	public String CreateRole( Model model) {

		List<Permission> permissions = permissionService.findAll();

		Role role = new Role();

		model.addAttribute("role", role);
		model.addAttribute("permissionAll", permissions);
		
		return "role/index";
	}

	@RequestMapping(value = "/role", method = RequestMethod.POST)
	public String SaveRole(
			@Valid @ModelAttribute("role") Role role,
			BindingResult result, Model model) {

		try {						
			if (result.hasErrors()) {
				model.addAttribute("errors", result.getAllErrors());
				return "role/index";
			}
			
			if(role.getId() == null)
				role.setCreatedDate(new Date());
			
			if(role.getPermissions() != null)
			{
				int len = role.getPermissions().size();
				for(int i=len-1; i >= 0; i--)
				{
					if(role.getPermissions().get(i).getId() == null)
						role.getPermissions().remove(i);
				}
			}
			
			roleService.save(role);
		} catch (Exception e) {
			model.addAttribute("error", e.getMessage());
			return "role/index";
		}
		return "redirect:/roles";
	}
}
