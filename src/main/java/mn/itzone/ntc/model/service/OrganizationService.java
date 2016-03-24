package mn.itzone.ntc.model.service;

import java.util.List;

import mn.itzone.ntc.model.Aimag;
import mn.itzone.ntc.model.Organization;
import mn.itzone.ntc.model.Sum;
import mn.itzone.ntc.model.enums.OrganizationTypeEnum;
import mn.itzone.ntc.model.view.OrganizationView;

public interface OrganizationService {

	List<Organization> findAll();

	Organization findOne(Long id);

	Organization save(Organization organization);

	void delete(Long id);

	List<Aimag> findAllAimag();
	
	List<Sum> findByAimag(Long id);
	
	List<Organization> getOrgs(OrganizationTypeEnum type);
	
	List<Organization> findByOrgName(OrganizationView view);
}
