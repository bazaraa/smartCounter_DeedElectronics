package mn.itzone.ntc.model.service;


import java.util.List;

import org.springframework.data.domain.Sort;

import mn.itzone.ntc.model.Role;

public interface RoleService {

    Role save(Role role);
    
    List<Role> findAll();
    
    List<Role> findAll(Sort sort);

    List<Role> findRoleByPermissionId(Long id);
    
    Role findOne(long id);
    
    void delete(Long id);

}
