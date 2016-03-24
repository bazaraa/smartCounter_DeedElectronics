package mn.itzone.ntc.model.service;


import java.util.List;

import mn.itzone.ntc.model.Equipment;

public interface EquipmentService {

	Equipment save(Equipment equipment);
    
    List<Equipment> findAll();
    
    Equipment findOne(long id);
    
    void delete(Long id);

}
