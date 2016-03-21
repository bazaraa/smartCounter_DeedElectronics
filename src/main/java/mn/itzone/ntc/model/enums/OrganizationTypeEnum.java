package mn.itzone.ntc.model.enums;

public enum OrganizationTypeEnum {
	
	type1("1"), 
	type2("2"),
	type3("3"); 
	
	private String label;
	
	private OrganizationTypeEnum(String label){
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
