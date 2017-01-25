package mn.mnba.mnba.controller;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpSession;

import mn.mnba.mnba.model.User;
import mn.mnba.mnba.model.service.UserService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
 
public class UsersController {

    private static final Logger LOGGER = LoggerFactory.getLogger(UsersController.class);
    private final UserService userService;

    @Autowired
    public UsersController(UserService userService) {
        this.userService = userService;
    }
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
		
		model.addAttribute("users", users);
		return "user/list";
	}

}
