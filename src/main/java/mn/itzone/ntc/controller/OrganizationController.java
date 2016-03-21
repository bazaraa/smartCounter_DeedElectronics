package mn.itzone.ntc.controller;

import java.security.Principal;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import mn.itzone.ntc.model.CResult;
import mn.itzone.ntc.model.Organization;
import mn.itzone.ntc.model.Sum;
import mn.itzone.ntc.model.User;
import mn.itzone.ntc.model.enums.OrganizationLevelEnum;
import mn.itzone.ntc.model.enums.OrganizationTypeEnum;
import mn.itzone.ntc.model.service.OrganizationService;
import mn.itzone.ntc.model.service.UserService;

import org.json.JSONArray;
import org.json.JSONObject;
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
public class OrganizationController {

	@Autowired UserService userService;
	@Autowired OrganizationService organizationService;
	
	//Байгууллага бүртгэх хуудас дуудагдах үед ажиллах хэсэг
	@RequestMapping(value = "/organization", method = RequestMethod.GET)
	public String Index(Principal currentUser, Model model, HttpSession session) {
		
		model.addAttribute("orgTypes", OrganizationTypeEnum.values());
		model.addAttribute("orgLevel", OrganizationLevelEnum.values());
		model.addAttribute("aimag", organizationService.findAllAimag());
		model.addAttribute("orgs", organizationService.findAll());
		Organization organization = new Organization();
		model.addAttribute("organization", organization);	
		return "organization/index";
	}

	//Байгууллага жагсаалт үүсгэх
	@RequestMapping(value = "/organizations")
	public String List(Principal currentUser, Model model, HttpSession session) {
		model.addAttribute("organizations", organizationService.findAll());
		return "organization/list";
	}
	
	//Байгууллага нэмэх хэсэг
	@RequestMapping(value = "/organization", method = RequestMethod.POST)
	public String SaveOrganization(Principal currentUser,
			@Valid @ModelAttribute("organization") Organization organization,
			BindingResult result, Model model) {
		
		if (result.hasErrors()) {
			model.addAttribute("errors", result.getAllErrors());
			return "organization/index";
		}

		Organization savedOrganization = null;
		User user = userService.findByUserName(currentUser.getName());
		if (organization.getId() == null) {
			savedOrganization = new Organization();
			savedOrganization.setCreatedDate(new Date());
			savedOrganization.setCreatedUser(user);
			savedOrganization.setName(organization.getName());
			savedOrganization.setCode(organization.getCode());
			savedOrganization.setDescription(organization.getDescription());
			savedOrganization.setOrganizationLevel(organization.getOrganizationLevel());
			savedOrganization.setOrganizationType(organization.getOrganizationType());
			savedOrganization.setPhone(organization.getPhone());
			savedOrganization.setAimag(organization.getAimag());
			savedOrganization.setSum(organization.getSum());
			savedOrganization.setOrganizationId(organization.getOrganizationId());
		} else {
			savedOrganization = organizationService.findOne(organization.getId());
			savedOrganization.setModifiedDate(new Date());
			savedOrganization.setModifiedUser(user);
			savedOrganization.setName(organization.getName());
			savedOrganization.setCode(organization.getCode());
			savedOrganization.setDescription(organization.getDescription());
			savedOrganization.setOrganizationLevel(organization.getOrganizationLevel());
			savedOrganization.setOrganizationType(organization.getOrganizationType());
			savedOrganization.setPhone(organization.getPhone());
			savedOrganization.setAimag(organization.getAimag());
			savedOrganization.setSum(organization.getSum());
			savedOrganization.setOrganizationId(organization.getOrganizationId());
		}
		
		organizationService.save(savedOrganization);
		
		return "redirect:/organizations";

	}
	
	//Байгууллага засах дарах үед буцааж байгаа мэдээлэл
	@RequestMapping("/organization/{id}")
	public String EditOrganization(@PathVariable Long id, Model model) {

		Organization savedOrganization = organizationService.findOne(id);

		if (savedOrganization == null){
			return "organization/index";
		}
		model.addAttribute("orgTypes", OrganizationTypeEnum.values());
		model.addAttribute("orgLevel", OrganizationLevelEnum.values());
		model.addAttribute("organization", savedOrganization);
		model.addAttribute("aimag", organizationService.findAllAimag());
		List<Organization> orgs = organizationService.findAll();
		if(orgs != null){
			for (int i = 0; i < orgs.size(); i++) {
				if(orgs.get(i) != null){
					if(orgs.get(i).getId() != null){
						if(orgs.get(i).getId().equals(id)){
							orgs.remove(i);
						}
					}
				}
			}
		}
		model.addAttribute("orgs", orgs);
		return "organization/index";
	}
	
	//Байгууллага устгах хэсэг
	@ResponseBody
	@RequestMapping(value = "/organization/delete", method = RequestMethod.POST)
	public Object Delete(Principal currentUser, Model model,
			@Valid @ModelAttribute("organization") Organization organization, BindingResult result) {

		CResult cresult = new CResult();
		try {

			if (result.hasErrors()) {
				cresult.setSuccess(false);
				model.addAttribute("errors", result.getAllErrors());
				return "organization/index";
			}
			
			organizationService.delete(organization.getId());

			cresult.setSuccess(true);

		} catch (Exception e) {
			if (e.getMessage().contains("ConstraintViolationException:")) {
				cresult.setSuccess(false);
				cresult.setMessage("Тухайн байгууллагын мэдээллийг ашиглагласан тул устгах боломжгүй.");
			} else {
				cresult.setSuccess(false);
				cresult.setMessage(e.getMessage());
				model.addAttribute("error", e.getMessage());
			}
		}

		return cresult;
	}
	
	@ResponseBody
	@RequestMapping(value = "/organization/getsums/{id}", method = RequestMethod.GET)
	public String GetNodes(@PathVariable Long id, Model model) {

		JSONArray json = new JSONArray();
		List<Sum> list = organizationService.findByAimag(id);
		for (int i = 0; i < list.size(); i++) {
			JSONObject ob1 = new JSONObject();
			if(list.get(i) != null){
				ob1.put("id", list.get(i).getId());
				ob1.put("name", list.get(i).getName());
				json.put(ob1);
			}
		}
		return json.toString();
	}
}
