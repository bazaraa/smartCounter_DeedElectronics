package mn.mnba.mnba.model.repository;

import mn.mnba.mnba.model.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository("repositoryUser")
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findOneByUsername(String username);

    @Query("SELECT p FROM mn.mnba.mnba.model.User p WHERE p.username= :username")
    List<User> findByUserName(@Param("username") String username);
    
    @Query("SELECT p FROM mn.mnba.mnba.model.User p WHERE p.username= :username")
    List<User> findOneByUsernameInQuery(@Param("username") String username);
}
