package mn.itzone.ntc.model.view;

import mn.itzone.ntc.model.enums.OrganizationTypeEnum;

public class OrganizationView {
	private String name;
	private OrganizationTypeEnum orgType;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public OrganizationTypeEnum getOrgType() {
		return orgType;
	}

	public void setOrgType(OrganizationTypeEnum orgType) {
		this.orgType = orgType;
	}

}
