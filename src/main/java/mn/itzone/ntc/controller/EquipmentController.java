package mn.itzone.ntc.controller;

import java.security.Principal;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class EquipmentController {

	@RequestMapping(value = "/equipment", method = RequestMethod.GET)
	public String Index(Principal currentUser, HttpSession session) {
		
		return "equipment/index";
	}
	
}
