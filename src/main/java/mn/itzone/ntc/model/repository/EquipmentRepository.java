package mn.itzone.ntc.model.repository;

import mn.itzone.ntc.model.Equipment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository("repositoryEquipment")
public interface EquipmentRepository extends JpaRepository<Equipment, Long> {

}
