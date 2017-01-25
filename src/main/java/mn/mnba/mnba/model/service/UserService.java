package mn.mnba.mnba.model.service;


import java.util.Collection;
import java.util.List;
import java.util.Optional;

import mn.mnba.mnba.model.User;

public interface UserService {

    Optional<User> getUserById(long id);

    Optional<User> getUserByUsername(String username);

    Collection<User> getAllUsers();
    
    User findOne(Long id);

    User save(User user);    

    User findByUserName(String username);
    
    List<User> getUserByUsernameInQuery(String username);
    
    List<User> findByRole(String roleCode);
    
    void deleteUser(long id);

}
