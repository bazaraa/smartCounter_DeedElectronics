package mn.itzone.ntc.model.service;

import java.util.Optional;

import mn.itzone.ntc.model.CurrentUser;
import mn.itzone.ntc.model.User;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("currentUserDetailsService")
public class CurrentUserDetailsService implements UserDetailsService {

    @SuppressWarnings("unused")
	private static final Logger LOGGER = LoggerFactory.getLogger(CurrentUserDetailsService.class);
    private final UserService userService;

    @Autowired
    public CurrentUserDetailsService(UserService userService) {
        this.userService = userService;
    }

    
    @Override
    @Transactional(readOnly=true)
    public CurrentUser loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<User> user = userService.getUserByUsername(username);
        
        if(user.equals(Optional.empty()))
        	throw new UsernameNotFoundException(username);
        
        if(!user.get().isActive())
        	throw new UsernameNotFoundException(username);
        	
        return new CurrentUser(user.get());
    }
}