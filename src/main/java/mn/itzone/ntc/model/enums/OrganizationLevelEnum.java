package mn.itzone.ntc.model.enums;

public enum OrganizationLevelEnum {
	
	level1("Улс"),  
	levle2("Нийслэл"),
	level3("Дүүрэг"),
	levle4("Аймаг"),
	level5("Сум");
	
	private String label;
	
	private OrganizationLevelEnum(String label){
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
