package mn.itzone.ntc.model.service.impl;

import mn.itzone.ntc.model.CurrentUser;
import mn.itzone.ntc.model.service.CurrentUserDetailsService;
import mn.itzone.ntc.model.service.CurrentUserService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service("currentUserService")
public class CurrentUserServiceImpl implements CurrentUserService {

    @SuppressWarnings("unused")
	private static final Logger LOGGER = LoggerFactory.getLogger(CurrentUserDetailsService.class);

    @Override
    public boolean canAccessUser(CurrentUser currentUser, Long userId) {
        return currentUser != null && (currentUser.getRole().getCode().equals("ROLE_ADMIN") || currentUser.getUser().getId().equals(userId));
    }

}
