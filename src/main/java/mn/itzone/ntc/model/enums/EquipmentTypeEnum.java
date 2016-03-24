package mn.itzone.ntc.model.enums;

public enum EquipmentTypeEnum {
	
	medicalEquipment("Эмнэлгийн тоног төхөөрөмж"), 
	nonMedicalEquipment("Эмнэлгийн бус тоног төхөөрөмж"),
	itEquipment("Мэдээлэл технологийн тоног төхөөрөмж");
	
	private String label;
	
	private EquipmentTypeEnum(String label){
		this.label = label;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	@Override
    public String toString() {
        return this.getLabel();
    }

}
