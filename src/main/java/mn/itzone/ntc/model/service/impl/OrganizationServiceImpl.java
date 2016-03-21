package mn.itzone.ntc.model.service.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import mn.itzone.ntc.model.Aimag;
import mn.itzone.ntc.model.Organization;
import mn.itzone.ntc.model.Sum;
import mn.itzone.ntc.model.repository.AimagRepository;
import mn.itzone.ntc.model.repository.OrganizationRepository;
import mn.itzone.ntc.model.repository.SumRepository;
import mn.itzone.ntc.model.service.OrganizationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service("organizationService")
public class OrganizationServiceImpl implements OrganizationService {

	@PersistenceContext
	private EntityManager ppd;
	
	@Autowired
	private OrganizationRepository organizationRepository;
	@Autowired
	private AimagRepository aimagRepository;
	@Autowired
	private SumRepository sumRepository;
	
	@Override
	public Organization save(Organization organization) {
		return organizationRepository.saveAndFlush(organization);
	}

	@Override
	public List<Organization> findAll() {
		return organizationRepository.findAll(new Sort(Sort.Direction.ASC, "code"));
	}

	@Override
	public Organization findOne(Long id) {
		return organizationRepository.findOne(id);
	}

	@Override
	public void delete(Long id) {
		organizationRepository.delete(id);
		
	}

	@Override
	public List<Aimag> findAllAimag() {
		return aimagRepository.findAll(new Sort(Sort.Direction.ASC, "id"));
	}

	@Override
	@SuppressWarnings("unchecked")
	public List<Sum> findByAimag(Long id) {
		@SuppressWarnings("rawtypes")
		TypedQuery query = ppd.createQuery("SELECT c " + "FROM mn.itzone.ntc.model.Sum c " + "WHERE c.aimag.id = ?1", Sum.class);
		query.setParameter(1, id);

		return (List<Sum>) query.getResultList();
	}

}
