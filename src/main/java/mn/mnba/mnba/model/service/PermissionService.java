package mn.mnba.mnba.model.service;


import java.util.List;

import mn.mnba.mnba.model.Permission;

public interface PermissionService {

    Permission save(Permission permission);
    
    List<Permission> findAll();
    
    Permission findOne(long id);
    
    void delete(Long id);

}
