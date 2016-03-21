package mn.itzone.ntc.model.service;


import java.util.List;

import mn.itzone.ntc.model.Permission;

public interface PermissionService {

    Permission save(Permission permission);
    
    List<Permission> findAll();
    
    Permission findOne(long id);
    
    void delete(Long id);

}
