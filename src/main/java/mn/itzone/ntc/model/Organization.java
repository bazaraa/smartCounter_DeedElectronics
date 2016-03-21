package mn.itzone.ntc.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Table;

import mn.itzone.ntc.model.enums.OrganizationLevelEnum;
import mn.itzone.ntc.model.enums.OrganizationTypeEnum;

import org.hibernate.annotations.Nationalized;
@Entity
@Table(name = "organizations")
public class Organization extends BaseObject{

	private static final long serialVersionUID = 3157715258005311544L;

	@Nationalized
	@Column(length = 255)
	private String name;

	@Nationalized
	@Column(length = 255)
	private String code;

	private String phone;

	@Nationalized
	@Column(length = 255)
	private String description;

	@Enumerated(EnumType.ORDINAL)
	private OrganizationTypeEnum organizationType;

	@Enumerated(EnumType.ORDINAL)
	private OrganizationLevelEnum organizationLevel;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public OrganizationTypeEnum getOrganizationType() {
		return organizationType;
	}

	public void setOrganizationType(OrganizationTypeEnum organizationType) {
		this.organizationType = organizationType;
	}

	public OrganizationLevelEnum getOrganizationLevel() {
		return organizationLevel;
	}

	public void setOrganizationLevel(OrganizationLevelEnum organizationLevel) {
		this.organizationLevel = organizationLevel;
	}

}
