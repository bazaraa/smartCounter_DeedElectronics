package mn.mnba.mnba.model.service;


import java.util.List;

import org.springframework.data.domain.Sort;

import mn.mnba.mnba.model.Role;

public interface RoleService {

    Role save(Role role);
    
    List<Role> findAll();
    
    List<Role> findAll(Sort sort);

    List<Role> findRoleByPermissionId(Long id);
    
    Role findOne(long id);
    
    void delete(Long id);

}
