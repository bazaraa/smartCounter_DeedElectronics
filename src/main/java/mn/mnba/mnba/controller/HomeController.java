package mn.mnba.mnba.controller;

import java.security.Principal;

import javax.validation.Valid;

import mn.mnba.mnba.model.CResult;
import mn.mnba.mnba.model.Role;
import mn.mnba.mnba.model.User;
import mn.mnba.mnba.model.service.UserService;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HomeController {

	// private static final Logger LOGGER =
	// LoggerFactory.getLogger(HomeController.class);

	@Autowired
	private UserService userService;

	@RequestMapping("/")
	public String getHomePage(Principal currentUser, Model model) {
		if (currentUser != null) {
			String userName = currentUser.getName();
			User user = userService.findByUserName(userName);
			if (user != null) {
				Role role = user.getRole();
				if (role != null) {
					switch (role.getCode()) {
					case "ROLE_DIRECTORGROUP":
					case "ROLE_DIRECTORCOMPANY":
						return "redirect:/dashboard";
					case "ROLE_MANAGER":
						return "redirect:/monitoring";
					case "ROLE_ZHA":
						return "redirect:/myordersZha";
					case "ROLE_ACCOUNTANT":
					case "ROLE_CASHIER":
						return "redirect:/myordersFinance";
					case "ROLE_HOROSCOPER":
						return "redirect:/clients";
					case "ROLE_RESTMANAGER":
					case "ROLE_MONASTERYMANAGER":
					case "ROLE_YOSLOLMANAGER":
						return "redirect:/monitoring";
					case "ROLE_REGISTRAR":
						return "redirect:/resultregister";
					case "ROLE_ALLOWANCE":
						return "redirect:/allowance";
					case "ROLE_SYSTEMADMIN":
						return "redirect:/users";
					case "ROLE_DOCTOR":
						return "redirect:/orders";
					case "ADMIN":
					default:
						return "home/index";
					}
				}
			}
		}

		return "redirect:/orders";
	}

    @ResponseBody
	@RequestMapping(value = "/", method = RequestMethod.POST)
	public Object GetUser(
			Principal currentUser,
			@Valid @ModelAttribute("user") User user,
			Model model,
			BindingResult result) {
		CResult cresult = new CResult();
    	JSONObject jsonData = new JSONObject();
    	try {

        	String roleName = "";
    		
			String username = currentUser.getName();
			user = userService.findByUserName(username);

			if(user != null)
			{				
				Role role = user.getRole();
				if(role != null && role.getName() != null)
					roleName = role.getName();
	    				
				cresult.setSuccess(true);
					
				if(user.getFirstName() != null){
					jsonData.put("name", user.getFirstName());
					jsonData.put("role", roleName);
				} else {
					jsonData.put("name", user.getUsername());
					jsonData.put("role", roleName);
				}
			}

		} catch (Exception e) {
			cresult.setSuccess(false);
			cresult.setMessage(e.getMessage());
		}
    	return jsonData.toString();
	}
}
