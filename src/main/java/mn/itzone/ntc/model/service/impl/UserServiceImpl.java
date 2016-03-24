package mn.itzone.ntc.model.service.impl;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import mn.itzone.ntc.model.User;
import mn.itzone.ntc.model.repository.RoleRepository;
import mn.itzone.ntc.model.repository.UserRepository;
import mn.itzone.ntc.model.service.UserService;
import mn.itzone.ntc.model.view.UserView;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service("userService")
public class UserServiceImpl implements UserService {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);

	@PersistenceContext
	private EntityManager ppd;
	
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public Optional<User> getUserById(long id) {
        LOGGER.debug("Getting user={}", id);
        return Optional.ofNullable(userRepository.findOne(id));
    }

    @Override
    public Optional<User> getUserByUsername(String username) { 
        return userRepository.findOneByUsername(username);
    }

    @Override
    public Collection<User> getAllUsers() {
        LOGGER.debug("Getting all users");
        return userRepository.findAll(new Sort("username"));
    }

    @Override
    public User save(User user) {    	
        return userRepository.saveAndFlush(user);
    }

	@Override
	public List<User> getUserByUsernameInQuery(String username) {
		return userRepository.findOneByUsernameInQuery(username);
	}

	@Override
	public void deleteUser(long id) {
		userRepository.delete(id);
	}
	
	@Override
	public User findByUserName(String username) {
		// TODO Auto-generated method stub
		User user = null;
		List<User> users =userRepository.findByUserName(username);
		if(users != null && users.size() > 0)
			user = users.get(0);				
		return user;
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public List<User> findByRole(String roleCode) {
		

		TypedQuery query = ppd.createQuery(
						"select a from mn.itzone.ntc.model.User a where a.role.code = ?1",
						User.class);
		query.setParameter(1, roleCode);

		return (List<User>) query.getResultList();
	}

	@Override
	public User findOne(Long id) {
		// TODO Auto-generated method stub
		return userRepository.findOne(id);
	}
	
	@Override
	@SuppressWarnings("unchecked")
	public List<User> findByView(UserView view) {
		String query="";	
		query="SELECT c "
				+ "FROM mn.itzone.ntc.model.User c"
				+ " WHERE 1=1";

		if(view.getFirstName() != null && !view.getFirstName().equals("")){
			query = query + " AND c.firstName = :name";
		}
		
		if(view.getOrganization() != null){
			query = query + " AND c.organization.id = :orgId";
		}
		
		if(view.getRegisterNum() != null && !view.getRegisterNum().equals("")){
			query = query + " AND c.regName = :regName";
		}
				
		@SuppressWarnings("rawtypes")
		TypedQuery q = ppd.createQuery(query, User.class);
		
		if(view.getFirstName() != null && !view.getFirstName().equals("")){
			q.setParameter("name", view.getFirstName());
		}

		if(view.getOrganization() != null){
			q.setParameter("orgId", view.getOrganization());
		}
		
		if(view.getRegisterNum() != null && !view.getRegisterNum().equals("")){
			q.setParameter("regName", view.getRegisterNum());
		}
	    
		return (List<User>)q.getResultList();
	}
}
