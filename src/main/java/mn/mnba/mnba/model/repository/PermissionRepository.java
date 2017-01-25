package mn.mnba.mnba.model.repository;

import mn.mnba.mnba.model.Permission;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("repositoryPermission")
public interface PermissionRepository extends JpaRepository<Permission, Long> {

}
