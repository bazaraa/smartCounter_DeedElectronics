package mn.itzone.ntc.controller;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import mn.itzone.ntc.model.User;
import mn.itzone.ntc.model.service.OrganizationService;
import mn.itzone.ntc.model.service.UserService;
import mn.itzone.ntc.model.view.UserView;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@Secured({"ROLE_ADMIN", "ROLE_SYSTEMADMIN"}) 
public class UsersController {

    private static final Logger LOGGER = LoggerFactory.getLogger(UsersController.class);
    private final UserService userService;

    @Autowired
    public UsersController(UserService userService) {
        this.userService = userService;
    }

	@Autowired OrganizationService organizationService;
//	
//    @RequestMapping("/users")
//    public ModelAndView getUsersPage() {
//        LOGGER.debug("Getting users page");
//        
//        List<User> users = (List<User>) userService.getAllUsers();
//        
//        for(int i =0; i < users.size(); i++)
//        {
//        	if(users.get(i).getRole() != null 
//        			&& users.get(i).getRole().getCode() != null 
//        			&& users.get(i).getRole().getCode().equals("ROLE_ADMIN"))
//        	{
//        		users.remove(i);
//        		break;
//        	}
//        }
//        
//        List<Organization> organizations = organizationService.findAll();
//        
//        return new ModelAndView("user/list", "users", users);
//    }
    
	//Хэрэглэгчийн жагсаалт үүсгэх
	@RequestMapping(value = "/users")
	public String List(Principal currentUser, Model model, HttpSession session) {
		LOGGER.debug("Getting users page");
		List<User> users = (List<User>) userService.getAllUsers();
        for(int i =0; i < users.size(); i++) {
        	if(users.get(i).getRole() != null 
        			&& users.get(i).getRole().getCode() != null 
        			&& users.get(i).getRole().getCode().equals("ROLE_ADMIN"))
        	{
        		users.remove(i);
        		break;
        	}
        }
		
		model.addAttribute("organizations", organizationService.findAll());
		model.addAttribute("users", users);
		return "user/list";
	}

	//Хэрэглэгчийн нэрээр хайж байна
	@RequestMapping(value = "/user/search", method = RequestMethod.POST)
	public String SearchOrganization(Principal currentUser,
			@Valid 
			@ModelAttribute("view") UserView view,
			BindingResult result, Model model) {
		
		if (result.hasErrors()) {
			model.addAttribute("errors", result.getAllErrors());
			return "user/list";
		}

		List<User> savedUser = userService.findByView(view);
		model.addAttribute("organizations", organizationService.findAll());
		model.addAttribute("users", savedUser);
		
		model.addAttribute("regnum", view.getRegisterNum());
		model.addAttribute("organization", view.getOrganization());
		model.addAttribute("firstname", view.getFirstName());
		
		
		return "user/list";

	}
	
	//Хайх шууд жагсаалтруу үсрэх
	@RequestMapping(value = "/user/search", method = RequestMethod.GET)
	public String GetPageClear() {
		return "redirect:/users";
	}
}
