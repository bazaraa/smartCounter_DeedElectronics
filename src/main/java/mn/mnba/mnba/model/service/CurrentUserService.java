package mn.mnba.mnba.model.service;

import mn.mnba.mnba.model.CurrentUser;


public interface CurrentUserService {

    boolean canAccessUser(CurrentUser currentUser, Long userId);

}
