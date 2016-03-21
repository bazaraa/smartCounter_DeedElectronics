package mn.itzone.ntc.model.service.impl;

import java.util.List;

import mn.itzone.ntc.model.Permission;
import mn.itzone.ntc.model.repository.PermissionRepository;
import mn.itzone.ntc.model.service.PermissionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service("permissionService")
public class PermissionServiceImpl implements PermissionService {

    @Autowired
    private PermissionRepository permissionRepository;
	
	@Override
	public Permission save(Permission permission) {
		return permissionRepository.saveAndFlush(permission);
	}

	@Override
	public List<Permission> findAll() {
		return permissionRepository.findAll(new Sort(Sort.Direction.ASC, "code"));
	}

	@Override
	public Permission findOne(long id) {
		return permissionRepository.findOne(id);
	}

	@Override
	public void delete(Long id) {
		permissionRepository.delete(id);
	}

}
