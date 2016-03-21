package mn.itzone.ntc.model.repository;

import mn.itzone.ntc.model.Organization;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("repositoryOrganization")
public interface OrganizationRepository extends JpaRepository<Organization, Long> {

}
