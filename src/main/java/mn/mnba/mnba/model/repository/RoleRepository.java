package mn.mnba.mnba.model.repository;

import java.util.List;

import mn.mnba.mnba.model.Role;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository("repositoryRole")
public interface RoleRepository extends JpaRepository<Role, Long> {

    @Query("SELECT p FROM mn.mnba.mnba.model.Role p WHERE :id in elements(p.permissions)")
    List<Role> findRoleByPermissionId(@Param("id") Long id);
}
