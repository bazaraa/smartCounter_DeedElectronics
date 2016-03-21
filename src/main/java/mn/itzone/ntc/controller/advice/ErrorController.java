package mn.itzone.ntc.controller.advice;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/error")
public class ErrorController {

	@RequestMapping(value = "/")
	public String Index(Model model) {		
		return "redirect:/";
	}
}
