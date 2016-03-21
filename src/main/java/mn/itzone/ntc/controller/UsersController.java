package mn.itzone.ntc.controller;

import mn.itzone.ntc.model.User;
import mn.itzone.ntc.model.service.UserService;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@Secured({"ROLE_ADMIN", "ROLE_SYSTEMADMIN"}) 
public class UsersController {

    private static final Logger LOGGER = LoggerFactory.getLogger(UsersController.class);
    private final UserService userService;

    @Autowired
    public UsersController(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping("/users")
    public ModelAndView getUsersPage() {
        LOGGER.debug("Getting users page");
        
        List<User> users = (List<User>) userService.getAllUsers();
        
        for(int i =0; i < users.size(); i++)
        {
        	if(users.get(i).getRole() != null 
        			&& users.get(i).getRole().getCode() != null 
        			&& users.get(i).getRole().getCode().equals("ROLE_ADMIN"))
        	{
        		users.remove(i);
        		break;
        	}
        }
        
        return new ModelAndView("user/list", "users", users);
    }


}
