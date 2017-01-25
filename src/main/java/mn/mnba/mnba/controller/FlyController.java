package mn.mnba.mnba.controller;

import java.util.List;

import javax.validation.Valid;

import mn.mnba.mnba.model.CResult;
import mn.mnba.mnba.model.Fly;
import mn.mnba.mnba.model.service.FlyService;

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
public class FlyController {
	//commit test
	@Autowired
	private FlyService flyService;
	
	//fly huudas anh achaallah ued
	@RequestMapping("/fly")
	public String GetFly(Model model) {
		model.addAttribute("fly", new Fly());

		List<Fly> flies = flyService.findAll();
		model.addAttribute("flies", flies);
		return "fly/list";
	}
	
	
	
	//fly create
//	@RequestMapping(value = "/fly/index", method = RequestMethod.POST)
	@RequestMapping(value = "/fly/index", method = RequestMethod.GET)
	public String SaveFly(Model model,Fly fly){
		
		return "fly/index";
	}
	
	// fly save
	@RequestMapping(value = "/fly", method = RequestMethod.POST)
	public String Save(@Valid @ModelAttribute("fly") Fly fly,BindingResult result, Model model){
		
		try {						
			if (result.hasErrors()) {
				model.addAttribute("errors", result.getAllErrors());
				return "fly/index";
			}			
			
			flyService.save(fly);
		}
		 catch (Exception e) {
			model.addAttribute("error", e.getMessage());
			return "fly/list";
		}
		return "redirect:/fly";
	}
	
	//fly update
	@RequestMapping("fly/{id}")
	public String UpdateFly(@PathVariable Long id,Model model){
    	Fly fly = flyService.findOne(id);
    	
		model.addAttribute("fly", fly);

		return "fly/index";
	}
	
	//fly delete
	@ResponseBody
	@RequestMapping(value = "/fly/delete", method = RequestMethod.POST)
	public Object DeleteRole(Model model,
			@Valid @ModelAttribute("fly") Fly fly, BindingResult result) {

		CResult cresult = new CResult();
		try {

			if (result.hasErrors()) {
				cresult.setSuccess(false);
				model.addAttribute("errors", result.getAllErrors());
				return "fly/list";
			}

			flyService.delete(fly.getId());

			cresult.setSuccess(true);

		} catch (Exception e) {
			cresult.setSuccess(false);
			cresult.setMessage(e.getMessage());
			model.addAttribute("error", e.getMessage());
		}

		return cresult;
	}
}
