package mn.itzone.ntc.model.repository;

import mn.itzone.ntc.model.Aimag;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("repositoryAimag")
public interface AimagRepository extends JpaRepository<Aimag, Long> {

}
