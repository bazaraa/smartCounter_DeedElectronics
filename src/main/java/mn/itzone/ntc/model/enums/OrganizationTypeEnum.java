package mn.itzone.ntc.model.enums;

public enum OrganizationTypeEnum{
	
	type1("Цусны төв болон салбар нэгжүүд"), 
	type2("Ханган нийлүүлэгч"),
	type3("Бусад"); 
	
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
