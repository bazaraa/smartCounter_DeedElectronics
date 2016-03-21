package mn.itzone.ntc.model.repository;

import mn.itzone.ntc.model.Sum;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("repositorySum")
public interface SumRepository extends JpaRepository<Sum, Long> {

}
