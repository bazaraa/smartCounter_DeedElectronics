package mn.itzone.ntc.model.enums;

public enum OrganizationLevelEnum {
	
	level1("1"), 
	level2("2"),
	levle3("3"); 
	
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
