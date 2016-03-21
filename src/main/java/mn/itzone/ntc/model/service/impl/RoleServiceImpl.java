package mn.itzone.ntc.model.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import mn.itzone.ntc.model.Role;
import mn.itzone.ntc.model.repository.RoleRepository;
import mn.itzone.ntc.model.service.RoleService;

@Service("roleService")
public class RoleServiceImpl implements RoleService {

    @Autowired
    private RoleRepository roleRepository;
	
	@Override
	public Role save(Role role) {
		return roleRepository.saveAndFlush(role);
	}

	@Override
	public List<Role> findAll() {
		return roleRepository.findAll();
	}
	
	@Override
	public List<Role> findAll(Sort sort){
		return roleRepository.findAll(sort);
	}

	@Override
	public Role findOne(long id) {
		return roleRepository.findOne(id);
	}

	@Override
	public void delete(Long id) {
		roleRepository.delete(id);
	}

	@Override
	public List<Role> findRoleByPermissionId(Long id) {
		// TODO Auto-generated method stub
		return roleRepository.findRoleByPermissionId(id);
	}

}
