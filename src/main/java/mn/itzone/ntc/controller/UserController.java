package mn.itzone.ntc.controller;

import java.security.Principal;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import mn.itzone.ntc.model.CResult;
import mn.itzone.ntc.model.Role;
import mn.itzone.ntc.model.User;
import mn.itzone.ntc.model.service.RoleService;
import mn.itzone.ntc.model.service.UserService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@Secured({ "ROLE_ADMIN", "ROLE_SYSTEMADMIN" })
public class UserController {

	@SuppressWarnings("unused")
	private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

	@Autowired
	private UserService userService;

	@Autowired
	private RoleService roleService;

	// @PreAuthorize("@currentUserService.canAccessUser(principal, #id)")
	@RequestMapping("/user/{id}")
	public String GetUser(@PathVariable Long id, Model model) {

		Optional<User> userOptional = userService.getUserById(id);

		if (userOptional.equals(Optional.empty()))
			return "redirect:/users";

		User user = userOptional.get();

		user.setChangedPassword(false);
		user.setPasswordRepeated(user.getPassword());

		List<Role> roles = roleService.findAll(new Sort(Sort.Direction.ASC, "name"));

		model.addAttribute("roles", roles);
		model.addAttribute("user", user);

		return "user/edit";
	}

	@ResponseBody
	// @PreAuthorize("hasAuthority('ADMIN')")
	@RequestMapping(value = "/user/delete", method = RequestMethod.POST)
	public Object DeleteUser(Model model, @Valid @ModelAttribute("User") User user, BindingResult result) {

		CResult cresult = new CResult();
		try {

			if (result.hasErrors()) {
				cresult.setSuccess(false);
				model.addAttribute("errors", result.getAllErrors());
				return "users/index";
			}

			if(user != null && user.getId() != null)
			{
				userService.deleteUser(user.getId());
			}
			
			
			cresult.setSuccess(true);

		} catch (Exception e) {
			cresult.setSuccess(false);
			cresult.setMessage(e.getMessage());
			model.addAttribute("error", e.getMessage());
		}

		return cresult;
	}

	// @PreAuthorize("hasAuthority('ADMIN')")
	@RequestMapping(value = "/user", method = RequestMethod.GET)
	public String CreateUser(Model model) {

		List<Role> roles = roleService.findAll(new Sort(Sort.Direction.ASC, "name"));

		User user = new User();
		user.setChangedPassword(true);

		model.addAttribute("roles", roles);
		model.addAttribute("user", user);

		return "user/edit";
	}

	// @PreAuthorize("hasAuthority('ADMIN')")
	@RequestMapping(value = "/user", method = RequestMethod.POST)
	public String SaveUser(Principal currentUser, @Valid @ModelAttribute("user") User user, BindingResult result,
			Model model) {

		try {

			if (result.hasErrors()) {

				List<Role> roles = roleService.findAll(new Sort(Sort.Direction.ASC, "name"));

				model.addAttribute("roles", roles);

				model.addAttribute("errors", result.getAllErrors());
				model.addAttribute("user", user);
				return "user/edit";
			}

			Date now = new Date();
			User savedUser = null;

			String username = "";
			if (currentUser != null)
				username = currentUser.getName();

			if (user.getId() != null) {
				Optional<User> userOptional = userService.getUserById(user.getId());

				if (userOptional.equals(Optional.empty()))
					return "redirect:/users";

				savedUser = userOptional.get();

				if (user.getPassword().isEmpty())
					user.setPassword(savedUser.getPassword());
				else
					user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));

			}

			if (user.getId() == null && !user.getPassword().isEmpty())
				user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));

			savedUser = userService.save(user);

		} catch (Exception e) {

			List<Role> roles = roleService.findAll(new Sort(Sort.Direction.ASC, "name"));

			model.addAttribute("roles", roles);
			model.addAttribute("user", user);

			model.addAttribute("error", e.getMessage());
			return "user/edit";
		}
		return "redirect:/users";
	}

}
