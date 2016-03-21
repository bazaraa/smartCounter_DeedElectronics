package mn.itzone.ntc.model.repository;

import mn.itzone.ntc.model.Permission;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("repositoryPermission")
public interface PermissionRepository extends JpaRepository<Permission, Long> {

}
