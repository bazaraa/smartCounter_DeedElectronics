package mn.itzone.ntc.model.enums;

public enum ModulesEnum {
	
	controlPanel("Удирдлага тохиргоо"), 
	equipment("Тоног төхөөрөмж"),
	maintenance("Завсар үйлчилгээ"),
	report("Тайлан");
	
	private String label;
	
	private ModulesEnum(String label){
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
