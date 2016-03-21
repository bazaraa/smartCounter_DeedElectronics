package mn.itzone.ntc.model.service;

import mn.itzone.ntc.model.CurrentUser;


public interface CurrentUserService {

    boolean canAccessUser(CurrentUser currentUser, Long userId);

}
